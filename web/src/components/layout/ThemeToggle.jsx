import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/cn';
const ThemeToggle = ({ className }) => {
    const { resolved, toggle } = useTheme();
    const dark = resolved === 'dark';
    const icon = 'absolute transition-[opacity,transform] duration-200 ease-out-strong motion-reduce:transition-opacity';
    return (_jsxs("button", { type: "button", onClick: toggle, "aria-label": dark ? 'Switch to light mode' : 'Switch to dark mode', className: cn('relative grid size-10 place-items-center rounded-control border border-line bg-surface text-ink-2 shadow-lift transition-[transform,color] duration-150 active:scale-95 hover:text-ink', className), children: [_jsx(Sun, { size: 17, className: cn(icon, dark ? 'scale-100 opacity-100' : 'scale-50 -rotate-45 opacity-0') }), _jsx(Moon, { size: 17, className: cn(icon, dark ? 'scale-50 rotate-45 opacity-0' : 'scale-100 opacity-100') })] }));
};
export default ThemeToggle;
