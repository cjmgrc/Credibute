import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Check } from "lucide-react";
const ToastContext = createContext(null);
/** Completion feedback: short, bottom-centre, never blocks input. Enters and exits along the same vertical path. */
const ToastProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const next = useRef(0);
  const toast = useCallback((message) => {
    const id = next.current++;
    setItems((s) => [...s.slice(-2), { id, message, leaving: false }]);
    window.setTimeout(
      () =>
        setItems((s) =>
          s.map((t) => (t.id === id ? { ...t, leaving: true } : t)),
        ),
      2800,
    );
    window.setTimeout(
      () => setItems((s) => s.filter((t) => t.id !== id)),
      3040,
    );
  }, []);
  const value = useMemo(() => toast, [toast]);
  return _jsxs(ToastContext.Provider, {
    value: value,
    children: [
      children,
      _jsx("div", {
        "aria-live": "polite",
        role: "status",
        className:
          "style-33228ff7d5 style-992a93455c style-3ba24c062d style-f29b421329 style-01361395d0 style-222f930b87 style-302c0d124a style-71556df3b4 style-074569488c style-9513b39680 style-97e9901753",
        children: items.map((t) =>
          _jsxs(
            "div",
            {
              className: `style-95d8467434 style-cb20bd5193 style-222f930b87 style-71556df3b4 style-074569488c style-b005d61d09 style-4f1a55de40 style-4769f958af style-9513b39680 style-ee09e8f0b7 style-294e640e9b style-daaac3fbf5 style-3c70d0a0c9 style-b743453ee3 style-76585be20a style-501b3e6c9f style-39266294a5 style-2c710eb96a style-d1181a2b59 ${t.leaving ? "style-6731403ac5 style-94f91922a1 style-10e9f177b8" : "style-f07df86364"}`,
              children: [
                _jsx(Check, {
                  size: 15,
                  className: "style-0e23fa0f9b",
                  strokeWidth: 2.5,
                  "aria-hidden": true,
                }),
                t.message,
              ],
            },
            t.id,
          ),
        ),
      }),
    ],
  });
};
export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
};
export default ToastProvider;
