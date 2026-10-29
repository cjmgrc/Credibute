import { useEffect, useRef, useState } from "react";
import { Ellipsis } from "lucide-react";
import { cn } from "@/lib/cn";

/** Popover menu. Scales in from its trigger corner (not from centre). */
const Menu = ({ items, label = "More options", placement = "bottom" }) => {
  const [open, setOpen] = useState(false);
  const root = useRef(null);

  useEffect(() => {
    if (!open) return;
    const down = (e) => {
      if (!root.current?.contains(e.target)) setOpen(false);
    };
    const key = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", down);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("keydown", key);
    };
  }, [open]);

  return (
    <div ref={root} className="u-position-relative">
      <button
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="u-display-grid u-width-space-8-height-space-8 u-place-items-center u-border-radius-var-radius-lg u-color-var-ink-3-2 u-transition-property-transform-background-color-color-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-ui-scale-x-90pct-ui-scale-y-90pct u-bg-var-sunken u-color-var-ink-2"
      >
        <Ellipsis size={18} />
      </button>
      {open && (
        <div
          role="menu"
          className={cn(
            "u-background-var-surface u-position-absolute u-right-0 u-z-index-30 u-min-width-space-48 u-border-radius-var-radius-xl u-border-style-var-ui-border-style-border-width-1px u-border-color-var-line u-padding-space u-ui-shadow-var-sh-float-box-shadow-var-ui-inset-shadow-var-ui-inset-ring-shadow-var-ui-ring-offset-shadow-var-ui-ring-shadow-var-ui-shadow u-transition-property-opacity-transform-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-ui-ease-cubic-bezier-0-23-1-0-32-1-transition-timing-function-cubic-bezier-0-23-1-0-32-1 u-ui-scale-x-95pct-ui-scale-y-95pct-2 u-opacity-0 u-transition-property-opacity-transition-timing-function-var-ui-ease-var-default-transition-timing-function-2",
            placement === "top"
              ? "u-bottom-100pct u-margin-bottom-space-1-5 u-transform-origin-100pct-100pct"
              : "u-top-100pct u-margin-top-space-1-5 u-transform-origin-100pct-0",
          )}
        >
          {items.map((item) => (
            <button
              key={item.label}
              role="menuitem"
              type="button"
              onClick={() => {
                setOpen(false);
                item.onSelect();
              }}
              className={cn(
                "u-display-flex-3 u-width-100pct u-align-items-center-2 u-gap-space-2-5 u-border-radius-var-radius-lg u-padding-inline-space-2-5 u-padding-block-space-2 u-text-align-left u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-medium-weight-var-font-weight-medium u-transition-property-color-background-color-border-color-outline-color-text-decoration-color-fill-stroke-ui-gradient-from-ui-gradient-via-ui-gradient-to-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-1s-transition-duration-0-1s u-bg-var-sunken",
                item.tone === "danger"
                  ? "u-color-var-bad-2"
                  : "u-color-var-ink",
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
