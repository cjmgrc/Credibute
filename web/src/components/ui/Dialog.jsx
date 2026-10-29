import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useDragDismiss } from "@/hooks/useDragDismiss";
const DragCtx = createContext(null);
/**
 * Native <dialog> (focus trap, Esc, top layer, inert background for free).
 * `open` drives mounting; `data-visible` drives the transition, so closing mid-open just retargets it.
 * Center = modal, scales from the middle. Side = translucent sheet, leaves the way it came and can be dragged away.
 */
const Dialog = ({ open, onClose, label, variant = "center", children }) => {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);
  const drag = useDragDismiss(ref, onClose);
  useEffect(() => {
    if (open) {
      setMounted(true);
      return;
    }
    setVisible(false);
    const t = window.setTimeout(() => {
      if (ref.current?.open) ref.current.close();
      setMounted(false);
    }, 250);
    return () => window.clearTimeout(t);
  }, [open]);
  useEffect(() => {
    const d = ref.current;
    if (!d || !mounted || !open) return;
    if (!d.open) d.showModal();
    let r2 = 0;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setVisible(true));
    });
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, [mounted, open]);
  return _jsx("dialog", {
    ref: ref,
    "aria-label": label,
    "data-visible": visible,
    className: cn(
      "u-color-inherit-background-0-0",
      variant === "center"
        ? "u-transform-scale-0-96 centered-dialog"
        : "u-border-left-1px-solid-var-line-background-var-surface",
    ),
    onCancel: (e) => {
      e.preventDefault();
      onClose();
    },
    onClick: (e) => {
      if (e.target === e.currentTarget) onClose();
    },
    children: _jsx(DragCtx.Provider, {
      value: drag,
      children: mounted && children,
    }),
  });
};
export default Dialog;
/** Header for the side sheet. Doubles as the drag handle. */
export const SheetHeader = ({ onClose, children }) => {
  const drag = useContext(DragCtx);
  return _jsxs("header", {
    ...drag,
    className:
      "drag-dismiss-surface u-position-relative u-cursor-grab u-ui-pan-y-pan-y-touch-action-var-ui-pan-x-var-ui-pan-y-var-ui-pinch-zoom u-webkit-user-select-none-user-select-none u-border-bottom-style-var-ui-border-style-border-bottom-width-1px-2 u-border-color-var-line u-padding-inline-space-6-2 u-padding-bottom-space-4 u-padding-top-space-3 u-cursor-grabbing",
    children: [
      _jsx("span", {
        "aria-hidden": true,
        className:
          "u-margin-inline-auto u-margin-bottom-space-3 u-display-block u-height-space u-width-space-9 u-border-radius-3-40282e38px u-bg-var-line-strong u-display-none-4",
      }),
      _jsx("button", {
        type: "button",
        onClick: onClose,
        "aria-label": "Close",
        className:
          "u-position-absolute u-right-space-4 u-top-space-4 u-display-grid u-width-space-8-height-space-8 u-place-items-center u-border-radius-3-40282e38px u-bg-var-sunken-3 u-color-var-ink-2 u-transition-property-transform-color-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-ui-scale-x-90pct-ui-scale-y-90pct u-color-var-ink-2",
        children: _jsx(X, { size: 16 }),
      }),
      children,
    ],
  });
};
/** Standard centered modal chrome. */
export const ModalBody = ({ title, description, children, footer }) =>
  _jsxs("div", {
    className: "u-padding-space-6",
    children: [
      _jsx("h2", { className: "u-letter-spacing-0-022em-text-1-375rem", children: title }),
      description &&
        _jsx("p", {
          className: "u-margin-top-space u-letter-spacing-0-text-0-8125rem u-color-var-ink-3-2",
          children: description,
        }),
      children &&
        _jsx("div", { className: "u-margin-top-space-5", children: children }),
      footer &&
        _jsx("div", {
          className:
            "u-margin-top-space-6 u-display-flex-3 u-align-items-center-2 u-justify-content-flex-end u-gap-space-2",
          children: footer,
        }),
    ],
  });
