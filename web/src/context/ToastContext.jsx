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
          "u-pointer-events-none u-position-fixed-2 u-inset-inline-0 u-bottom-max-1-25rem-env-safe-area-inset-bottom u-z-index-100 u-display-flex-3 u-flex-direction-column u-align-items-center-2 u-gap-space-2 u-padding-inline-space-4 u-display-none-important",
        children: items.map((t) =>
          _jsxs(
            "div",
            {
              className: `u-background-var-surface u-pointer-events-auto u-display-flex-3 u-align-items-center-2 u-gap-space-2 u-border-radius-3-40282e38px u-border-style-var-ui-border-style-border-width-1px u-border-color-var-line u-padding-inline-space-4 u-padding-block-space-2-5 u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-medium-weight-var-font-weight-medium u-color-var-ink u-ui-shadow-var-sh-float-box-shadow-var-ui-inset-shadow-var-ui-inset-ring-shadow-var-ui-ring-offset-shadow-var-ui-ring-shadow-var-ui-shadow u-transition-property-opacity-transform-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-ease-cubic-bezier-0-23-1-0-32-1-transition-timing-function-cubic-bezier-0-23-1-0-32-1 u-ui-translate-y-space-3-translate-var-ui-translate-x-var-ui-translate-y u-opacity-0 u-transition-property-opacity-transition-timing-function-var-ui-ease-var-default-transition-timing-function-2 ${t.leaving ? "u-ui-translate-y-space-2-translate-var-ui-translate-x-var-ui-translate-y u-opacity-0-2 u-ui-duration-0-2s-transition-duration-0-2s" : "u-ui-duration-0-3s-transition-duration-0-3s"}`,
              children: [
                _jsx(Check, {
                  size: 15,
                  className: "u-color-var-ok",
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
