# +----------------------------------------------------------------------------+
# | Rescue Retriever                                                           |
# | Purpose: Connects the original dashboard to MongoDB and provides create,   |
# | read, update, and delete operations for animal records.                    |
# | Author: Alysha Pursley                                                     |
# | Copyright (c) 2026 Alysha Pursley.                                         |
# | Rights: Proprietary original contributions; see repository LICENSE.         |
# +----------------------------------------------------------------------------+

"""MongoDB CRUD access for the original Rescue Retriever shelter dashboard.

The original Dash notebook imports AnimalShelter to query and maintain animal
records. Validation limits query operators and database/collection names.

Maintainer: Alysha Pursley
Copyright (c) 2026 Alysha Pursley.
"""

import os
import re
from datetime import datetime
from math import isfinite

from bson import ObjectId
from typing import Any

from pymongo import MongoClient
from pymongo.collection import Collection


class AnimalShelter:
    """Provide CRUD access to the Austin Animal Center animal records."""

    _SAFE_NAME = re.compile(r"^[A-Za-z0-9_-]+$")
    _ALLOWED_QUERY_OPERATORS = {"$eq", "$ne", "$gt", "$gte", "$lt", "$lte", "$in", "$nin"}

    @staticmethod
    def _validate_query_scalar(value: Any) -> None:
        """Allow only ordinary BSON scalar predicates, never executable/query objects."""
        if value is None or isinstance(value, (str, bool, int, ObjectId, datetime)):
            return
        if isinstance(value, float) and isfinite(value):
            return
        raise ValueError("query values must be supported scalar values")

    @staticmethod
    def _validate_tls_setting(value: str) -> bool:
        if value.lower() in {"1", "true", "yes", "on"}:
            return True
        if value.lower() in {"0", "false", "no", "off"}:
            return False
        raise ValueError("AAC_MONGO_TLS must be true or false")

    @classmethod
    def _validate_namespace_name(cls, value: str, label: str) -> str:
        """Reject database/collection names that could alter namespace selection."""
        if not isinstance(value, str) or not cls._SAFE_NAME.fullmatch(value):
            raise ValueError(
                f"{label} must contain only letters, numbers, underscores, or hyphens"
            )
        return value

    @classmethod
    def _validate_query(cls, query: dict[str, Any], *, allow_empty: bool) -> None:
        """Allow field predicates used by this project without accepting arbitrary Mongo operators."""
        if not isinstance(query, dict) or (not allow_empty and not query):
            requirement = "a dictionary" if allow_empty else "a non-empty dictionary"
            raise ValueError(f"query must be {requirement}")
        for field, condition in query.items():
            if (
                not isinstance(field, str)
                or not field
                or "\x00" in field
                or field.startswith("$")
                or "." in field
            ):
                raise ValueError("query fields must be plain field names")
            if isinstance(condition, dict):
                if not condition:
                    raise ValueError("query operator dictionaries cannot be empty")
                for operator, operand in condition.items():
                    if operator not in cls._ALLOWED_QUERY_OPERATORS:
                        raise ValueError(f"unsupported query operator: {operator}")
                    if operator in {"$in", "$nin"}:
                        if not isinstance(operand, (list, tuple)):
                            raise ValueError(f"{operator} requires a list or tuple")
                        for item in operand:
                            cls._validate_query_scalar(item)
                    else:
                        cls._validate_query_scalar(operand)
            else:
                cls._validate_query_scalar(condition)

    @staticmethod
    def _validate_document_value(
        item: Any, active_objects: set[int] | None = None, depth: int = 0
    ) -> None:
        """Reject unsafe, unsupported, cyclic, or excessively nested BSON values."""
        if depth > 64:
            raise ValueError("document nesting cannot exceed 64 levels")
        if not isinstance(item, (dict, list, tuple)):
            if item is None or isinstance(
                item, (str, bool, int, bytes, ObjectId, datetime)
            ):
                return
            if isinstance(item, float) and isfinite(item):
                return
            raise ValueError("document contains an unsupported scalar value")
        if active_objects is None:
            active_objects = set()
        identity = id(item)
        if identity in active_objects:
            raise ValueError("cyclic document values are not supported")
        active_objects.add(identity)
        try:
            if isinstance(item, dict):
                for key, value in item.items():
                    if (
                        not isinstance(key, str)
                        or not key
                        or "\x00" in key
                        or key.startswith("$")
                        or "." in key
                    ):
                        raise ValueError("nested document keys must be plain field names")
                    AnimalShelter._validate_document_value(
                        value, active_objects, depth + 1
                    )
            else:
                for value in item:
                    AnimalShelter._validate_document_value(
                        value, active_objects, depth + 1
                    )
        finally:
            active_objects.remove(identity)

    @staticmethod
    def _validate_update_data(update_data: dict[str, Any]) -> None:
        """Limit updates to ordinary document fields; callers cannot inject update operators."""
        if not isinstance(update_data, dict) or not update_data:
            raise ValueError("update_data must be a non-empty dictionary")
        for field, value in update_data.items():
            if (
                not isinstance(field, str)
                or not field
                or "\x00" in field
                or field.startswith("$")
                or "." in field
            ):
                raise ValueError("update fields must be plain field names")
            AnimalShelter._validate_document_value(value)

    def __init__(
        self,
        username: str | None = None,
        password: str | None = None,
        host: str | None = None,
        port: int | None = None,
        database_name: str | None = None,
        collection_name: str | None = None,
    ) -> None:
        """Create the MongoDB client from arguments or environment configuration."""
        configured_username = username or os.getenv("AAC_MONGO_USER")
        configured_password = password or os.getenv("AAC_MONGO_PASSWORD")
        self.host = host or os.getenv(
            "AAC_MONGO_HOST", "nv-desktop-services.apporto.com"
        )
        self.port = (
            port if port is not None else int(os.getenv("AAC_MONGO_PORT", "34072"))
        )
        self.database_name = self._validate_namespace_name(
            database_name or os.getenv("AAC_MONGO_DATABASE", "AAC"), "database_name"
        )
        self.collection_name = self._validate_namespace_name(
            collection_name or os.getenv("AAC_MONGO_COLLECTION", "animals"),
            "collection_name",
        )

        if (
            isinstance(self.port, bool)
            or not isinstance(self.port, int)
            or not 1 <= self.port <= 65535
        ):
            raise ValueError("MongoDB port must be between 1 and 65535")
        if not configured_username or not configured_password:
            raise ValueError(
                "MongoDB credentials are required. Set AAC_MONGO_USER and AAC_MONGO_PASSWORD "
                "or pass username and password explicitly."
            )

        # Remote credentials require verified TLS. Loopback development is the
        # only supported plaintext transport; do not disable certificate checks.
        is_local = self.host.lower() in {"localhost", "127.0.0.1", "::1"}
        tls_value = os.getenv("AAC_MONGO_TLS", "false" if is_local else "true")
        use_tls = self._validate_tls_setting(tls_value)
        if not is_local and not use_tls:
            raise ValueError("Remote MongoDB connections must use TLS")

        self.client = MongoClient(
            host=self.host,
            port=self.port,
            username=configured_username,
            password=configured_password,
            tls=use_tls,
            authSource="admin",
            serverSelectionTimeoutMS=5000,
            connectTimeoutMS=5000,
        )
        self.database = self.client[self.database_name]
        self.collection: Collection = self.database[self.collection_name]

    # Persistence stays here so dashboard code does not duplicate database access.
    def create(self, data: dict[str, Any]) -> bool:
        """Insert one animal document and report whether MongoDB acknowledged it."""
        if not isinstance(data, dict) or not data:
            raise ValueError("data must be a non-empty dictionary")
        self._validate_update_data(data)

        result = self.collection.insert_one(data)
        return result.acknowledged

    def read(self, query: dict[str, Any] | None = None) -> list[dict[str, Any]]:
        """Return every document matching the supplied MongoDB query."""
        if query is None:
            query = {}
        self._validate_query(query, allow_empty=True)

        return list(self.collection.find(query))

    def update(self, query: dict[str, Any], update_data: dict[str, Any]) -> int:
        """Apply ``$set`` updates and return the number of modified documents."""
        self._validate_query(query, allow_empty=False)
        self._validate_update_data(update_data)
        if "_id" in update_data or "animal_id" in update_data:
            raise ValueError("updates cannot change stable document identifiers")

        result = self.collection.update_many(query, {"$set": update_data})
        return result.modified_count

    def delete(self, query: dict[str, Any]) -> int:
        """Delete matching documents and return the number removed."""
        self._validate_query(query, allow_empty=False)

        result = self.collection.delete_many(query)
        return result.deleted_count

    def close(self) -> None:
        """Close the MongoDB client and release its network resources."""
        self.client.close()

    def __enter__(self) -> "AnimalShelter":
        """Return this instance for optional ``with``-statement usage."""
        return self

    def __exit__(self, exc_type: Any, exc_value: Any, traceback: Any) -> None:
        """Close the MongoDB client when leaving a ``with`` block."""
        self.close()
