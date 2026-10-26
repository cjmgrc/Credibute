import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
/**
 * Horizontal bar. The fill is full-width and slid with translateX inside an overflow-hidden track,
 * so it animates on the compositor and keeps a clean rounded end.
 */
const ShareBar = ({ value, active = true, animate = true, delay = 0, opacity = 1, height = "style-f5728694f6", className }) => {
    const [on, setOn] = useState(!animate);
    useEffect(() => {
        if (!animate || !active)
            return;
        const id = requestAnimationFrame(() => setOn(true));
        return () => cancelAnimationFrame(id);
    }, [animate, active]);
    const shown = animate && !(on && active) ? 0 : value;
    return (_jsx("div", { role: "presentation", className: cn("style-58d0413dd9 style-d5111d0e9f style-b005d61d09 style-2de8262ccb", height, className), children: _jsx("div", { className: cn("style-57c930dc1c style-58d0413dd9 style-b005d61d09 style-292affc1f7", animate && "style-48a1d34f1a style-5b659951d8 style-501b3e6c9f style-b2ed949e45"), style: { transform: `translateX(${Math.min(100, Math.max(0, shown)) - 100}%)`, opacity, transitionDelay: animate ? `${delay}ms` : undefined } }) }));
};
export default ShareBar;
