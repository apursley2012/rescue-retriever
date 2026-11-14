/**
 * +----------------------------------------------------------------------------+
 * | Rescue Retriever                                                           |
 * | Purpose: Presents implementation and data documentation within the         |
 * | application.                                                               |
 * | Author: Alysha Pursley                                                     |
 * | Copyright (c) 2026 Alysha Pursley.                                         |
 * | Rights: Proprietary original contributions; see repository LICENSE.         |
 * +----------------------------------------------------------------------------+
 */
import { VM, YM, b, ee, nN, rV, tN } from "../assets/runtime-core.js";
import { N as Navigation } from "../components/layout/Navigation.js";
import { F as Footer } from "../components/layout/Footer.js";
import { pageHref } from "../lib/pageLinks.js";
function DocumentationPage() {
  const [e, t] = ee.useState({
    overview: !0
  }), n = r => t(o => ({
    ...o, [r]: !o[r]
  }));
  return b.jsxs("div", {
    className: "min-h-screen bg-[#F6F8FB]", children: [b.jsx(Navigation, {}), b.jsxs("main", {
      id: "main-content", tabIndex: -1, className: "pt-16", children: [b.jsx("div", {
        className: "relative overflow-hidden px-4 sm:px-6 py-20", style: { background: "linear-gradient(135deg, #1A2F5E 0%, #253D7A 50%, #1A9CB5 100%)" }, children: b.jsxs("div", {
          className: "max-w-5xl mx-auto", children: [b.jsxs("div", {
            className: "flex items-center gap-3 mb-4", children: [b.jsx(nN, {
              className: "w-8 h-8 text-[#2BBCD4]"
            }), b.jsx("span", {
              className: "text-[#2BBCD4] text-xs font-semibold uppercase tracking-widest", children: "Technical Reference"
            })]
          }), b.jsx("h1", {
            className: "font-syne font-800 text-white text-5xl mb-4", children: "Documentation"
          }), b.jsx("p", {
            className: "text-[#8BA4C4] text-lg max-w-2xl", children: "Architecture overview, data dictionary, rescue criteria reference, and complete user guide for the Rescue Retriever application."
          })]
        })
      }), b.jsxs("div", {
        className: "max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-4", children: [rV.map(r => {
          const o = r.icon, u = !!e[r.id];
          return b.jsxs("div", {
            className: "bg-white rounded-3xl shadow-sm border-2 overflow-hidden", style: { borderColor: `${r.color}55`, "--article-accent": r.color }, children: [b.jsx("div", { className: "h-1.5", style: { backgroundColor: r.color } }), b.jsxs("button", {
              type: "button",
              onClick: () => n(r.id), "aria-controls": `documentation-${r.id}`, className: "w-full flex items-center justify-between p-6 text-left hover:bg-[#F6F8FB] transition-colors duration-150",
              "aria-expanded": u, children: [b.jsxs("div", {
                className: "flex items-center gap-4", children: [b.jsx("div", {
                  className: "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0", style: {
                    backgroundColor: r.bg
                  }, children: b.jsx(o, {
                    className: "w-5 h-5", style: {
                      color: r.color
                    }
                  })
                }), b.jsx("h2", {
                  className: "font-syne font-800 text-[#1A2F5E] text-xl", children: r.title
                })]
              }), u ? b.jsx(VM, {
                className: "w-5 h-5 text-[#9AA8BF]"
              }) : b.jsx(tN, {
                className: "w-5 h-5 text-[#9AA8BF]"
              })]
            }), b.jsx("div", {
              id: `documentation-${r.id}`, hidden: !u, className: "article-card-body relative overflow-hidden border-t border-[#EEF2F8] px-8 py-7 space-y-6 animate-fade-in", children: r.subsections.map(s => b.jsxs("div", {
                children: [b.jsx("h3", {
                  className: "font-syne font-700 text-base mb-2 pb-1 border-b", style: {
                    color: r.color, borderColor: `${r.color}30`
                  }, children: s.title
                }), s.content.split(". ").reduce((f, d, h) => (h === 0 || f[f.length - 1].split(". ").length >= 4 ? f.push(d) : f[f.length - 1] += ". " + d,
                  f), []).map((f, d) => b.jsxs("p", {
                    className: "text-[#374151] text-sm leading-relaxed mb-2 last:mb-0", children: [f, !f.endsWith(".") && d < 99 ? "." : ""]
                  }, d))]
              }, s.title))
            })]
          }, r.id);
        }), b.jsxs("div", {
          className: "bg-[#1A2F5E] rounded-2xl p-7 mt-8", children: [b.jsx("h2", {
            className: "font-syne font-800 text-white text-xl mb-5", children: "Quick Links"
          }), b.jsx("div", {
            className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-3", children: [{
              label: "Dashboard", href: "/dashboard"
            }, {
              label: "Analytics", href: "/analytics"
            }, {
              label: "Rescue Profiles", href: "/profiles"
            }, {
              label: "Reports", href: "/reports"
            }, {
              label: "Case Study", href: "/case-study"
            }, {
              label: "Articles", href: "/articles"
            }].map(r => b.jsxs("a", {
              href: pageHref(r.href), className: "flex items-center gap-2 text-[#8BA4C4] hover:text-[#2BBCD4] text-sm font-medium transition-colors py-1.5",
              children: [b.jsx(YM, {
                className: "w-3.5 h-3.5 flex-shrink-0"
              }), r.label]
            }, r.label))
          })]
        })]
      })]
    }), b.jsx(Footer, {})]
  });
}
export default DocumentationPage;
