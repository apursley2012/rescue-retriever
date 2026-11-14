/**
 * +----------------------------------------------------------------------------+
 * | Rescue Retriever                                                           |
 * | Purpose: Renders Analytics donut, stacked, and age-column charts           |
 * | separately from data aggregation.                                          |
 * | Author: Alysha Pursley                                                     |
 * | Copyright (c) 2026 Alysha Pursley.                                         |
 * | Rights: Proprietary original contributions; see repository LICENSE.         |
 * +----------------------------------------------------------------------------+
 */
import { b } from "../../assets/runtime-core.js";
const CHART_COLORS = ["#F47920", "#087F8C", "#6D3DB8", "#2BBCD4", "#D95C83", "#8394AD", "#1A2F5E"];
/** Includes an Other category so the ring represents the whole dog population. */
export function BreedDonut({ slices, total }) {
  let position = 0;
  const radius = 74;
  const circumference = 2 * Math.PI * radius;
  return b.jsxs("div", {
    className: "rr-analytics-donut-layout", children: [
      b.jsx("div", {
        className: "rr-analytics-donut-wrap", children: b.jsxs("svg", {
          viewBox: "0 0 220 220", role: "img", "aria-label": "Dog breeds by proportion; exact counts are listed beside the chart",
          children: [
            b.jsx("circle", { cx: 110, cy: 110, r: radius, fill: "none", stroke: "#EEF2F8", strokeWidth: 29 }),
            ...slices.map((slice, index) => {
              const length = total ? slice.count / total * circumference : 0;
              const offset = position;
              position += length;
              return b.jsx("circle", {
                cx: 110, cy: 110, r: radius, fill: "none", stroke: CHART_COLORS[index % CHART_COLORS.length],
                strokeWidth: 29, strokeDasharray: `${length} ${circumference - length}`,
                strokeDashoffset: -offset, transform: "rotate(-90 110 110)",
              }, slice.name);
            }),
            b.jsx("text", { x: 110, y: 106, textAnchor: "middle", className: "rr-analytics-donut-count", children: total.toLocaleString() }),
            b.jsx("text", { x: 110, y: 126, textAnchor: "middle", className: "rr-analytics-donut-label", children: "dogs" }),
          ],
        })
      }),
      b.jsx("ul", {
        className: "rr-analytics-legend", children: slices.map((slice, index) => b.jsxs("li", {
          children: [b.jsx("span", { className: "rr-analytics-swatch", style: { backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }, "aria-hidden": true }),
          b.jsx("span", { className: "rr-analytics-legend-name", children: slice.name }),
          b.jsx("strong", { children: `${slice.count.toLocaleString()} (${total ? (slice.count / total * 100).toFixed(1) : "0.0"}%)` })],
        }, slice.name))
      }),
    ]
  });
}
/** Proportions across the whole dog population, not bars with separate scales. */
export function DogSexSegments({ categories, total }) {
  return b.jsxs("div", {
    children: [
      b.jsx("div", {
        className: "rr-analytics-stacked", role: "img", "aria-label": "Proportional distribution of recorded dog sex categories; exact counts appear in the accompanying list", children: categories.map((item, index) => b.jsx("div", {
          className: "rr-analytics-stacked-segment",
          style: { width: `${total ? item.count / total * 100 : 0}%`, backgroundColor: CHART_COLORS[index % CHART_COLORS.length] },
          title: `${item.name}: ${item.count.toLocaleString()} dogs`,
        }, item.name))
      }),
      b.jsx("ul", {
        className: "rr-analytics-legend rr-analytics-sex-legend", children: categories.map((item, index) => b.jsxs("li", {
          children: [b.jsx("span", { className: "rr-analytics-swatch", style: { backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }, "aria-hidden": true }),
          b.jsx("span", { className: "rr-analytics-legend-name", children: item.name }),
          b.jsx("strong", { children: `${item.count.toLocaleString()} (${total ? (item.count / total * 100).toFixed(1) : "0.0"}%)` })],
        }, item.name))
      }),
    ]
  });
}
/** Separate columns show a clear population distribution, with readable age bands. */
export function DogAgeColumns({ groups, missing }) {
  const highest = Math.max(1, ...groups.map(group => group.count));
  return b.jsxs("div", {
    children: [
      b.jsx("div", {
        className: "rr-analytics-age-chart", role: "group", "aria-label": "Dog age groups and record counts", children: groups.map(group => b.jsxs("div", {
          className: "rr-analytics-age-column", children: [
            b.jsx("strong", { children: group.count.toLocaleString() }),
            b.jsx("div", {
              className: "rr-analytics-age-track", children: b.jsx("div", {
                className: "rr-analytics-age-fill", style: { height: `${group.count / highest * 100}%` },
              })
            }),
            b.jsx("span", { children: group.name }),
          ]
        }, group.name))
      }),
      missing > 0 ? b.jsx("p", { className: "rr-analytics-missing", children: `${missing.toLocaleString()} dogs have no valid recorded age and are excluded from these columns.` }) : null,
    ]
  });
}
