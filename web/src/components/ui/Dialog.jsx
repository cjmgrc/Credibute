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
      "style-b4b33d2441",
      variant === "center"
        ? "style-13ab9c2eb2 centered-dialog"
        : "style-2e4d601310",
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
      "style-d2d9e1f134 style-f2e47d9c52 style-93ee4331ef style-78905c9e86 style-bbe39cfb5c style-4769f958af style-25e1240045 style-b04e43b886 style-0a702d97ed style-71998ea7a2",
    children: [
      _jsx("span", {
        "aria-hidden": true,
        className:
          "style-1752f11474 style-7fc057c6b0 style-496aca80e4 style-54f50aff0c style-6bb768bd22 style-b005d61d09 style-06b422cf95 style-ee12d4f979",
      }),
      _jsx("button", {
        type: "button",
        onClick: onClose,
        "aria-label": "Close",
        className:
          "style-747355bdc2 style-830b1d2217 style-83ee6d9ede style-0f2a693e93 style-ebd37e04d4 style-4446c26b62 style-b005d61d09 style-2de8262ccb style-9e676c7431 style-41e07b9d1a style-3d53df2cf7 style-d64255261e style-d82b3e060a",
        children: _jsx(X, { size: 16 }),
      }),
      children,
    ],
  });
};
/** Standard centered modal chrome. */
export const ModalBody = ({ title, description, children, footer }) =>
  _jsxs("div", {
    className: "style-c432836760",
    children: [
      _jsx("h2", { className: "style-d138f623f0", children: title }),
      description &&
        _jsx("p", {
          className: "style-ff6e57b41c style-294e640e9b style-682659f553",
          children: description,
        }),
      children &&
        _jsx("div", { className: "style-a752cdc80a", children: children }),
      footer &&
        _jsx("div", {
          className:
            "style-356df20822 style-222f930b87 style-71556df3b4 style-307644c34d style-074569488c",
          children: footer,
        }),
    ],
  });
