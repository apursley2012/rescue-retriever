# Rescue Retriever Original Project

I keep my original Python/MongoDB dashboard implementation separately from the later static browser demo. I retain the original notebook, source dataset, and Grazioso Salvare logo as historical and educational context.

## Contents

- `animal_shelter.py` provides MongoDB CRUD access.
- `ProjectTwoDashboard.ipynb` contains the original dashboard/notebook implementation.
- `aac_shelter_outcomes.csv` is the supplied shelter dataset.
- `requirements.txt` lists the Python packages required by the original implementation.
- `.env.example` documents the MongoDB configuration names without containing real credentials.

## Configuration

Set the environment variables shown in `.env.example` before using the MongoDB CRUD module. Do not commit real credentials. Remote MongoDB connections require TLS with certificate verification (`AAC_MONGO_TLS=true`), while loopback development may use `AAC_MONGO_TLS=false`. A legacy database endpoint without TLS must be upgraded or replaced rather than sending credentials in plaintext. The original hosted MongoDB environment referenced by the historical project may no longer be available, so database connectivity must be verified in the environment where the original project is run.

## Relationship to the static demo

The `../Current-Updated/web-demo/` folder is not a replacement for this implementation. It is a static browser representation that uses bundled data and can run on a static host without MongoDB or Python.

## Runtime compatibility

The maintained Python module uses Python 3.10+ type-union syntax. The original dependency list is in `requirements.txt`, but the historical package versions and MongoDB server version were not supplied with the project. Verify those dependencies against the Python/MongoDB environment used to run the preserved notebook rather than assuming the static GitHub Pages deployment provides them.
