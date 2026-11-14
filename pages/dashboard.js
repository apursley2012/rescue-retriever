/**
 * +----------------------------------------------------------------------------+
 * | Rescue Retriever                                                           |
 * | Purpose: Orchestrates dog-only screening, search and shortlist state, and  |
 * | the selected-dog map. The results table is rendered by a separate          |
 * | Dashboard component.                                                       |
 * | Author: Alysha Pursley                                                     |
 * | Copyright (c) 2026 Alysha Pursley.                                         |
 * | Rights: Proprietary original contributions; see repository LICENSE.         |
 * +----------------------------------------------------------------------------+
 */
import { FY, Ju, Lw, QM, T0, ZM, b, d3, ee, lR, lt, m3, oN, rN, ru, tb, u3 } from "../assets/runtime-core.js";
import { N as Navigation } from "../components/layout/Navigation.js";
import { F as Footer } from "../components/layout/Footer.js";
import { StatCard } from "../components/ui/StatCard.js";
import { DogResultsTable } from "../components/dashboard/DogResultsTable.js";
import { normalizeProgramFilter, matchesAnimalSearch, getShortlistedDogs } from "../lib/filterUtils.js";
import { RescueCandidateCoordinates } from "../components/visualizations/RescueCandidateCoordinates.js";
const rescueLogoUrl = new URL("../assets/logo.png", import.meta.url).href;
/* Some privacy settings deny sessionStorage reads. Keep transient dashboard state usable. */
function readSessionValue(key, fallback = null) {
  try {
    return window.sessionStorage.getItem(key) ?? fallback;
  }
  catch {
    return fallback;
  }
}
function DashboardPage() {
  /*
  * Search, sort, pagination, and shortlist state derive from the same filtered
  * candidate collection so counts and visible results cannot drift apart.
  */
  const [e] = u3();
  const initialFilter = normalizeProgramFilter(e.get("filter") ?? readSessionValue("rescue-retriever-filter") ?? "all");
  const storedPage = Number(readSessionValue("rescue-retriever-page"));
  const initialPage = Number.isInteger(storedPage) && storedPage > 0 ? storedPage : 1;
  const sortableColumns = new Set(["animalId", "name", "breed", "color", "sex", "ageWeeks"]);
  const storedSortColumn = readSessionValue("rescue-retriever-sort-column");
  const initialSortColumn = sortableColumns.has(storedSortColumn) ? storedSortColumn : "animalId";
  const initialSortDirection = readSessionValue("rescue-retriever-sort-direction") === "desc"
    ? "desc"
    : "asc";
  const dogs = ee.useMemo(() => lt.filter(animal => animal.animalType === "Dog"), []);
  const animalIds = ee.useMemo(() => new Set(dogs.map(animal => animal.animalId)), [dogs]);
  const [selectedRecordId, setSelectedRecordId] = ee.useState(null);
  const [n, r] = ee.useState(initialFilter), [o, u] = ee.useState(() => (readSessionValue("rescue-retriever-search") ?? "").slice(0, 100)), [s, f] = ee.useState(initialPage), [d, h] = ee.useState(initialSortColumn), [y, m] = ee.useState(initialSortDirection), [g, A] = ee.useState(() => {
    try {
      const stored = localStorage.getItem("rescue-retriever-shortlist") ?? "[]";
      // Local browser storage is untrusted and may have been tampered with.
      if (stored.length > 100000)
        return new Set;
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed))
        return new Set;
      return new Set(parsed.filter(id => typeof id === "string" && animalIds.has(id)).slice(0, dogs.length));
    }
    catch {
      return new Set;
    }
  });
  ee.useEffect(() => {
    const requestedFilter = e.get("filter");
    if (requestedFilter) {
      r(normalizeProgramFilter(requestedFilter));
    }
  }, [e]);
  ee.useEffect(() => {
    try {
      sessionStorage.setItem("rescue-retriever-filter", n);
      sessionStorage.setItem("rescue-retriever-search", o);
      sessionStorage.setItem("rescue-retriever-page", String(s));
      sessionStorage.setItem("rescue-retriever-sort-column", d);
      sessionStorage.setItem("rescue-retriever-sort-direction", y);
    }
    catch {
      // Storage may be disabled by browser/privacy settings; in-memory state still works.
    }
  }, [n, o, s, d, y]);
  const O = ee.useMemo(() => Ju(dogs), [dogs]), S = ee.useMemo(() => {
    let P = n === "all" ? QM(dogs, n) : m3(dogs, n);
    if (o.trim()) {
      P = P.filter(animal => matchesAnimalSearch(animal, o));
    }
    return P;
  }, [n, o, dogs]), x = ee.useMemo(() => [...S].sort((P, q) => {
    const U = P[d], Q = q[d], Y = y === "asc" ? 1 : -1;
    return typeof U == "number" && typeof Q == "number" ? (U - Q) * Y : String(U).localeCompare(String(Q)) * Y;
  }), [S, d, y]), j = Math.max(1, Math.ceil(x.length / ru));
  ee.useEffect(() => {
    if (s > j) {
      f(j);
    }
  }, [s, j]);
  const selectedAnimal = ee.useMemo(() => S.find(animal => animal.recordId === selectedRecordId) ?? null, [S, selectedRecordId]);
  const E = ee.useMemo(() => x.slice((s - 1) * ru, s * ru), [x, s]), _ = ee.useCallback(P => {
    if (n === "all")
      return d3(P).matchScore;
    const q = T0.find(U => U.id === n);
    return ZM(P, q).matchScore;
  }, [n]), T = ee.useCallback(P => {
    h(q => (m(q === P ? U => U === "asc" ? "desc" : "asc" : "asc"), P)), f(1);
  }, []), D = P => {
    r(P), f(1), u(""), setSelectedRecordId(null);
  }, R = P => {
    A(q => {
      const U = new Set(q);
      U.has(P) ? U.delete(P) : U.add(P);
      try {
        localStorage.setItem("rescue-retriever-shortlist", JSON.stringify([...U]));
      }
      catch {
        // Keep the shortlist usable in memory if persistent browser storage is unavailable.
      }
      return U;
    });
  };
  return b.jsxs("div", {
    className: "min-h-screen bg-[#F6F8FB]", children: [b.jsx(Navigation, {}), b.jsxs("main", {
      id: "main-content", tabIndex: -1, className: "pt-16", children: [b.jsx("div", {
        className: "bg-[#1A2F5E] px-4 sm:px-6 py-10", children: b.jsxs("div", {
          className: "max-w-7xl mx-auto", children: [b.jsxs("div", {
            className: "flex items-center justify-between gap-4", children: [b.jsxs("div", {
              children: [b.jsx("h1", {
                className: "font-syne font-800 text-white text-3xl sm:text-4xl mb-2", children: "Rescue Candidate Dashboard"
              }), b.jsxs("p", {
                className: "text-[#8BA4C4] text-base", children: [dogs.length.toLocaleString(), " dog records · ", O.total, " unique rescue candidates · Alysha Pursley"]
              })]
            }), b.jsx("img", {
              src: rescueLogoUrl, alt: "Rescue Retriever", width: 698, height: 852, className: "h-24 w-20 object-contain rr-dashboard-hero-logo"
            })]
          })]
        })
      }), b.jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8", children: [b.jsx("div", {
          className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [{
            label: "Total Dogs", value: dogs.length.toLocaleString(), color: "#1A2F5E", border: "#D8E0EE"
          }, {
            label: "Water Rescue", value: O.water, color: "#DF5A1A", border: "#F6A47C"
          }, {
            label: "Mountain Rescue", value: O.mountain, color: "#087F8C", border: "#69C5C3"
          }, {
            label: "Disaster / Tracking", value: O.disaster, color: "#6D3DB8", border: "#B69AE2"
          }].map(P => b.jsx(StatCard, {
            label: P.label,
            value: P.value,
            color: P.color,
            borderColor: P.border,
            compact: true
          }, P.label))
        }), b.jsx("div", {
          className: "bg-white rounded-2xl shadow-sm border border-[#D8E0EE] p-5", children: b.jsxs("div", {
            className: "flex flex-wrap items-center gap-3", children: [b.jsx("span", {
              className: "text-[#1A2F5E] font-semibold text-sm mr-1", children: "Filter by program:"
            }), FY.map(P => {
              const q = P.icon, U = n === P.id;
              return b.jsxs("button", {
                type: "button", "aria-pressed": U,
                onClick: () => D(P.id), className: "flex min-h-11 items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all duration-200 hover:scale-[1.03] active:scale-95",
                style: {
                  backgroundColor: U ? P.color : P.bg, color: U ? (P.id === "water" ? "#1A2F5E" : "#FFFFFF") : P.color, borderColor: P.color
                }, children: [b.jsx(q, {
                  className: "w-4 h-4"
                }), P.label]
              }, P.id);
            }), n !== "all" && b.jsxs("button", {
              type: "button",
              onClick: () => D("all"), className: "flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-[#7A8FA8] hover:text-[#1A2F5E] transition-colors",
              children: [b.jsx(lR, {
                className: "w-3.5 h-3.5"
              }), " Reset"]
            })]
          })
        }), b.jsxs("div", {
          className: "flex flex-col sm:flex-row gap-3 items-start sm:items-center", children: [b.jsxs("div", {
            className: "relative flex-1 max-w-md", children: [b.jsx(oN, {
              className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9AA8BF]"
            }), b.jsx("input", {
              type: "search", maxLength: 100, "aria-label": "Search rescue candidates", placeholder: "Search by name, breed, ID, color…", value: o, onChange: P => {
                u(P.target.value.slice(0, 100)), f(1);
              }, className: "rr-search-input w-full pl-10 pr-4 py-2.5 bg-white border border-[#D8E0EE] rounded-xl text-sm text-[#1A2F5E] placeholder-[#9AA8BF] focus:outline-none focus:border-[#2BBCD4] focus:ring-2 focus:ring-[#2BBCD4]/20 transition-all"
            })]
          }), b.jsxs("div", {
            className: "text-sm text-[#52617B]", "aria-live": "polite", "aria-atomic": "true", children: [x.length, " result", x.length !== 1 ? "s" : ""]
          }), b.jsxs("button", {
            type: "button",
            onClick: () => tb(getShortlistedDogs(dogs, g), "rescue-retriever-shortlist.csv"), disabled: g.size === 0,
            className: "flex items-center gap-2 bg-white border border-[#D8E0EE] text-[#1A2F5E] disabled:opacity-40 text-sm font-semibold px-4 py-2.5 rounded-xl",
            children: [b.jsx(Lw, {
              className: "w-4 h-4"
            }), " Shortlist (", g.size, ")"]
          }), b.jsxs("button", {
            type: "button",
            onClick: () => tb(x, `rescue-candidates-${n}.csv`), className: "flex items-center gap-2 bg-[#F47920] hover:bg-[#B84D00] text-[#1A2F5E] hover:text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95",
            children: [b.jsx(rN, {
              className: "w-4 h-4"
            }), " Export CSV"]
          })]
        }), b.jsx(DogResultsTable, { rows: E, sortColumn: d, sortDirection: y, onSort: T, onSelectMapDog: setSelectedRecordId, selectedAnimal, scoreForDog: _, onToggleShortlist: R, shortlistedIds: g, allSortedDogs: x, currentPage: s, totalPages: j, onPageChange: f }), b.jsxs("section", {
          className: "bg-white rounded-2xl shadow-sm border border-[#D8E0EE] p-6", children: [
            b.jsx("h2", { className: "font-syne font-700 text-[#1A2F5E] text-lg mb-1", children: "Geolocation of selected records" }),
            b.jsx("p", { className: "text-[#4A5B7A] text-xs mb-5", children: "Choose Show on map beside an animal in the table to display one location pin with its name and breed. Use + and − to zoom. The source coordinates have not been independently verified." }),
            b.jsx(RescueCandidateCoordinates, { animals: S, selectedAnimal })
          ]
        })]
      })]
    }), b.jsx(Footer, {})]
  });
}
export default DashboardPage;
