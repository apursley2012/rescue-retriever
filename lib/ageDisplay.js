/**
 * +----------------------------------------------------------------------------+
 * | Rescue Retriever                                                           |
 * | Purpose: Converts source ages in weeks to readable months and years        |
 * | without changing numeric ages used for rescue matching.                    |
 * | Author: Alysha Pursley                                                     |
 * | Copyright (c) 2026 Alysha Pursley.                                         |
 * | Rights: Proprietary original contributions; see repository LICENSE.         |
 * +----------------------------------------------------------------------------+
 */
export function formatAnimalAge(ageWeeks) {
  if (ageWeeks === null || ageWeeks === undefined ||
    String(ageWeeks).trim() === "")
    return "Age unknown";
  const weeks = Number(ageWeeks);
  if (!Number.isFinite(weeks) || weeks < 0)
    return "Age unknown";
  if (weeks < 8)
    return `${Math.round(weeks)} ${Math.round(weeks) === 1 ? "week" : "weeks"}`;
  const months = Math.round(weeks * 12 / 52);
  if (months < 12)
    return `${months} ${months === 1 ? "month" : "months"}`;
  const years = Math.floor(weeks / 52);
  const remainingMonths = Math.round((weeks - years * 52) * 12 / 52);
  if (remainingMonths >= 12) {
    const roundedYears = years + 1;
    return `${roundedYears} ${roundedYears === 1 ? "year" : "years"}`;
  }
  return `${years} ${years === 1 ? "year" : "years"}` +
    (remainingMonths ? `, ${remainingMonths} ${remainingMonths === 1 ? "month" : "months"}` : "");
}
