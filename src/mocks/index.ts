import { todos } from "./data";

export async function initMocks() {
  if (typeof window !== "undefined") {
    const { worker } = await import("./browser");
    localStorage.setItem("todos", JSON.stringify(todos));
    worker.start({
      onUnhandledRequest(req, print) {
        // specify routes to exclude
        const excludedRoutes = [
          "/_next",
          "/favicon.ico",
          "/mockServiceWorker",
          "/__nextjs",
        ];

        // check if the req.url.pathname contains excludedRoutes
        const isExcluded = excludedRoutes.some((route) =>
          req.url.includes(route)
        );

        if (isExcluded) {
          return;
        }

        print.warning();
      },
    });
  }
}
