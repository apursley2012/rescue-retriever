/**
 * +----------------------------------------------------------------------------+
 * | Rescue Retriever                                                           |
 * | Purpose: Mounts each direct HTML entry into the matching interactive       |
 * | application view.                                                          |
 * | Author: Alysha Pursley                                                     |
 * | Copyright (c) 2026 Alysha Pursley.                                         |
 * | Rights: Proprietary original contributions; see repository LICENSE.         |
 * +----------------------------------------------------------------------------+
 */
import { normalizeProgramFilter } from "../lib/filterUtils.js";
const routeMeta = document.querySelector('meta[name="rr-route"]');
const requestedRoute = routeMeta?.getAttribute("content") || "/";
const params = new URLSearchParams(window.location.search);
function resolveRoute(route) {
  if (route === "/candidates/:id") {
    const id = params.get("id");
    return id ? `/candidates/${encodeURIComponent(id)}` : "/dashboard";
  }
  if (route === "/articles/:id") {
    const id = params.get("id");
    return id ? `/articles/${encodeURIComponent(id)}` : "/articles";
  }
  if (route === "/dashboard" && params.has("filter")) {
    const filter = normalizeProgramFilter(params.get("filter"));
    return filter === "all" ? "/dashboard" : `/dashboard?filter=${encodeURIComponent(filter)}`;
  }
  return route;
}
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}
const route = resolveRoute(requestedRoute);
const targetHash = `#${route}`;
if (window.location.hash !== targetHash) {
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${targetHash}`);
}
window.scrollTo(0, 0);
await import("./router.js");
requestAnimationFrame(() => window.scrollTo(0, 0));
