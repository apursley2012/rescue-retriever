/**
 * +----------------------------------------------------------------------------+
 * | Rescue Retriever                                                           |
 * | Purpose: Explains the supported rescue profiles and their qualification    |
 * | criteria.                                                                  |
 * | Author: Alysha Pursley                                                     |
 * | Copyright (c) 2026 Alysha Pursley.                                         |
 * | Rights: Proprietary original contributions; see repository LICENSE.         |
 * +----------------------------------------------------------------------------+
 */
import { Ju, M0, Pr, QY, T0, YY, Yc, _t, b, lt, vR } from "../assets/runtime-core.js";
import { N as Navigation } from "../components/layout/Navigation.js";
import { F as Footer } from "../components/layout/Footer.js";

const profileGradients = [
  "from-[#1E3A8A] via-[#1E40AF] to-[#2BBCD4]",
  "from-[#14532D] via-[#166534] to-[#22C55E]",
  "from-[#78350F] via-[#92400E] to-[#F59E0B]",
];
function RescueProfilesPage() {
  const e = Ju(lt), t = {
    water: e.water, mountain: e.mountain, disaster: e.disaster
  };
  return b.jsxs("div", {
    className: "min-h-screen bg-[#F6F8FB]", children: [b.jsx(Navigation, {}), b.jsxs("main", {
      id: "main-content", tabIndex: -1, className: "pt-16", children: [b.jsx("div", {
        className: "bg-mesh-navy px-4 sm:px-6 py-16", children: b.jsxs("div", {
          className: "max-w-5xl mx-auto text-center", children: [b.jsx("span", {
            className: "inline-block text-[#2BBCD4] text-xs font-semibold uppercase tracking-widest mb-3",
            children: "Rescue Retriever Programs"
          }), b.jsx("h1", {
            className: "font-syne font-800 text-white text-4xl sm:text-5xl mb-4", children: "Rescue Profiles"
          }), b.jsx("p", {
            className: "text-[#8BA4C4] text-lg max-w-2xl mx-auto", children: "Three specialized programs, each with distinct requirements for breed, sex, age, and operational environment. Every dog in the system is evaluated against all three."
          })]
        })
      }), b.jsx("div", {
        className: "max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10", children: T0.map((n, r) => {
          const o = YY[n.icon], u = QY[r], s = t[n.id] ?? 0;
          return b.jsxs("div", {
            className: "bg-white rounded-3xl shadow-sm border border-[#D8E0EE] overflow-hidden card-hover",
            children: [b.jsx("div", {
              className: `bg-gradient-to-r ${profileGradients[r]} p-8`, children: b.jsxs("div", {
                className: "flex items-start justify-between gap-6", children: [b.jsxs("div", {
                  className: "flex items-start gap-5", children: [b.jsx("div", {
                    className: "w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0",
                    children: b.jsx(o, {
                      className: "w-8 h-8 text-white"
                    })
                  }), b.jsxs("div", {
                    children: [b.jsx("h2", {
                      className: "font-syne font-800 text-white text-2xl sm:text-3xl mb-1", children: n.name
                    }), b.jsx("p", {
                      className: "text-white/75 text-base max-w-xl", children: n.description
                    })]
                  })]
                }), b.jsxs("div", {
                  className: "text-right flex-shrink-0", children: [b.jsx("div", {
                    className: "text-4xl font-syne font-800 text-white", children: s
                  }), b.jsx("div", {
                    className: "text-white/70 text-sm", children: "current candidates"
                  })]
                })]
              })
            }), b.jsxs("div", {
              className: "p-8 grid md:grid-cols-2 gap-8", children: [b.jsxs("div", {
                children: [b.jsx("h3", {
                  className: "font-syne font-700 text-[#1A2F5E] text-lg mb-4", children: "Screening Criteria"
                }), b.jsxs("div", {
                  className: "space-y-3", children: [b.jsxs("div", {
                    className: "flex gap-3 p-3 rounded-xl", style: {
                      backgroundColor: `${u}15`
                    }, children: [b.jsx("div", {
                      className: "w-2 mt-1.5 h-2 rounded-full flex-shrink-0", style: {
                        backgroundColor: u
                      }
                    }), b.jsxs("div", {
                      children: [b.jsx("span", {
                        className: "text-[#1A2F5E] font-semibold text-sm", children: "Preferred Breeds"
                      }), b.jsx("p", {
                        className: "text-[#4A5B7A] text-sm mt-0.5", children: n.breeds.join(" · ")
                      })]
                    })]
                  }), b.jsxs("div", {
                    className: "flex gap-3 p-3 rounded-xl", style: {
                      backgroundColor: `${u}10`
                    }, children: [b.jsx("div", {
                      className: "w-2 mt-1.5 h-2 rounded-full flex-shrink-0", style: {
                        backgroundColor: u
                      }
                    }), b.jsxs("div", {
                      children: [b.jsx("span", {
                        className: "text-[#1A2F5E] font-semibold text-sm", children: "Preferred Sex"
                      }), b.jsx("p", {
                        className: "text-[#4A5B7A] text-sm mt-0.5", children: n.sex
                      })]
                    })]
                  }), b.jsxs("div", {
                    className: "flex gap-3 p-3 rounded-xl", style: {
                      backgroundColor: `${u}10`
                    }, children: [b.jsx("div", {
                      className: "w-2 mt-1.5 h-2 rounded-full flex-shrink-0", style: {
                        backgroundColor: u
                      }
                    }), b.jsxs("div", {
                      children: [b.jsx("span", {
                        className: "text-[#1A2F5E] font-semibold text-sm", children: "Training Age"
                      }), b.jsxs("p", {
                        className: "text-[#4A5B7A] text-sm mt-0.5", children: [n.minAgeWeeks, "–", n.maxAgeWeeks,
                          " weeks"]
                      })]
                    })]
                  })]
                }), b.jsx("div", {
                  className: "grid grid-cols-3 gap-3 mt-5", children: [{
                    icon: vR, label: "Breed Criteria", value: String(n.breeds.length)
                  }, {
                    icon: M0, label: "Age Range", value: `${n.minAgeWeeks}–${n.maxAgeWeeks} wk`
                  }, {
                    icon: Yc, label: "Candidates", value: String(s)
                  }].map(({ icon: f, label: d, value: h }) => b.jsxs("div", {
                    className: "bg-[#F6F8FB] rounded-xl p-3 text-center", children: [b.jsx(f, {
                      className: "w-4 h-4 mx-auto mb-1", style: {
                        color: u
                      }
                    }), b.jsx("div", {
                      className: "font-syne font-700 text-[#1A2F5E] text-sm", children: h
                    }), b.jsx("div", {
                      className: "text-[#9AA8BF] text-xs", children: d
                    })]
                  }, d))
                })]
              }), b.jsxs("div", {
                children: [b.jsx("h3", {
                  className: "font-syne font-700 text-[#1A2F5E] text-lg mb-4", children: "Program Overview"
                }), b.jsx("p", {
                  className: "text-[#4A5B7A] text-sm leading-relaxed mb-5", children: n.longDescription
                }), b.jsx("h4", {
                  className: "font-semibold text-[#1A2F5E] text-sm mb-3", children: "Operational Capabilities"
                }), b.jsx("ul", {
                  className: "space-y-2 mb-5", children: n.capabilities.map(f => b.jsxs("li", {
                    className: "flex items-center gap-2 text-sm text-[#4A5B7A]", children: [b.jsx(Yc, {
                      className: "w-4 h-4 flex-shrink-0", style: {
                        color: u
                      }
                    }), f]
                  }, f))
                }), b.jsxs("div", {
                  className: "p-3 rounded-xl text-sm", style: {
                    backgroundColor: `${u}12`
                  }, children: [b.jsx("span", {
                    className: "font-semibold text-[#1A2F5E]", children: "Environment: "
                  }), b.jsx("span", {
                    className: "text-[#4A5B7A]", children: n.environment
                  })]
                }), b.jsxs(_t, {
                  to: `/dashboard?filter=${n.id}`, className: "mt-5 w-full flex items-center justify-center gap-2 text-white text-sm font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95",
                  style: {
                    backgroundColor: u
                  }, children: ["Browse ", n.shortName, " Rescue Candidates", b.jsx(Pr, {
                    className: "w-4 h-4"
                  })]
                })]
              })]
            })]
          }, n.id);
        })
      }), b.jsx("div", {
        className: "bg-[#1A2F5E] py-12 px-4 sm:px-6 mt-8", children: b.jsxs("div", {
          className: "max-w-4xl mx-auto text-center", children: [b.jsx("h2", {
            className: "font-syne font-800 text-white text-2xl mb-3", children: "How Matching Works"
          }), b.jsx("p", {
            className: "text-[#8BA4C4] text-base max-w-2xl mx-auto mb-6", children: "Each animal in the dataset is evaluated against all three rescue program profiles. An animal qualifies for a program if — and only if — its breed, sex, and age all meet the program's criteria simultaneously. Animals may qualify for multiple programs."
          }), b.jsxs(_t, {
            to: "/dashboard", className: "inline-flex items-center gap-2 bg-[#F47920] text-[#1A2F5E] font-semibold px-6 py-3 rounded-xl hover:bg-[#D0650E] transition-all duration-200 hover:scale-105",
            children: ["Find Candidates in the Dashboard ", b.jsx(Pr, {
              className: "w-4 h-4"
            })]
          })]
        })
      })]
    }), b.jsx(Footer, {})]
  });
}
export default RescueProfilesPage;
