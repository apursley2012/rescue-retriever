/**
 * +----------------------------------------------------------------------------+
 * | Rescue Retriever                                                           |
 * | Purpose: Renders the landing page and routes visitors to rescue screening  |
 * | and project information.                                                   |
 * | Author: Alysha Pursley                                                     |
 * | Copyright (c) 2026 Alysha Pursley.                                         |
 * | Rights: Proprietary original contributions; see repository LICENSE.         |
 * +----------------------------------------------------------------------------+
 */
import { Pr, WR, ZR, _t, b, f3, ho, } from "../assets/runtime-core.js";
import { N as Navigation } from "../components/layout/Navigation.js";
import { F as Footer } from "../components/layout/Footer.js";
import { StatCard } from "../components/ui/StatCard.js";
function HomePage() {
  return b.jsxs("div", {
    className: "min-h-screen", children: [b.jsx(Navigation, {}), b.jsxs("section", {
      id: "main-content", tabIndex: -1, className: "rr-designed-hero-section relative flex items-center bg-mesh-navy pt-16", children: [b.jsxs("div", {
        className: "rr-designed-hero-container relative z-10 mx-auto flex w-full flex-col items-center text-center",
        children: [b.jsx("span", {
          className: "rr-hero-orange-orb", "aria-hidden": "true"
        }), b.jsx("span", {
          className: "rr-hero-teal-ring", "aria-hidden": "true"
        }), b.jsx("div", {
          className: "rr-home-top-logo animate-fade-in", children: b.jsx("div", {
            className: "rr-home-logo-glass", children: b.jsx("img", {
              src: f3, alt: "Rescue Retriever", width: 698, height: 852, className: "rr-home-top-logo-image"
            })
          })
        }), b.jsxs("div", {
          className: "inline-flex items-center gap-2 bg-[#F47920]/20 border border-[#F47920]/30 text-[#F8A058] text-xs font-semibold px-3 py-1.5 rounded-full mb-6 animate-fade-in",
          children: [b.jsx("div", {
            className: "w-1.5 h-1.5 rounded-full bg-[#F47920] animate-pulse"
          }), "Austin Animal Center Dataset"]
        }), b.jsxs("h1", {
          className: "font-syne font-800 text-white text-5xl sm:text-6xl xl:text-7xl leading-[1.05] mb-6 animate-fade-in-up max-w-4xl",
          children: ["Find the dogs", " ", b.jsx("span", {
            className: "gradient-text-orange", children: "built to save"
          }), " ", "lives."]
        }), b.jsx("p", {
          className: "text-[#8BA4C4] text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl animate-fade-in-up delay-150",
          children: "Rescue Retriever surfaces search-and-rescue training candidates hidden within Austin shelter populations — giving organizations the tools to identify, evaluate, and place high-drive animals where they can make the greatest impact."
        }), b.jsxs("div", {
          className: "flex flex-col sm:flex-row gap-4 mb-14 animate-fade-in-up delay-300", children: [b.jsxs(_t, {
            to: "/dashboard", className: "inline-flex items-center justify-center gap-2 bg-[#F47920] hover:bg-[#B84D00] text-[#1A2F5E] hover:text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-[#F47920]/30",
            children: ["Open Dashboard", b.jsx(Pr, {
              className: "w-4 h-4 animate-bounce-x"
            })]
          }), b.jsx(_t, {
            to: "/profiles", className: "inline-flex items-center justify-center gap-2 border border-[#2BBCD4]/40 text-[#2BBCD4] hover:bg-[#2BBCD4]/10 font-semibold px-8 py-3.5 rounded-xl transition-all duration-200",
            children: "View Rescue Profiles"
          })]
        }), b.jsx("div", {
          className: "relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 w-full animate-fade-in-up delay-450",
          children: [{
            label: "Unique Candidate Dogs", value: ho.total, color: "#F47920"
          }, {
            label: "Water Rescue", value: ho.water, color: "#DF5A1A"
          }, {
            label: "Mountain / Wilderness", value: ho.mountain, color: "#087F8C"
          }, {
            label: "Disaster / Tracking", value: ho.disaster, color: "#7C3AED"
          }].map(e => b.jsx(StatCard, {
            label: e.label,
            value: e.value,
            color: e.color,
            borderColor: `${e.color}55`,
            interactive: true
          }, e.label))
        })]
      }), b.jsx("div", {
        className: "absolute bottom-0 left-0 right-0 wave-divider", children: b.jsx("svg", {
          viewBox: "0 0 1440 80", preserveAspectRatio: "none", xmlns: "http://www.w3.org/2000/svg", children: b.jsx("path", {
            d: "M0,50 C360,0 720,80 1080,30 C1260,10 1380,60 1440,40 L1440,80 L0,80 Z", fill: "#F6F8FB"
          })
        })
      })]
    }), b.jsx("section", {
      className: "bg-[#F6F8FB] py-24 px-4 sm:px-6", children: b.jsxs("div", {
        className: "max-w-7xl mx-auto", children: [b.jsxs("div", {
          className: "text-center mb-14", children: [b.jsx("span", {
            className: "inline-block text-[#F47920] font-semibold text-sm uppercase tracking-widest mb-3",
            children: "Supported Programs"
          }), b.jsx("h2", {
            className: "font-syne font-800 text-[#1A2F5E] text-4xl sm:text-5xl mb-4", children: "Three rescue specializations"
          }), b.jsx("p", {
            className: "text-[#4A5B7A] text-lg max-w-2xl mx-auto", children: "Each program uses the breed, sex, and age requirements supplied in the client rescue criteria."
          })]
        }), b.jsx("div", {
          className: "grid md:grid-cols-3 gap-6", children: ZR.map(e => {
            const t = e.icon;
            return b.jsxs("div", {
              className: "group relative overflow-hidden rounded-2xl card-hover cursor-default", children: [b.jsxs("div", {
                className: `bg-gradient-to-br ${e.gradient} p-8 pb-10`, children: [b.jsx("div", {
                  className: "w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-4",
                  children: b.jsx(t, {
                    className: "w-7 h-7 text-white"
                  })
                }), b.jsx("h3", {
                  className: "font-syne font-700 text-white text-2xl mb-2", children: e.label
                }), b.jsx("p", {
                  className: "text-white/80 text-sm leading-relaxed", children: e.desc
                })]
              }), b.jsxs("div", {
                className: "bg-white p-6 -mt-2 rounded-t-2xl shadow-sm", children: [b.jsxs("div", {
                  className: "flex items-center justify-between mb-4", children: [b.jsx("span", {
                    className: "text-3xl font-syne font-800 text-[#1A2F5E]", children: e.count
                  }), b.jsx("span", {
                    className: "text-[#4A5B7A] text-sm", children: "current candidates"
                  })]
                }), b.jsxs("div", {
                  className: "space-y-2 text-sm", children: [b.jsxs("div", {
                    className: "flex gap-2", children: [b.jsx("span", {
                      className: "text-[#9AA8BF] min-w-10", children: "Sex"
                    }), b.jsx("span", {
                      className: "text-[#1A2F5E] font-medium", children: e.sex
                    })]
                  }), b.jsxs("div", {
                    className: "flex gap-2", children: [b.jsx("span", {
                      className: "text-[#9AA8BF] min-w-10", children: "Age"
                    }), b.jsx("span", {
                      className: "text-[#1A2F5E] font-medium", children: e.age
                    })]
                  })]
                }), b.jsx("div", {
                  className: "mt-4 pt-4 border-t border-[#EEF2F8]", children: b.jsx("p", {
                    className: "text-[#7A8FA8] text-xs leading-relaxed", children: e.breeds
                  })
                }), b.jsxs(_t, {
                  to: `/dashboard?filter=${e.id}`, className: "mt-4 w-full flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] active:scale-95",
                  style: {
                    borderColor: e.accent, color: e.accent
                  }, onMouseEnter: n => {
                    n.currentTarget.style.backgroundColor = e.accent, n.currentTarget.style.color = "#fff";
                  }, onMouseLeave: n => {
                    n.currentTarget.style.backgroundColor = "#00000000", n.currentTarget.style.color = e.accent;
                  }, onFocus: n => {
                    n.currentTarget.style.backgroundColor = e.accent, n.currentTarget.style.color = "#fff";
                  }, onBlur: n => {
                    n.currentTarget.style.backgroundColor = "#00000000", n.currentTarget.style.color = e.accent;
                  }, children: ["View Candidates", b.jsx(Pr, {
                    className: "w-3.5 h-3.5"
                  })]
                })]
              })]
            }, e.id);
          })
        })]
      })
    }), b.jsx("section", {
      className: "bg-white py-24 px-4 sm:px-6", children: b.jsx("div", {
        className: "max-w-7xl mx-auto", children: b.jsxs("div", {
          className: "grid lg:grid-cols-2 gap-16 items-center", children: [b.jsxs("div", {
            children: [b.jsx("span", {
              className: "inline-block text-[#2BBCD4] font-semibold text-sm uppercase tracking-widest mb-3",
              children: "Platform Features"
            }), b.jsx("h2", {
              className: "font-syne font-800 text-[#1A2F5E] text-4xl sm:text-5xl mb-6", children: "Everything you need to find the right dog"
            }), b.jsx("p", {
              className: "text-[#4A5B7A] text-lg leading-relaxed mb-8", children: "Rescue Retriever combines real shelter data with purpose-built tools so coordinators and rescue organizations can move from raw dataset to qualified candidate list in minutes."
            }), b.jsxs(_t, {
              to: "/docs", className: "inline-flex items-center gap-2 text-[#F47920] font-semibold hover:gap-3 transition-all duration-200",
              children: ["Read the documentation ", b.jsx(Pr, {
                className: "w-4 h-4"
              })]
            })]
          }), b.jsx("div", {
            className: "grid grid-cols-2 gap-4", children: WR.map((e, t) => {
              const n = e.icon;
              return b.jsxs("div", {
                className: "rounded-2xl p-5 card-hover", style: {
                  backgroundColor: e.bg, animationDelay: `${t * 75}ms`
                }, children: [b.jsx("div", {
                  className: "w-10 h-10 rounded-xl flex items-center justify-center mb-3", style: {
                    backgroundColor: `${e.color}20`
                  }, children: b.jsx(n, {
                    className: "w-5 h-5", style: {
                      color: e.color
                    }
                  })
                }), b.jsx("h3", {
                  className: "font-syne font-700 text-[#1A2F5E] text-base mb-1", children: e.title
                }), b.jsx("p", {
                  className: "text-[#4A5B7A] text-xs leading-relaxed", children: e.desc
                })]
              }, e.title);
            })
          })]
        })
      })
    }), b.jsx("section", {
      className: "bg-mesh-orange py-20 px-4 sm:px-6", children: b.jsxs("div", {
        className: "max-w-4xl mx-auto text-center", children: [b.jsx("h2", {
          className: "font-syne font-800 text-white text-4xl sm:text-5xl mb-5", children: "Ready to find tomorrow's rescue dogs?"
        }), b.jsx("p", {
          className: "text-white/80 text-lg mb-8 max-w-2xl mx-auto", children: "Open the dashboard to search, filter, and export shelter records. Every second a qualified dog waits in a shelter is a second their potential goes unrecognized."
        }), b.jsxs("div", {
          className: "flex flex-col sm:flex-row gap-4 justify-center", children: [b.jsxs(_t, {
            to: "/dashboard", className: "inline-flex items-center justify-center gap-2 bg-white text-[#F47920] font-semibold px-8 py-4 rounded-xl hover:scale-105 transition-all duration-200 shadow-lg",
            children: ["Open Dashboard ", b.jsx(Pr, {
              className: "w-4 h-4"
            })]
          }), b.jsx(_t, {
            to: "/analytics", className: "inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-200",
            children: "View Analytics"
          })]
        })]
      })
    }), b.jsx(Footer, {})]
  });
}
export default HomePage;
