import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PaginationProvider } from "./context/PaginationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PaginationProvider>
      <App />
    </PaginationProvider>
  </StrictMode>
);
