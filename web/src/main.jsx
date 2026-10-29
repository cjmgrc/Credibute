import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource-variable/manrope";
import "../assets/styles/variables.css";
import "../assets/styles/main.css";
import "../assets/styles/responsive.css";
import "../assets/styles/dialog.css";
import "../assets/styles/components.css";
import App from "./App";
createRoot(document.getElementById("root")).render(
  _jsx(StrictMode, {
    children: _jsx(BrowserRouter, { children: _jsx(App, {}) }),
  }),
);
