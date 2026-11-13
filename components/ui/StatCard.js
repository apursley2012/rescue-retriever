/**
 * +----------------------------------------------------------------------------+
 * | Rescue Retriever                                                           |
 * | Purpose: Renders a reusable labeled numeric summary card for Dashboard and |
 * | Analytics.                                                                 |
 * | Provenance: Recovered compiled or third-party integration code.            |
 * | Attribution: Original rights retained; see repository THIRD_PARTY_NOTICES.md.    |
 * +----------------------------------------------------------------------------+
 */
import { j as jsxRuntime } from "./accordion.js";
/* Pages supply presentation variants while the card structure stays consistent. */
function StatCard({ label, value, color, borderColor, interactive = false, compact = false, meta = "", }) {
  const cardClasses = [
    "bg-white rounded-2xl p-5 border shadow-sm",
    interactive ? "card-hover" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const valueClasses = `${compact ? "text-3xl" : "text-4xl"} font-syne font-800 mb-1`;
  return jsxRuntime.jsxs("div", {
    className: cardClasses,
    style: { borderColor },
    children: [
      jsxRuntime.jsx("div", {
        className: valueClasses,
        style: { color },
        children: value,
      }),
      meta
        ? jsxRuntime.jsx("div", {
          className: "text-[#65758B] text-xs mb-0.5",
          children: meta,
        })
        : null,
      jsxRuntime.jsx("div", {
        className: "text-[#4A5B7A] text-sm",
        children: label,
      }),
    ],
  });
}
export { StatCard };
