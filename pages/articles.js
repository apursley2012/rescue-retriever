/**
 * +----------------------------------------------------------------------------+
 * | Rescue Retriever                                                           |
 * | Purpose: Renders the article index using the project article data.         |
 * | Author: Alysha Pursley                                                     |
 * | Copyright (c) 2026 Alysha Pursley.                                         |
 * | Rights: Proprietary original contributions; see repository LICENSE.         |
 * +----------------------------------------------------------------------------+
 */
import { GM, M0, Pr, _t, b, eV, lN, nb, } from "../assets/runtime-core.js";
import { articleHref } from "../lib/pageLinks.js";
import { N as Navigation } from "../components/layout/Navigation.js";
import { F as Footer } from "../components/layout/Footer.js";
function ArticlesPage() {
  return b.jsxs("div", {
    className: "min-h-screen bg-[#F6F8FB]", children: [b.jsx(Navigation, {}), b.jsxs("main", {
      id: "main-content", tabIndex: -1, className: "pt-16", children: [b.jsxs("div", {
        className: "relative overflow-hidden px-4 sm:px-6 py-20", style: {
          background: "linear-gradient(135deg, #1A2F5E 0%, #253D7A 50%, #1A9CB5 100%)"
        }, children: [b.jsx("div", {
          className: "absolute -right-16 -top-20 h-72 w-72 rounded-full border-[42px] border-[#2BBCD4]/25"
        }), b.jsx("div", {
          className: "absolute right-1/3 -bottom-20 h-44 w-44 rounded-full bg-[#F47920]/10"
        }), b.jsxs("div", {
          className: "relative max-w-5xl mx-auto", children: [b.jsx("span", {
            className: "inline-block text-[#60D4E8] text-xs font-semibold uppercase tracking-widest mb-3",
            children: "Research & Writing"
          }), b.jsxs("h1", {
            className: "font-syne font-800 text-white text-4xl sm:text-6xl leading-[1.02] mb-6 max-w-3xl",
            children: ["Field notes, research", b.jsx("span", {
              className: "block text-[#FF8A32]", children: "& technical decisions."
            })]
          }), b.jsx("p", {
            className: "text-[#B8C8DD] text-lg max-w-2xl leading-relaxed", children: "Research, analysis, and development insights behind the data-driven work of identifying shelter dogs with search-and-rescue potential."
          })]
        })]
      }), b.jsx("div", {
        className: "max-w-5xl mx-auto px-4 sm:px-6 py-12", children: b.jsx("div", {
          className: "grid gap-6", children: nb.map((e, t) => {
            const n = eV[e.category] ?? {
              bg: "#EEF2F8", text: "#1A2F5E"
            };
            const categoryAccents = { Research: "#F47920", Technical: "#2BBCD4", Analysis: "#22C55E" };
            const r = categoryAccents[e.category] ?? GM[t % GM.length];
            return b.jsxs("a", {
              href: articleHref(e.id), className: "group block bg-white rounded-3xl shadow-sm border-2 overflow-hidden card-hover", style: { borderColor: `${r}55`, "--article-accent": r },
              children: [b.jsx("div", {
                className: "h-1.5", style: {
                  backgroundColor: r
                }
              }), b.jsxs("div", {
                className: "article-card-body relative overflow-hidden", children: [b.jsxs("div", {
                  className: "relative z-10 p-7 sm:p-9", children: [b.jsx("span", {
                    className: "article-card-index", "aria-hidden": "true", children: String(t + 1).padStart(2, "0")
                  }), b.jsxs("div", {
                    className: "flex flex-wrap items-center gap-3 mb-4", children: [b.jsx("span", {
                      className: "text-xs font-semibold px-3 py-1 rounded-full", style: {
                        backgroundColor: n.bg, color: n.text
                      }, children: e.category
                    }), b.jsxs("div", {
                      className: "flex items-center gap-1.5 text-[#9AA8BF] text-xs", children: [b.jsx(M0, {
                        className: "w-3.5 h-3.5"
                      }), e.readTime]
                    }), b.jsx("div", {
                      className: "text-[#9AA8BF] text-xs", children: e.date
                    })]
                  }), b.jsx("h2", {
                    className: "font-syne font-800 text-[#1A2F5E] text-xl sm:text-2xl mb-2 group-hover:text-[#F47920] transition-colors duration-200 leading-tight",
                    children: e.title
                  }), b.jsx("p", {
                    className: "border-l-2 border-[#2BBCD4] pl-3 text-[#4A5B7A] text-sm italic mb-4",
                    children: e.subtitle
                  }), b.jsx("p", {
                    className: "text-[#4A5B7A] text-base leading-relaxed mb-5", children: e.excerpt
                  }), b.jsxs("div", {
                    className: "flex flex-wrap items-end justify-between gap-4", children: [b.jsx("div", {
                      className: "flex flex-wrap gap-2", children: e.tags.map(o => b.jsxs("span", {
                        className: "flex items-center gap-1 text-xs text-[#7A8FA8] bg-[#F6F8FB] px-2.5 py-1 rounded-full border border-[#D8E0EE]",
                        children: [b.jsx(lN, {
                          className: "w-3 h-3"
                        }), " ", o]
                      }, o))
                    }), b.jsxs("div", {
                      className: "flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all duration-200",
                      style: {
                        color: r
                      }, children: ["Read article ", b.jsx(Pr, {
                        className: "w-4 h-4"
                      })]
                    })]
                  })]
                })]
              })]
            }, e.id);
          })
        })
      })]
    }), b.jsx(Footer, {})]
  });
}
export default ArticlesPage;
