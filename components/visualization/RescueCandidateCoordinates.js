/**
 * +----------------------------------------------------------------------------+
 * | Rescue Retriever                                                           |
 * | Purpose: Renders an interactive map for one selected dog, with a           |
 * | name/breed label and zoom controls. Coordinates come from the unverified   |
 * | source records.                                                            |
 * | Author: Alysha Pursley                                                     |
 * | Copyright (c) 2026 Alysha Pursley.                                         |
 * | Rights: Proprietary original contributions; see repository LICENSE.         |
 * +----------------------------------------------------------------------------+
 */
import { b, ee } from "../../assets/runtime-core.js";
import { getFacilityCityState } from "../../lib/locationDisplay.js";
const TILE_SIZE = 256;
const MAP_WIDTH = 720;
const MAP_HEIGHT = 420;
const DEFAULT_CENTER = { latitude: 30.5177, longitude: -97.4926 };
const MAX_LATITUDE = 85.05112878;
function worldPosition(latitude, longitude, zoom) {
  const scale = TILE_SIZE * 2 ** zoom;
  const lat = Math.max(-MAX_LATITUDE, Math.min(MAX_LATITUDE, latitude));
  const sin = Math.sin(lat * Math.PI / 180);
  return {
    x: (longitude + 180) / 360 * scale,
    y: (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * scale,
  };
}
function validCoordinate(animal) {
  return Number.isFinite(animal.latitude) && Number.isFinite(animal.longitude) &&
    Math.abs(animal.latitude) <= 90 && Math.abs(animal.longitude) <= 180;
}
export function getCandidateCoordinates(animals) {
  return animals.filter(validCoordinate).map(animal => ({
    recordId: animal.recordId,
    animalId: animal.animalId,
    name: animal.name || "Unnamed",
    cityState: getFacilityCityState(animal),
    breed: animal.breed || "Breed not recorded",
    latitude: animal.latitude,
    longitude: animal.longitude,
  }));
}
export function RescueCandidateCoordinates({ animals, selectedAnimal }) {
  const plotted = ee.useMemo(() => getCandidateCoordinates(animals), [animals]);
  const selected = plotted.find(item => item.recordId === selectedAnimal?.recordId) ?? null;
  const [zoom, setZoom] = ee.useState(10);
  const [tileLoadFailed, setTileLoadFailed] = ee.useState(false);
  ee.useEffect(() => setTileLoadFailed(false), [zoom, selected?.recordId]);
  const center = selected ?? DEFAULT_CENTER;
  const centerWorld = worldPosition(center.latitude, center.longitude, zoom);
  const originX = centerWorld.x - MAP_WIDTH / 2;
  const originY = centerWorld.y - MAP_HEIGHT / 2;
  const minTileX = Math.floor(originX / TILE_SIZE);
  const minTileY = Math.floor(originY / TILE_SIZE);
  const maxTileX = Math.floor((originX + MAP_WIDTH) / TILE_SIZE);
  const maxTileY = Math.floor((originY + MAP_HEIGHT) / TILE_SIZE);
  const tileCount = 2 ** zoom;
  const tiles = [];
  for (let ty = minTileY; ty <= maxTileY; ty++) {
    for (let tx = minTileX; tx <= maxTileX; tx++) {
      if (ty < 0 || ty >= tileCount)
        continue;
      tiles.push({
        x: tx * TILE_SIZE - originX,
        y: ty * TILE_SIZE - originY,
        url: `https://tile.openstreetmap.org/${zoom}/${((tx % tileCount) + tileCount) % tileCount}/${ty}.png`,
        key: `${zoom}-${tx}-${ty}`,
      });
    }
  }
  const selectedMarker = selected ? (() => {
    const pos = worldPosition(selected.latitude, selected.longitude, zoom);
    return { ...selected, x: pos.x - originX, y: pos.y - originY };
  })() : null;
  return b.jsxs("div", {
    className: "rr-location-map", id: "rr-geolocation-map", tabIndex: -1, role: "region", "aria-label": "Selected dog geolocation", children: [
      b.jsxs("div", {
        className: "rr-location-map-toolbar", children: [
          b.jsx("p", {
            children: selected
              ? `Showing ${selected.name} (${selected.breed})`
              : "Select an animal in the table to display its location."
          }),
          b.jsxs("div", {
            className: "rr-location-map-zoom", children: [
              b.jsx("button", {
                type: "button", "aria-label": "Zoom in", title: "Zoom in",
                disabled: zoom >= 18, onClick: () => setZoom(value => Math.min(18, value + 1)), children: "+"
              }),
              b.jsx("button", {
                type: "button", "aria-label": "Zoom out", title: "Zoom out",
                disabled: zoom <= 2, onClick: () => setZoom(value => Math.max(2, value - 1)), children: "−"
              }),
            ]
          }),
        ]
      }),
      b.jsxs("div", {
        className: "rr-location-map-viewport", role: "group",
        "aria-label": "Map showing only the selected animal location, with zoom controls", children: [
          b.jsx("div", {
            className: "rr-location-map-surface", children: [
              ...tiles.map(tile => b.jsx("img", {
                src: tile.url, alt: "", loading: "lazy",
                className: "rr-location-map-tile", draggable: false,
                onError: () => setTileLoadFailed(true),
                style: { left: `${tile.x / MAP_WIDTH * 100}%`, top: `${tile.y / MAP_HEIGHT * 100}%` }
              }, tile.key)),
              selectedMarker && b.jsxs("div", {
                className: "rr-location-map-selection",
                style: { left: `${selectedMarker.x / MAP_WIDTH * 100}%`, top: `${selectedMarker.y / MAP_HEIGHT * 100}%` },
                children: [
                  b.jsxs("div", {
                    className: "rr-location-map-popup", children: [
                      b.jsx("strong", { children: selectedMarker.name }),
                      b.jsx("span", { children: selectedMarker.breed }),
                    ]
                  }),
                  b.jsx("span", {
                    className: "rr-location-map-pin rr-location-map-pin-selected",
                    role: "img", "aria-label": `Location marker for ${selectedMarker.name}, ${selectedMarker.breed}`,
                    children: "📍"
                  }),
                ],
              }, selectedMarker.recordId),
            ]
          }),
          b.jsx("span", {
            className: "rr-location-map-attribution", children: b.jsxs("span", {
              children: [
                "Map tiles © ", b.jsx("a", { href: "https://www.openstreetmap.org/copyright", target: "_blank", rel: "noopener noreferrer", children: "OpenStreetMap contributors" }),
              ]
            })
          }),
        ]
      }),
      tileLoadFailed && b.jsx("p", {
        className: "rr-coordinate-disclaimer", role: "status",
        children: "Some map imagery could not be loaded. Check your connection or try zooming again; the selected record and its location remain available."
      }),
      b.jsx("p", {
        className: "rr-coordinate-intro", "aria-live": "polite", children: selected
          ? `Selected: ${selected.name}, ${selected.breed}. Recorded facility: ${selected.cityState}. The pin indicates its supplied coordinates.`
          : "Select Show on map beside an animal in the table to display its location."
      }),
      b.jsx("p", { className: "rr-coordinate-disclaimer", children: "Map pins use the original dataset coordinates, not independently verified animal locations. City and state identify the recorded shelter facility, not the position of each pin. Map tiles require an internet connection." }),
    ]
  });
}
