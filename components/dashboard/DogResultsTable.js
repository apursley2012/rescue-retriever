/**
 * +----------------------------------------------------------------------------+
 * | Rescue Retriever                                                           |
 * | Purpose: Renders the dog-results table, sortable headers, pagination,      |
 * | shortlist actions, and map-selection controls. The Dashboard owns its      |
 * | state.                                                                     |
 * | Author: Alysha Pursley                                                     |
 * | Copyright (c) 2026 Alysha Pursley.                                         |
 * | Rights: Proprietary original contributions; see repository LICENSE.         |
 * +----------------------------------------------------------------------------+
 */
import { b, Fw, VM, IY, _t, YM, Lw, Kc, P3, M3, tN, B3, ru } from "../../assets/runtime-core.js";
import { formatAnimalAge } from "../../lib/ageDisplay.js";
import { getFacilityCityState } from "../../lib/locationDisplay.js";
export function DogResultsTable({ rows, sortColumn, sortDirection, onSort, onSelectMapDog, selectedAnimal, scoreForDog, onToggleShortlist, shortlistedIds, allSortedDogs, currentPage, totalPages, onPageChange }) {
  const SortIndicator = ({ col: P }) => sortColumn !== P ? b.jsx(Fw, {
    className: "w-3.5 h-3.5 opacity-30"
  }) : sortDirection === "asc" ? b.jsx(Fw, {
    className: "w-3.5 h-3.5 text-[#F47920]"
  }) : b.jsx(VM, {
    className: "w-3.5 h-3.5 text-[#F47920]"
  });
  const HeaderCell = ({ col: P, label: q }) => b.jsx("th", {
    className: "px-4 py-3 text-left text-xs font-semibold text-[#4A5B7A] uppercase tracking-wider whitespace-nowrap",
    "aria-sort": sortColumn === P ? (sortDirection === "asc" ? "ascending" : "descending") : "none",
    children: b.jsxs("button", {
      type: "button",
      onClick: () => onSort(P),
      className: "flex min-h-11 items-center gap-1 hover:text-[#1A2F5E] transition-colors",
      children: [q, " ", b.jsx(SortIndicator, { col: P })]
    })
  });
  return b.jsxs("div", {
    className: "bg-white rounded-2xl shadow-sm border border-[#D8E0EE] overflow-hidden", children: [b.jsx("div", {
      className: "overflow-x-auto rr-dog-table-scroll", tabIndex: 0, role: "region", "aria-label": "Dog candidate table; scroll horizontally to view additional columns", children: b.jsxs("table", {
        className: "w-full", children: [b.jsx("caption", {
          className: "rr-visually-hidden", children: "Filtered dog records with sortable columns, rescue match scores, map selection, details, and shortlist actions"
        }), b.jsx("thead", {
          className: "bg-[#F6F8FB] border-b border-[#D8E0EE]", children: b.jsxs("tr", {
            children: [b.jsx(HeaderCell, {
              col: "animalId", label: "ID"
            }), b.jsx(HeaderCell, {
              col: "name", label: "Name"
            }), b.jsx(HeaderCell, {
              col: "breed", label: "Breed"
            }), b.jsx(HeaderCell, {
              col: "color", label: "Color"
            }), b.jsx(HeaderCell, {
              col: "sex", label: "Sex"
            }), b.jsx(HeaderCell, {
              col: "ageWeeks", label: "Age"
            }), b.jsx("th", {
              className: "px-4 py-3 text-left text-xs font-semibold text-[#4A5B7A] uppercase tracking-wider",
              children: "City, State (facility)"
            }), b.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-[#4A5B7A] uppercase tracking-wider", children: "Map selection" }), b.jsx("th", {
              className: "px-4 py-3 text-left text-xs font-semibold text-[#4A5B7A] uppercase tracking-wider",
              children: "Match Score"
            }), b.jsx("th", {
              className: "px-4 py-3 text-left text-xs font-semibold text-[#4A5B7A] uppercase tracking-wider",
              children: "Programs"
            }), b.jsx("th", {
              className: "px-4 py-3 text-left text-xs font-semibold text-[#4A5B7A] uppercase tracking-wider",
              children: "Detail"
            }), b.jsx("th", {
              className: "px-4 py-3 text-center text-xs font-semibold text-[#4A5B7A] uppercase tracking-wider",
              children: "Shortlist"
            })]
          })
        }), b.jsx("tbody", {
          className: "divide-y divide-[#EEF2F8]", children: rows.length === 0 ? b.jsx("tr", {
            children: b.jsx("td", {
              colSpan: 12, className: "px-4 py-12 text-center text-[#52617B] text-sm", children: "No dogs match the current filters."
            })
          }) : rows.map(P => b.jsxs("tr", {
            className: "table-row-hover", children: [b.jsx("td", {
              className: "px-4 py-3 text-xs font-mono text-[#52617B]", children: P.animalId
            }), b.jsx("td", {
              className: "px-4 py-3 text-sm font-semibold text-[#1A2F5E]", children: P.name || b.jsx("span", {
                className: "text-[#9AA8BF] italic", children: "Unnamed"
              })
            }), b.jsx("td", {
              className: "px-4 py-3 text-sm text-[#374151] max-w-[180px]", children: b.jsx("span", {
                title: P.breed, className: "line-clamp-2", children: P.breed
              })
            }), b.jsx("td", {
              className: "px-4 py-3 text-sm text-[#4A5B7A]", children: P.color
            }), b.jsx("td", {
              className: "px-4 py-3 text-sm text-[#4A5B7A] whitespace-nowrap", children: P.sex
            }), b.jsx("td", {
              className: "px-4 py-3 text-sm text-[#1A2F5E] font-medium tabular-nums", children: formatAnimalAge(P.ageWeeks)
            }), b.jsx("td", {
              className: "px-4 py-3 text-sm text-[#4A5B7A] whitespace-nowrap", children: getFacilityCityState(P)
            }), b.jsx("td", {
              className: "px-4 py-3", children: b.jsx("button", {
                type: "button", onClick: () => {
                  onSelectMapDog(P.recordId);
                  const map = document.getElementById("rr-geolocation-map");
                  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
                  map?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
                  map?.focus({ preventScroll: true });
                }, "aria-pressed": selectedAnimal?.recordId === P.recordId, "aria-label": `Show ${P.name || "unnamed dog"} (${P.breed}) on map`, className: "rounded-lg border px-3 py-2 text-xs font-semibold transition-colors " + (selectedAnimal?.recordId === P.recordId ? "border-[#087F8C] bg-[#E6F6F4] text-[#066771]" : "border-[#D8E0EE] text-[#1A2F5E] hover:border-[#087F8C]"), children: selectedAnimal?.recordId === P.recordId ? "Selected" : "Show on map"
              })
            }), b.jsxs("td", {
              className: "px-4 py-3 text-sm font-bold text-[#1A2F5E] tabular-nums", children: [scoreForDog(P),
                "/100"]
            }), b.jsx("td", {
              className: "px-4 py-3", children: b.jsx(IY, {
                ...P
              })
            }), b.jsx("td", {
              className: "px-4 py-3", children: b.jsxs(_t, {
                to: `/candidates/${P.recordId}`, "aria-label": `View details for ${P.name || P.animalId}`, className: "inline-flex min-h-11 items-center gap-1 text-[#185D7A] hover:text-[#124B64] text-xs font-medium transition-colors",
                children: ["View ", b.jsx(YM, {
                  className: "w-3 h-3"
                })]
              })
            }), b.jsx("td", {
              className: "px-4 py-3 text-center", children: b.jsx("button", {
                type: "button", onClick: () => onToggleShortlist(P.animalId), "aria-pressed": shortlistedIds.has(P.animalId), "aria-label": shortlistedIds.has(P.animalId) ? `Remove ${P.name || P.animalId} from shortlist` : `Add ${P.name || P.animalId} to shortlist`,
                className: "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-[#D8E0EE] bg-white hover:border-[#F47920] transition-colors",
                children: b.jsx(Lw, {
                  className: `h-4 w-4 ${shortlistedIds.has(P.animalId) ? "fill-[#F47920] text-[#F47920]" : "text-[#7A8FA8]"}`
                })
              })
            })]
          }, P.recordId))
        })]
      })
    }), b.jsxs("div", {
      className: "px-4 py-4 border-t border-[#EEF2F8] flex flex-wrap items-center justify-between gap-3", children: [b.jsxs("span", {
        className: "text-xs text-[#52617B]", children: ["Showing ", allSortedDogs.length === 0 ? 0 : (currentPage - 1) * ru + 1,
          "–", Math.min(currentPage * ru, allSortedDogs.length), " of ", allSortedDogs.length]
      }), b.jsxs("div", {
        className: "flex items-center gap-1 rr-dog-pagination", children: [b.jsx(Kc, {
          onClick: () => onPageChange(1), disabled: currentPage === 1, label: "First", children: b.jsx(P3, {
            className: "w-3.5 h-3.5"
          })
        }), b.jsx(Kc, {
          onClick: () => onPageChange(P => P - 1), disabled: currentPage === 1, label: "Prev", children: b.jsx(M3, {
            className: "w-3.5 h-3.5"
          })
        }), b.jsxs("span", {
          className: "px-3 py-1 text-xs text-[#1A2F5E] font-medium", children: [currentPage, " / ", totalPages]
        }), b.jsx(Kc, {
          onClick: () => onPageChange(P => P + 1), disabled: currentPage === totalPages, label: "Next", children: b.jsx(tN, {
            className: "w-3.5 h-3.5"
          })
        }), b.jsx(Kc, {
          onClick: () => onPageChange(totalPages), disabled: currentPage === totalPages, label: "Last", children: b.jsx(B3, {
            className: "w-3.5 h-3.5"
          })
        })]
      })]
    })]
  });
}
