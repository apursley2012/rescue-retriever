/**
 * +----------------------------------------------------------------------------+
 * | Rescue Retriever                                                           |
 * | Purpose: Displays rescue-candidate reports and related export actions.     |
 * | Author: Alysha Pursley                                                     |
 * | Copyright (c) 2026 Alysha Pursley.                                         |
 * | Rights: Proprietary original contributions; see repository LICENSE.         |
 * +----------------------------------------------------------------------------+
 */
import { Ju, QM, Yc, aN, b, ee, es, iN, lt, m3, ns, rN, tb, ts } from "../assets/runtime-core.js";
import { N as Navigation } from "../components/layout/Navigation.js";
import { F as Footer } from "../components/layout/Footer.js";
import { pageHref } from "../lib/pageLinks.js";
function ReportsPage() {
  const [e, t] = ee.useState(null), n = Ju(lt);
  ee.useEffect(() => {
    if (!e) {
      return undefined;
    }
    const timeoutId = window.setTimeout(() => t(null), 4000);
    return () => window.clearTimeout(timeoutId);
  }, [e]);
  const r = (u, s) => {
    const f = u === "all" ? QM(lt, u) : m3(lt, u);
    tb(f, `rescue-retriever-${u}-${new Date().toISOString().slice(0, 10)}.csv`);
    t(`${s} — ${f.length} records exported`);
  }, o = [{
    id: "all", label: "All Animals", desc: "Complete dataset export — all animal records with rescue program classifications appended.",
    count: lt.length, color: "#1A2F5E", bg: "#EEF2F8", icon: aN
  }, {
    id: "water", label: "Water Rescue Candidates", desc: "Intact female Labrador Retriever Mix, Chesapeake Bay Retriever, and Newfoundland dogs aged 26–156 weeks.",
    count: n.water, color: "#DF5A1A", bg: "#FFF1E8", icon: ns
  }, {
    id: "mountain", label: "Mountain / Wilderness Rescue Candidates", desc: "Intact male working and Nordic breed dogs aged 26–156 weeks.",
    count: n.mountain, color: "#087F8C", bg: "#E6F6F4", icon: ts
  }, {
    id: "disaster", label: "Disaster / Tracking Candidates", desc: "Intact male tracking and protection breed dogs aged 20–300 weeks.",
    count: n.disaster, color: "#6D3DB8", bg: "#F1EAFC", icon: es
  }];
  return b.jsxs("div", {
    className: "min-h-screen bg-[#F6F8FB]", children: [b.jsx(Navigation, {}), b.jsxs("main", {
      id: "main-content", tabIndex: -1, className: "pt-16", children: [b.jsx("div", {
        className: "bg-[#1A2F5E] px-4 sm:px-6 py-12", children: b.jsxs("div", {
          className: "max-w-4xl mx-auto", children: [b.jsx("span", {
            className: "text-[#2BBCD4] text-xs font-semibold uppercase tracking-widest block mb-2", children: "Data Exports"
          }), b.jsx("h1", {
            className: "font-syne font-800 text-white text-4xl mb-2", children: "Reports"
          }), b.jsx("p", {
            className: "text-[#8BA4C4]", children: "Download filtered candidate lists as CSV files for offline review and coordination."
          })]
        })
      }), b.jsxs("div", {
        className: "max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6", children: [e && b.jsxs("div", {
          className: "flex items-center gap-3 bg-[#ECFDF5] border border-[#86EFAC] text-[#166534] px-4 py-3 rounded-xl text-sm animate-fade-in",
          children: [b.jsx(Yc, {
            className: "w-5 h-5 flex-shrink-0"
          }), e]
        }), b.jsx("div", {
          className: "grid gap-4", children: o.map(u => {
            const s = u.icon;
            return b.jsxs("div", {
              className: "bg-white rounded-2xl shadow-sm border border-[#D8E0EE] p-6 flex items-center gap-6 card-hover",
              children: [b.jsx("div", {
                className: "w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0", style: {
                  backgroundColor: u.bg
                }, children: b.jsx(s, {
                  className: "w-7 h-7", style: {
                    color: u.color
                  }
                })
              }), b.jsxs("div", {
                className: "flex-1 min-w-0", children: [b.jsxs("div", {
                  className: "flex items-center gap-3 mb-1", children: [b.jsx("h3", {
                    className: "font-syne font-700 text-[#1A2F5E] text-lg", children: u.label
                  }), b.jsxs("span", {
                    className: "text-xs font-bold px-2 py-0.5 rounded-full", style: {
                      backgroundColor: u.bg, color: u.color
                    }, children: [u.count, " records"]
                  })]
                }), b.jsx("p", {
                  className: "text-[#4A5B7A] text-sm leading-relaxed", children: u.desc
                }), b.jsxs("div", {
                  className: "flex gap-3 mt-2 text-xs text-[#9AA8BF]", children: [b.jsx("span", {
                    children: "Format: CSV"
                  }), b.jsx("span", {
                    children: "·"
                  }), b.jsx("span", {
                    children: "Includes rescue program classifications"
                  })]
                })]
              }), b.jsxs("button", {
                type: "button",
                onClick: () => r(u.id, u.label), className: "flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0 text-white",
                style: {
                  backgroundColor: u.color
                }, children: [b.jsx(rN, {
                  className: "w-4 h-4"
                }), "Download"]
              })]
            }, u.id);
          })
        }), b.jsxs("div", {
          className: "bg-[#F0F9FF] border border-[#BAE6FD] rounded-2xl p-6", children: [b.jsxs("h3", {
            className: "font-syne font-700 text-[#1A2F5E] text-base mb-2 flex items-center gap-2", children: [b.jsx(iN, {
              className: "w-4 h-4 text-[#2BBCD4]"
            }), " About the Exports"]
          }), b.jsxs("div", {
            className: "text-[#374151] text-sm leading-relaxed space-y-2", children: [b.jsx("p", {
              children: "All CSV exports include Animal ID, Name, Type, Breed, Color, Sex, Age, Shelter Location, Latitude, Longitude, Rescue Program Qualifications, and the highest weighted match score."
            }), b.jsx("p", {
              children: 'The "Rescue Program Qualifications" field lists all programs each animal qualifies for, separated by semicolons. Animals qualifying for multiple programs are listed once per row with all qualifications noted.'
            }), b.jsxs("p", {
              children: ["For more granular filtering before export, use the", " ", b.jsx("a", {
                href: pageHref("/dashboard"), className: "text-[#F47920] font-medium hover:underline", children: "Dashboard"
              }), " ", "to apply additional search criteria, then export from there."]
            })]
          })]
        })]
      })]
    }), b.jsx(Footer, {})]
  });
}
export default ReportsPage;
