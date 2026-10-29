import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
/**
 * Horizontal bar. The fill is full-width and slid with translateX inside an overflow-hidden track,
 * so it animates on the compositor and keeps a clean rounded end.
 */
const ShareBar = ({
  value,
  active = true,
  animate = true,
  delay = 0,
  opacity = 1,
  height = "u-height-space-2",
  className,
}) => {
  const [on, setOn] = useState(!animate);
  useEffect(() => {
    if (!animate || !active) return;
    const id = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(id);
  }, [animate, active]);
  const shown = animate && !(on && active) ? 0 : value;
  return _jsx("div", {
    role: "presentation",
    className: cn(
      "u-width-100pct u-overflow-hidden u-border-radius-3-40282e38px u-bg-var-sunken-3",
      height,
      className,
    ),
    children: _jsx("div", {
      "data-value": Math.min(100, Math.max(0, shown)),
      "data-delay": animate ? delay : 0,
      "data-opacity": opacity,
      className: cn(
        "share-bar-fill u-height-100pct u-width-100pct u-border-radius-3-40282e38px u-bg-var-accent",
        animate &&
          "u-transition-property-transform-translate-scale-rotate-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-7s-transition-duration-0-7s u-ease-out",
      ),
    }),
  });
};
export default ShareBar;
