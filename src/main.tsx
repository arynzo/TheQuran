import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ContextWrapper from "./context/AppContext";
import App from "./App";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextWrapper>
      <App />
    </ContextWrapper>
  </StrictMode>,
);
