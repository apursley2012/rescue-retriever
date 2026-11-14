/**
 * +----------------------------------------------------------------------------+
 * | Rescue Retriever                                                           |
 * | Purpose: Displays one dog record, its attributes, and rescue-profile       |
 * | qualification details.                                                     |
 * | Author: Alysha Pursley                                                     |
 * | Copyright (c) 2026 Alysha Pursley.                                         |
 * | Rights: Proprietary original contributions; see repository LICENSE.         |
 * +----------------------------------------------------------------------------+
 */
import { formatAnimalAge } from "../lib/ageDisplay.js";
import { GY, JM, KM, N0, T0, XM, Yc, ZM, _t, b, lt, lu, z3 } from "../assets/runtime-core.js";
import { N as Navigation } from "../components/layout/Navigation.js";
import { F as Footer } from "../components/layout/Footer.js";
import { getFacilityCityState } from "../lib/locationDisplay.js";
function CandidateDetailPage() {
  const { id: e } = KM(), t = XM();
  // Stable source-record IDs disambiguate repeated shelter animal IDs.
  // Retain support for existing animal-ID URLs created before this change.
  const n = /^\d+$/.test(e ?? "")
    ? lt.find(animal => animal.animalType === "Dog" && animal.recordId === Number(e))
    : lt.find(animal => animal.animalType === "Dog" && animal.animalId === e);
  if (!n)
    return b.jsxs("div", {
      className: "min-h-screen bg-[#F6F8FB]", children: [b.jsx(Navigation, {}), b.jsxs("main", {
        className: "pt-24 px-4 max-w-2xl mx-auto text-center", children: [b.jsx("h1", {
          className: "font-syne font-800 text-[#1A2F5E] text-3xl mb-4", children: "Animal Not Found"
        }), b.jsxs("p", {
          className: "text-[#4A5B7A] mb-6", children: ['No animal record found with ID "', e, '".']
        }), b.jsxs(_t, {
          to: "/dashboard", className: "bg-[#F47920] text-[#1A2F5E] px-5 py-2.5 rounded-xl font-semibold text-sm inline-flex items-center gap-2",
          children: [b.jsx(lu, {
            className: "w-4 h-4"
          }), " Back to Dashboard"]
        })]
      })]
    });
  const r = JM(n), o = Math.round(n.ageWeeks), u = r.length > 0;
  return b.jsxs("div", {
    className: "min-h-screen bg-[#F6F8FB]", children: [b.jsx(Navigation, {}), b.jsxs("main", {
      id: "main-content", tabIndex: -1, className: "pt-16", children: [b.jsx("div", {
        className: "bg-[#1A2F5E] px-4 sm:px-6 py-10", children: b.jsxs("div", {
          className: "max-w-5xl mx-auto", children: [b.jsxs("button", {
            type: "button",
            onClick: () => t("/dashboard"), className: "flex items-center gap-2 text-[#8BA4C4] hover:text-white text-sm mb-5 transition-colors",
            children: [b.jsx(lu, {
              className: "w-4 h-4"
            }), " Back"]
          }), b.jsxs("div", {
            className: "flex items-start justify-between gap-6", children: [b.jsxs("div", {
              children: [b.jsxs("div", {
                className: "flex items-center gap-3 mb-2", children: [b.jsx("h1", {
                  className: "font-syne font-800 text-white text-4xl", children: n.name || "Unnamed"
                }), u && b.jsx("span", {
                  className: "bg-[#F47920] text-[#1A2F5E] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide animate-pulse-glow",
                  children: "Candidate"
                })]
              }), b.jsx("p", {
                className: "text-[#8BA4C4] text-lg", children: n.breed
              }), b.jsx("p", {
                className: "text-[#5A6F8E] text-sm font-mono mt-1", children: n.animalId
              })]
            }), b.jsxs("div", {
              className: "flex flex-wrap gap-2", children: [r.map(s => {
                const { label: f, cls: d, icon: h } = GY[s];
                return b.jsxs("span", {
                  className: `${d} flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full`,
                  children: [b.jsx(h, {
                    className: "w-4 h-4"
                  }), " ", f]
                }, s);
              }), !u && b.jsx("span", {
                className: "badge-none text-sm font-semibold px-3 py-1.5 rounded-full", children: "No Program Match"
              })]
            })]
          })]
        })
      }), b.jsxs("div", {
        className: "max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8", children: [b.jsxs("div", {
          className: "grid md:grid-cols-2 gap-6", children: [b.jsxs("div", {
            className: "bg-white rounded-2xl shadow-sm border border-[#D8E0EE] p-6", children: [b.jsx("h2", {
              className: "font-syne font-700 text-[#1A2F5E] text-lg mb-5 pb-3 border-b border-[#EEF2F8]",
              children: "Animal Information"
            }), b.jsx("dl", {
              className: "space-y-3", children: [{
                label: "Animal ID", value: n.animalId
              }, {
                label: "Name", value: n.name || "Unnamed"
              }, {
                label: "Animal Type", value: n.animalType
              }, {
                label: "Breed", value: n.breed
              }, {
                label: "Color", value: n.color
              }, {
                label: "Sex", value: n.sex
              }, {
                label: "Age", value: formatAnimalAge(n.ageWeeks)
              }].map(({ label: s, value: f }) => b.jsxs("div", {
                className: "flex gap-4", children: [b.jsx("dt", {
                  className: "text-[#9AA8BF] text-sm min-w-[110px]", children: s
                }), b.jsx("dd", {
                  className: "text-[#1A2F5E] text-sm font-medium", children: f
                })]
              }, s))
            })]
          }), b.jsxs("div", {
            className: "bg-white rounded-2xl shadow-sm border border-[#D8E0EE] p-6", children: [b.jsx("h2", {
              className: "font-syne font-700 text-[#1A2F5E] text-lg mb-5 pb-3 border-b border-[#EEF2F8]",
              children: "Shelter Location"
            }), b.jsx("dl", {
              className: "space-y-3", children: [{
                label: "Facility", value: n.location
              }, {
                label: "City, State (facility)", value: getFacilityCityState(n)
              }].map(({ label: s, value: f }) => b.jsxs("div", {
                className: "flex gap-4", children: [b.jsx("dt", {
                  className: "text-[#9AA8BF] text-sm min-w-[120px]", children: s
                }), b.jsx("dd", {
                  className: "text-[#1A2F5E] text-sm font-medium", children: f
                })]
              }, s))
            }), b.jsxs("div", {
              className: "mt-5 pt-4 border-t border-[#EEF2F8]", children: [b.jsxs("div", {
                className: "flex items-center gap-2 text-[#4A5B7A] text-sm mb-2", children: [b.jsx(N0, {
                  className: "w-4 h-4 text-[#F47920]"
                }), b.jsx("span", {
                  className: "font-medium", children: "Recorded facility location"
                })]
              }), b.jsx("p", {
                className: "text-[#7A8FA8] text-xs", children: "The facility city is not a verified current location for this animal."
              })]
            })]
          })]
        }), b.jsxs("div", {
          className: "bg-white rounded-2xl shadow-sm border border-[#D8E0EE] p-6", children: [b.jsx("h2", {
            className: "font-syne font-700 text-[#1A2F5E] text-xl mb-6", children: "Rescue Program Suitability"
          }), b.jsx("div", {
            className: "grid md:grid-cols-3 gap-4", children: T0.map(s => {
              const f = ZM(n, s), d = f.qualifies, h = f.breedMatch, y = f.sexMatch, m = f.ageMatch;
              return b.jsxs("div", {
                className: `rounded-2xl p-5 border-2 transition-all ${d ? "border-[#22C55E] bg-[#F0FDF4]" : "border-[#E5E7EB] bg-[#F9FAFB]"}`,
                children: [b.jsxs("div", {
                  className: "flex items-center justify-between mb-3", children: [b.jsx("h3", {
                    className: "font-syne font-700 text-[#1A2F5E] text-sm", children: s.name
                  }), b.jsxs("div", {
                    className: "flex items-center gap-2", children: [b.jsxs("span", {
                      className: "font-syne font-800 text-sm", style: {
                        color: s.color
                      }, children: [f.matchScore, "/100"]
                    }), d ? b.jsx(Yc, {
                      className: "w-5 h-5 text-[#22C55E]"
                    }) : b.jsx(z3, {
                      className: "w-5 h-5 text-[#D1D5DB]"
                    })]
                  })]
                }), b.jsx("div", {
                  className: "space-y-2", children: [{
                    label: "Breed", passes: h, note: h ? "Match" : "No match"
                  }, {
                    label: "Sex", passes: y, note: s.sex
                  }, {
                    label: "Age", passes: m, note: `${s.minAgeWeeks}–${s.maxAgeWeeks} wks (animal: ${o})`
                  }].map(({ label: g, passes: A, note: O }) => b.jsxs("div", {
                    className: "flex items-start gap-2", children: [b.jsx("div", {
                      className: `w-4 h-4 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center text-white text-xs ${A ? "bg-[#22C55E]" : "bg-[#E5E7EB]"}`,
                      children: A ? "✓" : ""
                    }), b.jsxs("div", {
                      children: [b.jsxs("span", {
                        className: "text-xs font-medium text-[#1A2F5E]", children: [g, ": "]
                      }), b.jsx("span", {
                        className: `text-xs ${A ? "text-[#166534]" : "text-[#9AA8BF]"}`, children: O
                      })]
                    })]
                  }, g))
                }), d && b.jsx("div", {
                  className: "mt-3 pt-3 border-t border-[#BBF7D0]", children: b.jsx("p", {
                    className: "text-xs text-[#166534] font-semibold", children: "✓ Qualifies for this program"
                  })
                })]
              }, s.id);
            })
          })]
        }), b.jsxs("div", {
          className: "flex items-center justify-between", children: [b.jsxs(_t, {
            to: "/dashboard", className: "flex items-center gap-2 text-[#4A5B7A] hover:text-[#1A2F5E] text-sm font-medium transition-colors",
            children: [b.jsx(lu, {
              className: "w-4 h-4"
            }), " Back to Dashboard"]
          }), b.jsx(_t, {
            to: "/profiles", className: "flex items-center gap-2 bg-[#F47920] hover:bg-[#B84D00] text-[#1A2F5E] hover:text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all",
            children: "View Rescue Profiles"
          })]
        })]
      })]
    }), b.jsx(Footer, {})]
  });
}
export default CandidateDetailPage;
