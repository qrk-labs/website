/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ThemeProvider } from "./lib/theme";

(async function () {
  const page = (window as any).qrkrouter ? await import((window as any).$$ROOT) : {Root: (window as any).$$page};

  console.log(page)

  const App = page.Root;
  const elem = document.querySelector("#root")!;
  const app = (
    <StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StrictMode>
  );

  if (import.meta.hot) {
    // With hot module reloading, `import.meta.hot.data` is persisted.
    const root = (import.meta.hot.data.root ??= createRoot(elem));
    root.render(app);
  } else {
    // The hot module reloading API is not available in production.
    createRoot(elem).render(app);
  }
})()
