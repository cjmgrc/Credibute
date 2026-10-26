import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
/**
 * Horizontal bar. The fill is full-width and slid with translateX inside an overflow-hidden track,
 * so it animates on the compositor and keeps a clean rounded end.
 */
const ShareBar = ({ value, active = true, animate = true, delay = 0, opacity = 1, height = 'h-2', className }) => {
    const [on, setOn] = useState(!animate);
    useEffect(() => {
        if (!animate || !active)
            return;
        const id = requestAnimationFrame(() => setOn(true));
        return () => cancelAnimationFrame(id);
    }, [animate, active]);
    const shown = animate && !(on && active) ? 0 : value;
    return (_jsx("div", { role: "presentation", className: cn('w-full overflow-hidden rounded-full bg-sunken', height, className), children: _jsx("div", { className: cn('h-full w-full rounded-full bg-accent', animate && 'transition-transform duration-[700ms] ease-out-strong motion-reduce:transition-none'), style: { transform: `translateX(${Math.min(100, Math.max(0, shown)) - 100}%)`, opacity, transitionDelay: animate ? `${delay}ms` : undefined } }) }));
};
export default ShareBar;
