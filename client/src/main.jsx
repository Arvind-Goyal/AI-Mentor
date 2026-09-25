import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

import { AnalysisProvider } from "./context/AnalysisContext";
import { AuthProvider } from "./context/AuthContext";
import { EditorProvider } from "./context/EditorContext.jsx";

// Clean up any legacy dark mode classes and persisted preference
try {
  document.documentElement.classList.remove("dark");
  document.documentElement.setAttribute("data-theme", "light");
  localStorage.removeItem("dsa_theme");
} catch {
  // Ignore in environments where localStorage or document is unavailable
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AnalysisProvider>
          <EditorProvider>
            <App />
          </EditorProvider>
        </AnalysisProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);