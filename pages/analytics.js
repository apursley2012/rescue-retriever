/**
 * +----------------------------------------------------------------------------+
 * | Rescue Retriever                                                           |
 * | Purpose: Composes dog-only rescue statistics and charts. Shared filtering  |
 * | and chart metrics remain in dedicated helper modules.                      |
 * | Author: Alysha Pursley                                                     |
 * | Copyright (c) 2026 Alysha Pursley.                                         |
 * | Rights: Proprietary original contributions; see repository LICENSE.         |
 * +----------------------------------------------------------------------------+
 */
import { Ju, WM, QM, m3, b, ee, h3, lt } from "../assets/runtime-core.js";
import { StatCard } from "../components/ui/StatCard.js";
import { CategoryBreakdown } from "../components/visualizations/CategoryBreakdown.js";
import { getDogAgeGroups, getDogSexCategories, getBreedSlices } from "./analyticsMetrics.js";
import { BreedDonut, DogSexSegments, DogAgeColumns } from "../components/visualizations/DogAnalyticsCharts.js";
import { normalizeProgramFilter, matchesAnimalSearch } from "../lib/filterUtils.js";
import { N as Navigation } from "../components/layout/Navigation.js";
import { F as Footer } from "../components/layout/Footer.js";
const programCards = [
  { key: "water", name: "Water Rescue", color: "#DF5A1A", bg: "#FFF4EE", note: "Water-work screening profile" },
  { key: "mountain", name: "Mountain / Wilderness", color: "#087F8C", bg: "#EAF8F8", note: "Wilderness-work screening profile" },
  { key: "disaster", name: "Disaster / Tracking", color: "#6D3DB8", bg: "#F4EFFF", note: "Tracking and disaster screening profile" },
];
function AnalyticsPage() {
  const dogs = ee.useMemo(() => lt.filter(animal => animal.animalType === "Dog"), []);
  const breeds = ee.useMemo(() => WM(dogs), [dogs]);
  const rescue = ee.useMemo(() => Ju(dogs), [dogs]);
  const dogCount = dogs.length;
  // Keep the two filtered comparisons in sync with this page's rescue and search controls.
  const [programFilter, setProgramFilter] = ee.useState(() => {
    try {
      return normalizeProgramFilter(sessionStorage.getItem("rescue-retriever-filter") ?? "all");
    }
    catch {
      return "all";
    }
  });
  const [chartSearch, setChartSearch] = ee.useState(() => {
    try {
      return (sessionStorage.getItem("rescue-retriever-search") ?? "").slice(0, 100);
    }
    catch {
      return "";
    }
  });
  const filteredDogs = ee.useMemo(() => {
    let matching = programFilter === "all" ? QM(dogs, programFilter) : m3(dogs, programFilter);
    const search = chartSearch.trim().toLowerCase();
    if (search)
      matching = matching.filter(dog => matchesAnimalSearch(dog, search));
    return matching;
  }, [dogs, programFilter, chartSearch]);
  const filteredBreeds = ee.useMemo(() => WM(filteredDogs), [filteredDogs]);
  const ageGroups = ee.useMemo(() => getDogAgeGroups(dogs), [dogs]);
  const sexCategories = ee.useMemo(() => getDogSexCategories(dogs), [dogs]);
  // A donut with an explicit "Other breeds" slice always represents all dogs.
  const breedSlices = ee.useMemo(() => getBreedSlices(breeds, dogCount), [breeds, dogCount]);
  const knownAgeCount = ageGroups.reduce((total, item) => total + item.count, 0);
  const unrecordedAgeCount = dogCount - knownAgeCount;
  return b.jsxs("div", {
    className: "min-h-screen bg-[#F6F8FB]", children: [b.jsx(Navigation, {}), b.jsxs("main", {
      id: "main-content", tabIndex: -1, className: "pt-16", children: [b.jsx("div", {
        className: "bg-[#1A2F5E] px-4 sm:px-6 py-12", children: b.jsxs("div", {
          className: "max-w-7xl mx-auto", children: [b.jsx("span", {
            className: "inline-block text-[#2BBCD4] text-xs font-semibold uppercase tracking-widest mb-2", children: "Data Intelligence"
          }), b.jsx("h1", {
            className: "font-syne font-800 text-white text-4xl mb-2", children: "Analytics"
          }), b.jsx("p", {
            className: "text-[#8BA4C4] max-w-3xl", children: "Dog-only summaries of the shelter dataset and the records that meet Rescue Retriever's strict screening profiles."
          })]
        })
      }), b.jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8", children: [b.jsx("div", {
          className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
            { label: "Dog Records", value: dogCount.toLocaleString(), meta: "Dogs only", color: "#1A2F5E" },
            { label: "Rescue Candidates", value: rescue.total, meta: "Unique strict matches", color: "#F47920" },
            { label: "Water Rescue", value: rescue.water, meta: "Dogs matching water profile", color: "#2BBCD4" },
            { label: "Unique Breeds", value: new Set(dogs.map(animal => animal.breed)).size, meta: "Dog breed labels", color: "#22C55E" }
          ].map(item => b.jsx(StatCard, {
            label: item.label, value: item.value, color: item.color, borderColor: "#D8E0EE", compact: true, meta: item.meta
          }, item.label))
        }), b.jsxs("section", {
          className: "bg-white rounded-3xl shadow-sm border border-[#D8E0EE] p-6 sm:p-8", children: [b.jsx("span", {
            className: "text-[#F47920] text-xs font-semibold uppercase tracking-widest", children: "The useful signal"
          }), b.jsx("h2", {
            className: "font-syne font-800 text-[#1A2F5E] text-2xl mt-2 mb-2", children: "Rescue qualification at a glance"
          }), b.jsx("p", {
            className: "text-[#4A5B7A] text-sm max-w-3xl mb-6", children: "These dog-only counts show which rescue profiles produce candidates. A dog may qualify for more than one program."
          }), b.jsx("div", {
            className: "grid md:grid-cols-3 gap-4", children: programCards.map(program => {
              const count = rescue[program.key];
              return b.jsxs("div", {
                className: "rounded-2xl border-2 p-5", style: { borderColor: program.color, backgroundColor: program.bg }, children: [b.jsxs("div", {
                  className: "flex items-start justify-between gap-3", children: [b.jsxs("div", {
                    children: [b.jsx("h3", {
                      className: "font-syne font-800 text-[#1A2F5E] text-lg", children: program.name
                    }), b.jsx("p", { className: "text-[#4A5B7A] text-xs mt-1", children: program.note })]
                  }), b.jsx("div", {
                    className: "font-syne font-800 text-3xl tabular-nums", style: { color: program.color }, children: count
                  })]
                }), b.jsxs("div", {
                  className: "mt-5 pt-4 border-t border-[#D8E0EE] text-xs text-[#4A5B7A]", children: [b.jsx("strong", {
                    className: "text-[#1A2F5E]", children: `${(count / Math.max(1, dogCount) * 100).toFixed(2)}%`
                  }), " of all dog records meet this profile"]
                })]
              }, program.key);
            })
          })]
        }), b.jsxs("div", {
          className: "grid lg:grid-cols-2 gap-6", children: [
            b.jsxs("section", {
              className: "bg-white rounded-3xl shadow-sm border border-[#D8E0EE] p-6 sm:p-8", children: [
                b.jsx("h2", { className: "font-syne font-800 text-[#1A2F5E] text-xl mb-1", children: "Breed composition" }),
                b.jsx("p", { className: "text-[#4A5B7A] text-sm mb-6", children: "The five most common recorded dog breed labels, with all other dog breeds combined into one slice." }),
                b.jsx(BreedDonut, { slices: breedSlices, total: dogCount }),
              ]
            }),
            b.jsxs("section", {
              className: "bg-white rounded-3xl shadow-sm border border-[#D8E0EE] p-6 sm:p-8", children: [
                b.jsx("h2", { className: "font-syne font-800 text-[#1A2F5E] text-xl mb-1", children: "Sex and sterilization status" }),
                b.jsx("p", { className: "text-[#4A5B7A] text-sm mb-6", children: "A 100% stacked comparison of recorded sex categories for dogs, including intact and neutered/spayed categories." }),
                b.jsx(DogSexSegments, { categories: sexCategories, total: dogCount }),
              ]
            }),
          ]
        }), b.jsxs("section", {
          className: "bg-white rounded-3xl shadow-sm border border-[#D8E0EE] p-6 sm:p-8", children: [
            b.jsx("h2", { className: "font-syne font-800 text-[#1A2F5E] text-xl mb-1", children: "Dog ages at a glance" }),
            b.jsx("p", { className: "text-[#4A5B7A] text-sm mb-6", children: "Vertical columns compare counts across age ranges. Age labels use months and years, never weeks." }),
            b.jsx(DogAgeColumns, { groups: ageGroups, missing: unrecordedAgeCount }),
          ]
        }),
        b.jsxs("section", {
          className: "bg-white rounded-3xl shadow-sm border border-[#D8E0EE] p-6 sm:p-8", children: [
            b.jsx("h2", { className: "font-syne font-800 text-[#1A2F5E] text-xl mb-2", children: "Filtered dog comparisons" }),
            b.jsx("p", { className: "text-[#4A5B7A] text-sm mb-5", children: "The breed ranking and sex comparison previously displayed on the Dashboard now live here. Choose a rescue profile or search for dogs to update both charts." }),
            b.jsxs("div", {
              className: "rr-analytics-filter-controls", children: [
                b.jsx("label", { htmlFor: "analytics-rescue-program", children: "Rescue program" }),
                b.jsx("select", {
                  id: "analytics-rescue-program", value: programFilter, onChange: event => setProgramFilter(normalizeProgramFilter(event.target.value)), children: [
                    b.jsx("option", { value: "all", children: "All dogs" }),
                    b.jsx("option", { value: "water", children: "Water Rescue" }),
                    b.jsx("option", { value: "mountain", children: "Mountain / Wilderness" }),
                    b.jsx("option", { value: "disaster", children: "Disaster / Tracking" }),
                  ]
                }),
                b.jsx("label", { htmlFor: "analytics-dog-search", children: "Search dogs" }),
                b.jsx("input", { id: "analytics-dog-search", type: "search", maxLength: 100, placeholder: "Name, breed, ID, color…", value: chartSearch, onChange: event => setChartSearch(event.target.value) }),
                b.jsx("span", { className: "rr-analytics-filter-count", role: "status", children: `${filteredDogs.length.toLocaleString()} dogs` }),
              ]
            }),
            b.jsxs("div", {
              className: "grid lg:grid-cols-2 gap-6 rr-analytics-filtered-grid", children: [
                b.jsxs("div", {
                  children: [
                    b.jsx("h3", { className: "font-syne font-700 text-[#1A2F5E] text-lg mb-1", children: "Top breeds in this view" }),
                    b.jsx("p", { className: "text-[#4A5B7A] text-xs mb-5", children: "Ranked dog breed counts update with the selected program and search." }),
                    filteredBreeds.length === 0 ? b.jsx("p", { children: "No breed data available." }) :
                      b.jsx("div", {
                        className: "space-y-3", children: filteredBreeds.slice(0, 8).map((breed, index) => b.jsxs("div", {
                          children: [
                            b.jsxs("div", {
                              className: "flex items-center gap-3 mb-1", children: [
                                b.jsx("span", { className: "w-5 text-xs font-semibold text-[#7A8FA8]", children: index + 1 }),
                                b.jsx("span", { className: "text-sm text-[#1A2F5E] font-semibold truncate flex-1", title: breed.breed, children: breed.breed }),
                                b.jsx("span", { className: "text-sm font-semibold text-[#1A2F5E] tabular-nums", children: breed.count.toLocaleString() }),
                              ]
                            }),
                            b.jsx("div", {
                              className: "ml-8 h-2 rounded-full bg-[#EEF2F8] overflow-hidden", children: b.jsx("div", {
                                className: "h-full rounded-full bg-[#F47920]", style: { width: `${breed.count / filteredBreeds[0].count * 100}%` },
                              })
                            }),
                          ]
                        }, breed.breed))
                      }),
                  ]
                }),
                b.jsxs("div", {
                  children: [
                    b.jsx("h3", { className: "font-syne font-700 text-[#1A2F5E] text-lg mb-1", children: "Sex distribution in this selection" }),
                    b.jsx("p", { className: "text-[#4A5B7A] text-xs mb-4", children: "Dog counts update with the selected program and search." }),
                    b.jsx(CategoryBreakdown, { animals: filteredDogs, field: "sex", title: "Sex distribution in this selection" }),
                  ]
                }),
              ]
            }),
          ]
        })]
      })]
    }), b.jsx(Footer, {})]
  });
}
export default AnalyticsPage;
