import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/cn';
/** Popover menu. Scales in from its trigger corner (not from centre). */
const Menu = ({ items, label = 'More options' }) => {
    const [open, setOpen] = useState(false);
    const root = useRef(null);
    useEffect(() => {
        if (!open)
            return;
        const down = (e) => { if (!root.current?.contains(e.target))
            setOpen(false); };
        const key = (e) => { if (e.key === 'Escape')
            setOpen(false); };
        document.addEventListener('pointerdown', down);
        document.addEventListener('keydown', key);
        return () => { document.removeEventListener('pointerdown', down); document.removeEventListener('keydown', key); };
    }, [open]);
    return (_jsxs("div", { ref: root, className: "relative", children: [_jsx("button", { type: "button", "aria-label": label, "aria-haspopup": "menu", "aria-expanded": open, onClick: () => setOpen((o) => !o), className: "grid size-8 place-items-center rounded-lg text-ink-3 transition-[transform,background-color,color] duration-150 active:scale-90 hover:bg-sunken hover:text-ink", children: _jsx(MoreHorizontal, { size: 18 }) }), open && (_jsx("div", { role: "menu", className: "material-thick absolute right-0 z-30 mt-1.5 min-w-48 origin-top-right rounded-xl border border-line p-1 shadow-float transition-[opacity,transform] duration-150 ease-out-strong starting:scale-95 starting:opacity-0 motion-reduce:transition-opacity", children: items.map((it) => (_jsxs("button", { role: "menuitem", type: "button", onClick: () => { setOpen(false); it.onSelect(); }, className: cn('flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left t-small font-medium transition-colors duration-100 hover:bg-sunken', it.tone === 'danger' ? 'text-bad' : 'text-ink'), children: [it.icon, it.label] }, it.label))) }))] }));
};
export default Menu;
