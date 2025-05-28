import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ThemeProvider } from "./theme";

export default function hydratePage(Component: any, mountSelector: string) {
    const elem = document.querySelector(mountSelector)!;
    const app = (
        <StrictMode>
            <ThemeProvider>
                <Component />
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
}