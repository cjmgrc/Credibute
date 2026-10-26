import { useEffect, useRef, useState } from 'react';
/** Fires once when the element first scrolls into view. */
export function useInView(margin = '-80px') {
    const ref = useRef(null);
    const [seen, setSeen] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el || seen)
            return;
        if (!('IntersectionObserver' in window)) {
            setSeen(true);
            return;
        }
        const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) {
            setSeen(true);
            io.disconnect();
        } }, { rootMargin: margin });
        io.observe(el);
        return () => io.disconnect();
    }, [seen, margin]);
    return [ref, seen];
}
