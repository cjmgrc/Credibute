import { jsx as _jsx } from "react/jsx-runtime";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
const ThemeContext = createContext(null);
const KEY = "credibute.theme";
const readPref = () => {
  try {
    return localStorage.getItem(KEY) || "system";
  } catch {
    return "system";
  }
};
const systemDark = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;
const ThemeProvider = ({ children }) => {
  const [pref, setPrefState] = useState(readPref);
  const [prefersDark, setPrefersDark] = useState(systemDark);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const on = () => setPrefersDark(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const resolved = pref === "system" ? (prefersDark ? "dark" : "light") : pref;
  useEffect(() => {
    document.documentElement.dataset.theme = resolved;
  }, [resolved]);
  const setPref = useCallback((p) => {
    // Brief colour cross-fade so dark↔light isn't a hard brightness jump.
    const root = document.documentElement;
    root.dataset.themeFade = "";
    window.setTimeout(() => delete root.dataset.themeFade, 260);
    setPrefState(p);
    try {
      localStorage.setItem(KEY, p);
    } catch {
      /* storage unavailable */
    }
  }, []);
  const toggle = useCallback(
    () => setPref(resolved === "dark" ? "light" : "dark"),
    [resolved, setPref],
  );
  const value = useMemo(
    () => ({ pref, resolved, setPref, toggle }),
    [pref, resolved, setPref, toggle],
  );
  return _jsx(ThemeContext.Provider, { value: value, children: children });
};
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};
export default ThemeProvider;
