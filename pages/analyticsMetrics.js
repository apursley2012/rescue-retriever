/**
 * +----------------------------------------------------------------------------+
 * | Rescue Retriever                                                           |
 * | Purpose: Calculates dog age and sex distributions independently of page    |
 * | state and chart rendering.                                                 |
 * | Author: Alysha Pursley                                                     |
 * | Copyright (c) 2026 Alysha Pursley.                                         |
 * | Rights: Proprietary original contributions; see repository LICENSE.         |
 * +----------------------------------------------------------------------------+
 */
export function getDogAgeGroups(dogs) {
  const bands = [
    { name: "Under 6 months", min: 0, max: 26, count: 0 },
    { name: "6–11 months", min: 26, max: 52, count: 0 },
    { name: "1–2 years", min: 52, max: 156, count: 0 },
    { name: "3–5 years", min: 156, max: 312, count: 0 },
    { name: "6–9 years", min: 312, max: 520, count: 0 },
    { name: "10+ years", min: 520, max: Infinity, count: 0 },
  ];
  for (const dog of dogs) {
    const age = dog.ageWeeks;
    if (Number.isFinite(age) && age >= 0) {
      const band = bands.find(item => age >= item.min && age < item.max);
      if (band)
        band.count++;
    }
  }
  return bands;
}
export function getDogSexCategories(dogs) {
  const counts = new Map();
  for (const animal of dogs) {
    const name = animal.sex?.trim() || "Not recorded";
    counts.set(name, (counts.get(name) ?? 0) + 1);
  }
  return [...counts].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
}
export function getBreedSlices(breeds, dogCount) {
  const common = breeds.slice(0, 5).map(item => ({ name: item.breed, count: item.count }));
  const remainder = dogCount - common.reduce((total, item) => total + item.count, 0);
  if (remainder > 0)
    common.push({ name: "Other dog breeds", count: remainder });
  return common;
}
