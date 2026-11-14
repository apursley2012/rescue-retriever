/**
 * +----------------------------------------------------------------------------+
 * | Rescue Retriever                                                           |
 * | Purpose: Keeps rescue qualification, dog search, shortlist handling,       |
 * | sorting, analytics helpers, and CSV export rules consistent across views.  |
 * | Author: Alysha Pursley                                                     |
 * | Copyright (c) 2026 Alysha Pursley.                                         |
 * | Rights: Proprietary original contributions; see repository LICENSE.         |
 * +----------------------------------------------------------------------------+
 */
import { rescueProfiles } from "../data/rescueProfiles.js";
import { getFacilityCityState } from "./locationDisplay.js";
/*
 * Normalizes surrounding whitespace for display/search helpers. Rescue
 * qualification itself intentionally uses exact preferred-breed values to
 * match the original MongoDB `$in` query semantics.
 */
function normalizeBreed(breed) {
  return String(breed ?? "").trim();
}
/*
 * Returns whether the recorded breed exactly matches one of the preferred
 * breeds from the client specification. No substring or Mix/Mixed expansion
 * is used because the original database query used an exact `$in` list.
 */
function breedMatches(animalBreed, preferredBreeds) {
  return preferredBreeds.includes(normalizeBreed(animalBreed));
}
/*
 * Normalizes a user/session supplied rescue-program filter to a known identifier.
 * Unknown values fall back to the all-records view instead of reaching scoring logic
 * with an undefined profile.
 */
function normalizeProgramFilter(value) {
  const candidate = String(value ?? "all");
  return candidate === "all" || rescueProfiles.some((profile) => profile.id === candidate)
    ? candidate
    : "all";
}
/*
 * Evaluates one animal against one rescue profile.
 * Qualification follows the original client query exactly: the record must be
 * a dog, its breed must be one of the listed preferred values, its sex must
 * match exactly, and its unrounded age-in-weeks value must fall inside the
 * inclusive training range. The weighted score remains an additional browser
 * demo aid and does not broaden qualification.
 */
function calculateMatch(animal, profile) {
  const ageWeeks = Number(animal.ageWeeks);
  const dogMatch = animal.animalType === "Dog";
  const breedMatch = dogMatch && breedMatches(animal.breed, profile.breeds);
  const sexMatch = animal.sex === profile.sex;
  const ageMatch = Number.isFinite(ageWeeks) &&
    ageWeeks >= profile.minAgeWeeks &&
    ageWeeks <= profile.maxAgeWeeks;
  const BREED_MATCH_SCORE = 50;
  const BREED_NON_MATCH_SCORE = 12;
  const SEX_MATCH_SCORE = 25;
  const SEX_NON_MATCH_SCORE = 5;
  const AGE_MATCH_SCORE = 25;
  const AGE_NON_MATCH_SCORE = 5;
  const MAX_MATCH_SCORE = 100;
  const matchScore = Math.min(MAX_MATCH_SCORE, (breedMatch ? BREED_MATCH_SCORE : BREED_NON_MATCH_SCORE) +
    (sexMatch ? SEX_MATCH_SCORE : SEX_NON_MATCH_SCORE) +
    (ageMatch ? AGE_MATCH_SCORE : AGE_NON_MATCH_SCORE));
  return {
    programId: profile.id,
    matchScore,
    breedMatch,
    sexMatch,
    ageMatch,
    qualifies: dogMatch && breedMatch && sexMatch && ageMatch,
    rationale: [
      dogMatch
        ? "Record is a dog, as required for rescue screening."
        : "Record is not a dog and therefore cannot qualify for a rescue profile.",
      breedMatch
        ? `Breed exactly matches the ${profile.shortName} preferred list.`
        : `Breed is outside the exact ${profile.shortName} preferred list.`,
      sexMatch
        ? `Sex matches the preferred ${profile.sex} criterion.`
        : `Sex differs from the preferred ${profile.sex} criterion.`,
      ageMatch
        ? `Age is within the ${profile.minAgeWeeks}–${profile.maxAgeWeeks} week range.`
        : `Age is outside the ${profile.minAgeWeeks}–${profile.maxAgeWeeks} week range.`,
    ],
  };
}
function getMatches(animal) {
  return rescueProfiles
    .map((profile) => calculateMatch(animal, profile))
    .sort((left, right) => right.matchScore - left.matchScore);
}
function getBestMatch(animal) {
  return getMatches(animal)[0];
}
/*
 * Returns the IDs of programs for which the animal meets every required
 * criterion. The explicit checks are retained to preserve existing logic.
 */
function getQualifyingPrograms(animal) {
  return getMatches(animal)
    .filter((match) => match.qualifies)
    .map((match) => match.programId);
}
/*
 * Sorts animals by overall best score or by a selected program score.
 * Age remains the existing tie-breaker.
 */
function sortAnimalsByProgram(animals, programId) {
  if (programId === "all") {
    return [...animals];
  }
  const profile = rescueProfiles.find((item) => item.id === programId);
  if (!profile)
    return [...animals];
  return [...animals].sort((left, right) => calculateMatch(right, profile).matchScore -
    calculateMatch(left, profile).matchScore ||
    left.ageWeeks - right.ageWeeks);
}
function getProgramCandidates(animals, programId) {
  const profile = rescueProfiles.find((item) => item.id === programId);
  if (!profile)
    return [];
  return animals
    .filter((animal) => getQualifyingPrograms(animal).includes(programId))
    .sort((left, right) => calculateMatch(right, profile).matchScore -
      calculateMatch(left, profile).matchScore ||
      left.ageWeeks - right.ageWeeks);
}
/*
 * Counts qualifying animals per rescue program and unique total candidates.
 */
function getProgramCounts(animals) {
  const counts = {
    water: 0,
    mountain: 0,
    disaster: 0,
    total: 0,
  };
  // Count each dog once in the overall total even when multiple programs qualify.
  const uniqueCandidateIds = new Set();
  for (const animal of animals) {
    const qualifyingPrograms = getQualifyingPrograms(animal);
    if (qualifyingPrograms.includes("water"))
      counts.water += 1;
    if (qualifyingPrograms.includes("mountain"))
      counts.mountain += 1;
    if (qualifyingPrograms.includes("disaster"))
      counts.disaster += 1;
    if (qualifyingPrograms.length > 0) {
      uniqueCandidateIds.add(animal.animalId);
    }
  }
  counts.total = uniqueCandidateIds.size;
  return counts;
}
/**
 * Searches only the fields already exposed by the dashboard and Analytics.
 * The location field is a facility label; the coordinates are not searched.
 */
function matchesAnimalSearch(animal, query) {
  const search = String(query ?? "").trim().toLowerCase();
  if (!search)
    return true;
  return [animal.name, animal.breed, animal.animalId, animal.color,
  animal.sex, animal.location, getFacilityCityState(animal)]
    .some((value) => String(value ?? "").toLowerCase().includes(search));
}
/**
 * A shortlist identifies dogs, not outcome rows: repeated IDs may appear in
 * the source dataset, so export each selected dog once in source order.
 */
function getShortlistedDogs(animals, selectedIds) {
  const seen = new Set();
  return animals.filter((animal) => {
    if (animal.animalType !== "Dog" || !selectedIds.has(animal.animalId) ||
      seen.has(animal.animalId))
      return false;
    seen.add(animal.animalId);
    return true;
  });
}
function getTopBreeds(animals) {
  const breedCounts = new Map();
  for (const animal of animals) {
    breedCounts.set(animal.breed, (breedCounts.get(animal.breed) ?? 0) + 1);
  }
  return Array.from(breedCounts, ([breed, count]) => ({ breed, count }))
    .sort((left, right) => right.count - left.count)
    .slice(0, 10);
}
/*
 * Builds the existing age histogram.
 * Uses unrounded ages so the displayed bins respect their actual boundaries;
 * malformed or missing ages must not inflate the oldest category.
 */
function getAgeDistribution(animals) {
  const ranges = {
    "0–26 wks": 0,
    "26–52 wks": 0,
    "52–104 wks": 0,
    "104–156 wks": 0,
    "156–260 wks": 0,
    "260+ wks": 0,
  };
  for (const animal of animals) {
    // Missing ages are unknown, not newborn ages. Retain numeric-string
    // compatibility for any caller supplying valid serialized records.
    if (animal.ageWeeks === null || animal.ageWeeks === undefined ||
      String(animal.ageWeeks).trim() === "")
      continue;
    const ageWeeks = Number(animal.ageWeeks);
    if (!Number.isFinite(ageWeeks) || ageWeeks < 0)
      continue;
    if (ageWeeks < 26)
      ranges["0–26 wks"] += 1;
    else if (ageWeeks < 52)
      ranges["26–52 wks"] += 1;
    else if (ageWeeks < 104)
      ranges["52–104 wks"] += 1;
    else if (ageWeeks < 156)
      ranges["104–156 wks"] += 1;
    else if (ageWeeks < 260)
      ranges["156–260 wks"] += 1;
    else
      ranges["260+ wks"] += 1;
  }
  return Object.entries(ranges).map(([range, count]) => ({ range, count }));
}
function getTopLocations(animals) {
  const locationCounts = new Map();
  for (const animal of animals) {
    locationCounts.set(animal.location, (locationCounts.get(animal.location) ?? 0) + 1);
  }
  return Array.from(locationCounts, ([location, count]) => ({
    location,
    count,
  }))
    .sort((left, right) => right.count - left.count)
    .slice(0, 10);
}
/*
 * Escapes one CSV cell using the same quoting behavior as the original export.
 * Kept separate so formatting logic remains focused and reusable.
 */
function escapeCsvCell(value) {
  const text = String(value ?? "");
  // Spreadsheet applications can interpret these leading characters as formulas.
  // Leading whitespace and control characters can hide a spreadsheet formula.
  // A negative coordinate or numeric field must remain numeric in CSV.
  // A nonnumeric "-" expression is still treated as a potential formula.
  const negativeNumber = /^-(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(text);
  const safeText = /^[\s\u0000-\u001f]*[=+\-@]/.test(text) && !negativeNumber
    ? `'${text}`
    : text;
  return `"${safeText.replace(/"/g, '""')}"`;
}
/*
 * Exports animals to CSV using the exact same columns, rounding, matching,
 * quoting, filename behavior, and browser download flow as before.
 */
/* Absent coordinates must not abort an otherwise useful export. */
function formatCsvCoordinate(value) {
  return Number.isFinite(value) ? value.toFixed(4) : "";
}
function exportAnimalsToCsv(animals, filename = "rescue-candidates.csv") {
  if (!Array.isArray(animals) || animals.some(animal => !animal || typeof animal !== "object")) {
    throw new TypeError("CSV export requires animal records");
  }
  // A browser download must not receive a path-like or control-character filename.
  const safeFilename = typeof filename === "string" &&
    /^[A-Za-z0-9][A-Za-z0-9_.-]{0,119}\.csv$/i.test(filename) &&
    !filename.includes("..") ? filename : "rescue-candidates.csv";
  const headers = [
    "animalId",
    "name",
    "animalType",
    "breed",
    "color",
    "sex",
    "age_weeks",
    "location",
    "latitude",
    "longitude",
    "rescue_programs",
    "best_match_score",
  ];
  const rows = animals.map((animal) => [
    animal.animalId,
    animal.name,
    animal.animalType,
    animal.breed,
    animal.color,
    animal.sex,
    Number.isFinite(animal.ageWeeks) && animal.ageWeeks >= 0 ? Math.round(animal.ageWeeks) : "",
    animal.location,
    formatCsvCoordinate(animal.latitude),
    formatCsvCoordinate(animal.longitude),
    getQualifyingPrograms(animal).join("; "),
    getBestMatch(animal).matchScore,
  ]);
  const csv = [headers, ...rows]
    .map((row) => row.map(escapeCsvCell).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const objectUrl = URL.createObjectURL(blob);
  try {
    const downloadLink = document.createElement("a");
    downloadLink.href = objectUrl;
    downloadLink.download = safeFilename;
    downloadLink.click();
  }
  finally {
    // Release the object URL even if constructing or clicking the link fails.
    // Defer revocation until the browser has begun consuming the download.
    setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
  }
}
/* The recovered runtime imports these abbreviated export aliases; retain them for compatibility. */
export { getShortlistedDogs, matchesAnimalSearch, normalizeBreed, breedMatches, normalizeProgramFilter, calculateMatch, getMatches, getBestMatch, getQualifyingPrograms, sortAnimalsByProgram, getProgramCandidates, getProgramCounts, getTopBreeds, getAgeDistribution, getTopLocations, escapeCsvCell, exportAnimalsToCsv, getTopBreeds as a, getBestMatch as b, calculateMatch as c, getQualifyingPrograms as d, exportAnimalsToCsv as e, sortAnimalsByProgram as f, getProgramCounts as g, getTopLocations as h, getAgeDistribution as i, getProgramCandidates as j, };
