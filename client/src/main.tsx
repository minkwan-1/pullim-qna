import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./reset.css";
import App from "./App.tsx";
import { RouterProvider, ThemeProviderWrapper } from "./provider/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider>
      <ThemeProviderWrapper>
        <App />
      </ThemeProviderWrapper>
    </RouterProvider>
  </StrictMode>
);
