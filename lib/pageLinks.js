/**
 * +----------------------------------------------------------------------------+
 * | Rescue Retriever                                                           |
 * | Purpose: Builds static-host-safe document links so page navigation works   |
 * | under a nested deployment path.                                            |
 * | Author: Alysha Pursley                                                     |
 * | Copyright (c) 2026 Alysha Pursley.                                         |
 * | Rights: Proprietary original contributions; see repository LICENSE.         |
 * +----------------------------------------------------------------------------+
 */
const documentUrls = {
  "/": new URL("../pages/home.html", import.meta.url),
  "/dashboard": new URL("../pages/dashboard.html", import.meta.url),
  "/analytics": new URL("../pages/analytics.html", import.meta.url),
  "/profiles": new URL("../pages/rescue-profiles.html", import.meta.url),
  "/rescue-profiles": new URL("../pages/rescue-profiles.html", import.meta.url),
  "/reports": new URL("../pages/reports.html", import.meta.url),
  "/case-study": new URL("../pages/case-study.html", import.meta.url),
  "/articles": new URL("../pages/articles.html", import.meta.url),
  "/privacy": new URL("../pages/privacy.html", import.meta.url),
  "/terms": new URL("../pages/terms.html", import.meta.url),
  "/docs": new URL("../pages/documentation.html", import.meta.url),
};
function pageHref(route) {
  const [pathname, query = ""] = route.split("?", 2);
  const base = documentUrls[pathname] ?? documentUrls["/"];
  const url = new URL(base.href);
  if (query) {
    url.search = query;
  }
  return url.href;
}
function candidateHref(id) {
  const url = new URL("../pages/candidate-detail.html", import.meta.url);
  url.searchParams.set("id", id);
  return url.href;
}
function articleHref(id) {
  const articleIds = new Set([
    "shelter-to-service",
    "breed-data-limitations",
    "geographic-patterns",
    "development-process",
  ]);
  const filename = articleIds.has(id) ? `${id}.html` : "articles.html";
  return new URL(`../pages/${filename}`, import.meta.url).href;
}
export { articleHref, candidateHref, pageHref };
