/**
 * +----------------------------------------------------------------------------+
 * | Rescue Retriever                                                           |
 * | Purpose: Presents the project case study and its supporting navigation.    |
 * | Author: Alysha Pursley                                                     |
 * | Copyright (c) 2026 Alysha Pursley.                                         |
 * | Rights: Proprietary original contributions; see repository LICENSE.         |
 * +----------------------------------------------------------------------------+
 */
import { Pr, ZY, _t, b, } from "../assets/runtime-core.js";
import { N as Navigation } from "../components/layout/Navigation.js";
import { F as Footer } from "../components/layout/Footer.js";
function CaseStudyPage() {
  return b.jsxs("div", {
    className: "min-h-screen bg-[#F6F8FB]", children: [b.jsx(Navigation, {}), b.jsxs("main", {
      id: "main-content", tabIndex: -1, className: "pt-16", children: [b.jsx("div", {
        className: "relative overflow-hidden px-4 sm:px-6 py-20", style: { background: "linear-gradient(135deg, #1A2F5E 0%, #253D7A 50%, #1A9CB5 100%)" }, children: b.jsxs("div", {
          className: "max-w-4xl mx-auto", children: [b.jsx("span", {
            className: "inline-block text-[#2BBCD4] text-xs font-semibold uppercase tracking-widest mb-3",
            children: "Project Documentation"
          }), b.jsx("h1", {
            className: "font-syne font-800 text-white text-5xl sm:text-6xl mb-5 leading-tight", children: "Case Study"
          }), b.jsx("p", {
            className: "text-[#8BA4C4] text-xl max-w-2xl leading-relaxed", children: "A documented look at the client requirements, technical decisions, screening results, and limitations of the Rescue Retriever demonstration."
          })]
        })
      }), b.jsxs("div", {
        className: "max-w-4xl mx-auto px-4 sm:px-6 py-14", children: [b.jsx("div", {
          className: "space-y-8", children: ZY.map((e, t) => {
            const n = e.icon;
            return b.jsxs("div", {
              className: "bg-white rounded-3xl shadow-sm border-2 overflow-hidden animate-fade-in-up",
              style: {
                animationDelay: `${t * 75}ms`, borderColor: `${e.color}55`, "--article-accent": e.color
              }, children: [b.jsx("div", { className: "h-1.5", style: { backgroundColor: e.color } }), b.jsxs("div", {
                className: "flex items-center gap-4 p-7 border-b border-[#EEF2F8]", children: [b.jsx("div", {
                  className: "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0", style: {
                    backgroundColor: e.bg
                  }, children: b.jsx(n, {
                    className: "w-6 h-6", style: {
                      color: e.color
                    }
                  })
                }), b.jsxs("div", {
                  children: [b.jsxs("div", {
                    className: "text-xs font-semibold uppercase tracking-wider mb-0.5", style: {
                      color: e.color
                    }, children: ["Section ", t + 1]
                  }), b.jsx("h2", {
                    className: "font-syne font-800 text-[#1A2F5E] text-2xl", children: e.title
                  })]
                })]
              }), b.jsx("div", {
                className: "article-card-body relative overflow-hidden p-7 pl-9", children: e.content.split(`

                    `).map((r, o) => b.jsx("p", {
                  className: "text-[#374151] text-base leading-relaxed mb-4 last:mb-0", children: r
                }, o))
              })]
            }, e.title);
          })
        }), b.jsxs("div", {
          className: "mt-12 grid sm:grid-cols-2 gap-4", children: [b.jsxs(_t, {
            to: "/articles", className: "group flex items-center justify-between p-5 bg-[#1A2F5E] text-white rounded-2xl hover:bg-[#253D7A] transition-all duration-200 card-hover",
            children: [b.jsxs("div", {
              children: [b.jsx("div", {
                className: "font-syne font-700 text-lg", children: "Read the Articles"
              }), b.jsx("div", {
                className: "text-[#8BA4C4] text-sm mt-0.5", children: "In-depth research and analysis"
              })]
            }), b.jsx(Pr, {
              className: "w-5 h-5 group-hover:translate-x-1 transition-transform"
            })]
          }), b.jsxs(_t, {
            to: "/docs", className: "group flex items-center justify-between p-5 bg-[#F47920] text-[#1A2F5E] rounded-2xl hover:bg-[#D0650E] transition-all duration-200 card-hover",
            children: [b.jsxs("div", {
              children: [b.jsx("div", {
                className: "font-syne font-700 text-lg", children: "Technical Documentation"
              }), b.jsx("div", {
                className: "text-white/75 text-sm mt-0.5", children: "Architecture, data dictionary, user guide"
              })]
            }), b.jsx(Pr, {
              className: "w-5 h-5 group-hover:translate-x-1 transition-transform"
            })]
          })]
        })]
      })]
    }), b.jsx(Footer, {})]
  });
}
export default CaseStudyPage;
