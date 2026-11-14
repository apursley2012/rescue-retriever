/**
 * +----------------------------------------------------------------------------+
 * | Rescue Retriever                                                           |
 * | Purpose: Defines routes and shared page-shell composition for the static   |
 * | browser demo.                                                              |
 * | Author: Alysha Pursley                                                     |
 * | Copyright (c) 2026 Alysha Pursley.                                         |
 * | Rights: Proprietary original contributions; see repository LICENSE.         |
 * +----------------------------------------------------------------------------+
 */
import { Nn, QR, VR, b, c3, ee, i3, iV, l3, o3, s3, x3 } from "../assets/runtime-core.js";
import HomePage from "../pages/home.js";
import DashboardPage from "../pages/dashboard.js";
import CandidateDetailPage from "../pages/candidate-detail.js";
import AnalyticsPage from "../pages/analytics.js";
import RescueProfilesPage from "../pages/rescue-profiles.js";
import ReportsPage from "../pages/reports.js";
import CaseStudyPage from "../pages/case-study.js";
import ArticlesPage from "../pages/articles.js";
import ArticleDetailPage from "../pages/article-detail.js";
import DocumentationPage from "../pages/documentation.js";
/*
 * Hash routing keeps direct navigation compatible with GitHub Pages without
 * requiring server-side rewrite rules.
 */
const routeMetadata = {
  "/": [
    "Rescue Retriever | Search & Rescue Dog Matching",
    "Explore Austin Animal Center shelter records and identify dogs whose breed, sex, and age align with defined search-and-rescue training profiles.",
  ],
  "/dashboard": [
    "Candidate Dashboard | Rescue Retriever",
    "Search and filter Austin Animal Center dog records, review rescue-training matches, and map one selected dog at a time.",
  ],
  "/analytics": [
    "Rescue Candidate Analytics | Rescue Retriever",
    "Explore dog-only breed, age, sex, and rescue-qualification comparisons calculated from the bundled Austin Animal Center dataset.",
  ],
  "/profiles": [
    "Rescue Training Profiles | Rescue Retriever",
    "Review the breed, sex, and age criteria used to identify potential candidates for water, mountain, wilderness, disaster, and tracking rescue programs.",
  ],
  "/rescue-profiles": [
    "Rescue Training Profiles | Rescue Retriever",
    "Review the breed, sex, and age criteria used to identify potential candidates for water, mountain, wilderness, disaster, and tracking rescue programs.",
  ],
  "/reports": [
    "Candidate Reports & Exports | Rescue Retriever",
    "Review rescue-program candidate summaries and export matching Austin Animal Center shelter records for offline evaluation and rescue-team coordination.",
  ],
  "/case-study": [
    "Rescue Retriever Case Study | Design & Data",
    "Read how Rescue Retriever organizes shelter data, applies rescue qualification rules, presents candidate results, and supports a static browser demonstration.",
  ],
  "/articles": [
    "Rescue Retriever Articles | Research & Development",
    "Read Rescue Retriever articles covering rescue-candidate matching, shelter-data analysis, interface decisions, and development choices behind the project.",
  ],
  "/docs": [
    "Rescue Retriever Documentation | Using the Demo",
    "Review Rescue Retriever usage guidance, rescue-profile criteria, dashboard behavior, report features, and details about the static browser demonstration.",
  ],
};
function setMetaContent(selector, content) {
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute("content", content);
  }
}
function updateDocumentMetadata() {
  const route = (window.location.hash.replace(/^#/, "") || "/").split("?")[0];
  const dynamicRoute = route.startsWith("/candidates/")
    ? [
      "Rescue Candidate Details | Rescue Retriever",
      "Review an individual Austin Animal Center shelter dog's profile, rescue-program qualification details, and matching information in Rescue Retriever.",
    ]
    : route.startsWith("/articles/")
      ? [
        "Rescue Retriever Article | Research & Development",
        "Read a Rescue Retriever research and development article about shelter-data analysis, rescue-candidate matching, design, or implementation decisions.",
      ]
      : null;
  const [title, description] = routeMetadata[route] ?? dynamicRoute ?? [
    "Page Not Found | Rescue Retriever",
    "The requested Rescue Retriever page could not be found. Return to the application to continue exploring shelter records and rescue candidates.",
  ];
  document.title = title;
  setMetaContent('meta[name="description"]', description);
  setMetaContent('meta[property="og:title"]', title);
  setMetaContent('meta[property="og:description"]', description);
  setMetaContent('meta[name="twitter:title"]', title);
  setMetaContent('meta[name="twitter:description"]', description);
}
if (!window.location.hash || window.location.hash === "#") {
  window.location.replace(`${window.location.pathname}${window.location.search}#/`);
}
function resetScrollPosition() {
  requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
}
updateDocumentMetadata();
resetScrollPosition();
window.addEventListener("hashchange", () => {
  updateDocumentMetadata();
  resetScrollPosition();
});
function AppRouter() {
  return b.jsx(VR, {
    client: iV, children: b.jsx(i3, {
      children: b.jsxs(s3, {
        children: [b.jsx(l3, {}), b.jsx(o3, {}), b.jsxs(c3, {
          children: [b.jsx(Nn, {
            path: "/", element: b.jsx(HomePage, {})
          }), b.jsx(Nn, {
            path: "/dashboard", element: b.jsx(DashboardPage, {})
          }), b.jsx(Nn, {
            path: "/candidates/:id", element: b.jsx(CandidateDetailPage, {})
          }), b.jsx(Nn, {
            path: "/analytics", element: b.jsx(AnalyticsPage, {})
          }), b.jsx(Nn, {
            path: "/profiles", element: b.jsx(RescueProfilesPage, {})
          }), b.jsx(Nn, {
            path: "/rescue-profiles", element: b.jsx(RescueProfilesPage, {})
          }), b.jsx(Nn, {
            path: "/reports", element: b.jsx(ReportsPage, {})
          }), b.jsx(Nn, {
            path: "/case-study", element: b.jsx(CaseStudyPage, {})
          }), b.jsx(Nn, {
            path: "/articles", element: b.jsx(ArticlesPage, {})
          }), b.jsx(Nn, {
            path: "/articles/:id", element: b.jsx(ArticleDetailPage, {})
          }), b.jsx(Nn, {
            path: "/docs", element: b.jsx(DocumentationPage, {})
          }), b.jsx(Nn, {
            path: "*", element: b.jsx(QR, {})
          })]
        })]
      })
    })
  });
}
x3.createRoot(document.getElementById("root")).render(b.jsx(ee.StrictMode, { children: b.jsx(AppRouter, {}) }));
