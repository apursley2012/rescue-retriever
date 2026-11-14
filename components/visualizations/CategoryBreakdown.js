/**
 * +----------------------------------------------------------------------------+
 * | Rescue Retriever                                                           |
 * | Purpose: Displays counts for one categorical field in a supplied animal    |
 * | selection.                                                                 |
 * | Author: Alysha Pursley                                                     |
 * | Copyright (c) 2026 Alysha Pursley.                                         |
 * | Rights: Proprietary original contributions; see repository LICENSE.         |
 * +----------------------------------------------------------------------------+
 */
import { b, ee } from "../../assets/runtime-core.js";
/** One record contributes to exactly one category, including missing values. */
export function summarizeCategories(animals, field) {
  const counts = new Map();
  for (const animal of animals) {
    const value = String(animal[field] ?? "").trim() || "Not recorded";
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts].map(([name, count]) => ({ name, count }))
    .sort((left, right) => right.count - left.count || left.name.localeCompare(right.name));
}
export function CategoryBreakdown({ animals, field, title }) {
  const rows = ee.useMemo(() => summarizeCategories(animals, field), [animals, field]);
  const maximum = Math.max(1, ...rows.map(row => row.count));
  return b.jsxs("div", {
    className: "rr-category-breakdown", children: [
      b.jsx("p", { className: "rr-category-context", children: `${animals.length.toLocaleString()} records. Each record is counted once; bars are scaled to the largest category.` }),
      rows.length ? b.jsx("div", {
        className: "rr-category-rows", role: "list", "aria-label": title, children: rows.map(row => b.jsxs("div", {
          className: "rr-category-row", role: "listitem", children: [
            b.jsxs("div", {
              className: "rr-category-labels", children: [
                b.jsx("span", { children: row.name }),
                b.jsx("span", { className: "rr-category-number", children: `${row.count.toLocaleString()} (${(row.count / animals.length * 100).toFixed(1)}%)` })
              ]
            }),
            b.jsx("div", {
              className: "rr-category-track", "aria-hidden": true, children: b.jsx("div", {
                className: "rr-category-fill", style: { width: `${row.count / maximum * 100}%` }
              })
            })
          ]
        }, row.name))
      }) : b.jsx("p", { className: "rr-category-empty", children: "No records match the current selection." })
    ]
  });
}
