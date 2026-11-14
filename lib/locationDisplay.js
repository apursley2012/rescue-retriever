/**
 * +----------------------------------------------------------------------------+
 * | Rescue Retriever                                                           |
 * | Purpose: Formats facility city/state labels while keeping them distinct    |
 * | from unverified animal coordinates.                                        |
 * | Author: Alysha Pursley                                                     |
 * | Copyright (c) 2026 Alysha Pursley.                                         |
 * | Rights: Proprietary original contributions; see repository LICENSE.         |
 * +----------------------------------------------------------------------------+
 */
/** The source names a facility, not an individual animal's city. */
export function getFacilityCityState(animal) {
  if (animal?.location === "Austin Animal Center") {
    return "Austin, Texas";
  }
  return "City and state not available";
}
