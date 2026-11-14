/**
 * +----------------------------------------------------------------------------+
 * | Rescue Retriever                                                           |
 * | Purpose: Resolves article URLs and presents the selected project article.  |
 * | Author: Alysha Pursley                                                     |
 * | Copyright (c) 2026 Alysha Pursley.                                         |
 * | Rights: Proprietary original contributions; see repository LICENSE.         |
 * +----------------------------------------------------------------------------+
 */
import { KM, M0, _t, b, eb, lN, lu, nb } from "../assets/runtime-core.js";
import { articleHref, pageHref } from "../lib/pageLinks.js";
import { N as Navigation } from "../components/layout/Navigation.js";
import { F as Footer } from "../components/layout/Footer.js";
function ArticleDetailPage() {
  const { id: e } = KM(), n = nb.find(s => s.id === e);
  if (!n)
    return b.jsxs("div", {
      className: "min-h-screen bg-[#F6F8FB]", children: [b.jsx(Navigation, {}), b.jsxs("main", {
        id: "main-content", tabIndex: -1, className: "pt-24 px-4 max-w-2xl mx-auto text-center", children: [b.jsx("h1", {
          className: "font-syne font-800 text-[#1A2F5E] text-3xl mb-4", children: "Article Not Found"
        }), b.jsxs("a", {
          href: pageHref("/articles"), className: "bg-[#F47920] text-[#1A2F5E] px-5 py-2.5 rounded-xl font-semibold text-sm inline-flex items-center gap-2",
          children: [b.jsx(lu, {
            className: "w-4 h-4"
          }), " Back to Articles"]
        })]
      })]
    });
  const r = eb[n.category] ?? {
    bg: "#EEF2F8", text: "#1A2F5E"
  }, o = s => s.split(/(\[[^\]]+\]\(https?:\/\/[^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g).map((f, d) => /^\[[^\]]+\]\(https?:\/\/[^)]+\)$/.test(f) ? b.jsx("a", { href: f.slice(f.indexOf("](") + 2, -1), target: "_blank", rel: "noopener noreferrer", className: "text-[#087F98] underline underline-offset-2 hover:text-[#1A2F5E] break-words", children: f.slice(1, f.indexOf("](")) }, d) : f.startsWith("**") && f.endsWith("**") ? b.jsx("strong", {
    className: "font-bold text-[#1A2F5E]", children: f.slice(2, -2)
  }, d) : f.startsWith("`") && f.endsWith("`") ? b.jsx("code", {
    className: "rounded-md bg-[#E9EEF7] px-1.5 py-0.5 font-mono text-[0.9em] text-[#1A2F5E]", children: f.slice(1, -1)
  }, d) : f), u = s => {
    const f = s.trim().split(/\n\s*\n|\n(?=- )/), d = [];
    let h = 0;
    for (let y = 0; y < f.length; y++) {
      const m = f[y];
      if (m.startsWith("## "))
        d.push(b.jsxs("div", {
          className: "relative mt-12 mb-6 overflow-hidden rounded-2xl border border-[#DCE5F2] bg-[#F4F7FB] px-5 py-5 sm:px-7",
          children: [b.jsx("span", {
            className: "absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-[#F47920] to-[#2BBCD4]"
          }), b.jsx("h2", {
            className: "font-syne font-800 text-[#1A2F5E] text-[1.55rem] sm:text-3xl leading-tight", children: m.slice(3)
          })]
        }, h++));
      else if (m.startsWith("### "))
        d.push(b.jsx("h3", {
          className: "font-syne font-700 text-[#1A2F5E] text-lg mt-6 mb-3", children: m.slice(4)
        }, h++));
      else if (m.startsWith("> "))
        d.push(b.jsx("blockquote", {
          className: "my-6 rounded-r-xl border-l-4 border-[#F47920] bg-[#FFF7F1] px-5 py-4 text-[#4A5B7A] italic text-[15px] sm:text-base leading-7",
          children: o(m.slice(2))
        }, h++));
      else if (/^\*\*.+?\.\*\*/.test(m)) {
        const g = m.match(/^\*\*(.+?)\.\*\*\s*(.*)$/);
        g && d.push(b.jsxs("div", {
          className: "mb-4 rounded-2xl border border-[#DCE5F2] bg-[#F8FAFD] px-5 py-5 sm:px-6", children: [b.jsxs("h3", {
            className: "mb-2 font-syne font-700 text-base text-[#1A2F5E]", children: [g[1], "."]
          }), b.jsx("p", {
            className: "text-[15px] sm:text-base leading-7 text-[#4A5B7A]", children: o(g[2])
          })]
        }, h++));
      }
      else if (m.startsWith("- "))
        d.push(b.jsxs("div", {
          className: "mb-3 flex gap-3 rounded-xl bg-[#F8FAFD] px-4 py-3 text-[15px] sm:text-base leading-7 text-[#4A5B7A]",
          children: [b.jsx("span", {
            className: "mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#2BBCD4]"
          }), b.jsx("span", {
            children: o(m.slice(2))
          })]
        }, h++));
      else if (/^\d+\.\s/.test(m)) {
        const g = m.match(/^(\d+)\.\s(.*)$/);
        g && d.push(b.jsxs("div", {
          className: "mb-3 flex gap-3 rounded-xl border border-[#E4EAF3] px-4 py-3 text-[15px] sm:text-base leading-7 text-[#4A5B7A]",
          children: [b.jsx("span", {
            className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1A2F5E] text-xs font-bold text-white",
            children: g[1]
          }), b.jsx("span", {
            children: o(g[2])
          })]
        }, h++));
      }
      else
        m.trim() === "" || d.push(b.jsx("p", {
          className: "text-[#46546B] text-[15px] sm:text-base leading-7 sm:leading-8 mb-5", children: o(m)
        }, h++));
    }
    return d;
  };
  return b.jsxs("div", {
    className: "min-h-screen bg-[#F6F8FB]", children: [b.jsx(Navigation, {}), b.jsxs("main", {
      id: "main-content", tabIndex: -1, className: "pt-16", children: [b.jsx("div", {
        className: "article-detail-hero relative overflow-hidden bg-[#1A2F5E] px-4 sm:px-6 py-16 sm:py-24",
        children: b.jsxs("div", {
          className: "relative max-w-4xl mx-auto", children: [b.jsxs("a", {
            href: pageHref("/articles"), className: "flex items-center gap-2 text-[#8BA4C4] hover:text-white text-sm mb-6 transition-colors",
            children: [b.jsx(lu, {
              className: "w-4 h-4"
            }), " Back to Articles"]
          }), b.jsxs("div", {
            className: "flex flex-wrap items-center gap-3 mb-5", children: [b.jsx("span", {
              className: "text-xs font-semibold px-3 py-1 rounded-full", style: {
                backgroundColor: r.bg, color: r.text
              }, children: n.category
            }), b.jsxs("div", {
              className: "flex items-center gap-1.5 text-[#8BA4C4] text-xs", children: [b.jsx(M0, {
                className: "w-3.5 h-3.5"
              }), n.readTime]
            }), b.jsxs("div", {
              className: "flex items-center gap-1.5 text-[#8BA4C4] text-xs", children: [b.jsx(M0, {
                className: "w-3.5 h-3.5"
              }), n.date]
            })]
          }), b.jsx("h1", {
            className: "font-syne font-800 text-white text-4xl sm:text-5xl leading-[1.08] mb-5 max-w-3xl",
            children: n.title
          }), b.jsx("p", {
            className: "max-w-2xl border-l-4 border-[#F47920] pl-4 text-[#C7D5E8] text-lg italic leading-relaxed",
            children: n.subtitle
          })]
        })
      }), b.jsxs("div", {
        className: "max-w-4xl mx-auto px-3 sm:px-6 py-8 sm:py-12", children: [b.jsxs("div", {
          className: "article-reading-surface bg-white rounded-[1.6rem] shadow-[0_24px_70px_#1A2F5E1F] border border-[#D8E0EE] px-5 py-7 sm:p-12",
          children: [b.jsx("p", {
            className: "rounded-2xl bg-[#EAF7FA] p-5 sm:p-6 text-[#1A2F5E] text-base sm:text-lg leading-7 sm:leading-8 font-medium mb-8",
            children: n.excerpt
          }), b.jsx("div", {
            children: u(n.content)
          }), b.jsxs("div", {
            className: "mt-10 pt-6 border-t border-[#EEF2F8]", children: [b.jsx("div", {
              className: "flex flex-wrap gap-2", children: n.tags.map(s => b.jsxs("span", {
                className: "flex items-center gap-1 text-xs text-[#7A8FA8] bg-[#F6F8FB] px-3 py-1.5 rounded-full border border-[#D8E0EE]",
                children: [b.jsx(lN, {
                  className: "w-3 h-3"
                }), " ", s]
              }, s))
            })]
          })]
        }), b.jsxs("div", {
          className: "mt-8", children: [b.jsx("h3", {
            className: "font-syne font-700 text-[#1A2F5E] text-lg mb-4", children: "More Articles"
          }), b.jsx("div", {
            className: "grid sm:grid-cols-2 gap-4", children: nb.filter(s => s.id !== n.id).slice(0, 2).map(s => b.jsxs("a", {
              href: articleHref(s.id), className: "group bg-white rounded-2xl p-5 border border-[#D8E0EE] shadow-sm hover:border-[#F47920] transition-all duration-200 card-hover",
              children: [b.jsx("span", {
                className: "text-xs font-semibold px-2 py-0.5 rounded-full mb-3 inline-block", style: {
                  backgroundColor: (eb[s.category] ?? {
                    bg: "#EEF2F8"
                  }).bg, color: (eb[s.category] ?? {
                    text: "#1A2F5E"
                  }).text
                }, children: s.category
              }), b.jsx("h4", {
                className: "font-syne font-700 text-[#1A2F5E] text-sm leading-snug group-hover:text-[#F47920] transition-colors",
                children: s.title
              })]
            }, s.id))
          })]
        })]
      })]
    }), b.jsx(Footer, {})]
  });
}
export default ArticleDetailPage;
