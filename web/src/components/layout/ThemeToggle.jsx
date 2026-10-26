import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/cn';
const ThemeToggle = ({ className }) => {
    const { resolved, toggle } = useTheme();
    const dark = resolved === 'dark';
    const icon = "style-747355bdc2 style-76585be20a style-10e9f177b8 style-501b3e6c9f style-d1181a2b59";
    return (_jsxs("button", { type: "button", onClick: toggle, "aria-label": dark ? "Switch to light mode" : "Switch to dark mode", className: cn("style-d2d9e1f134 style-0f2a693e93 style-d0a383a9c2 style-4446c26b62 style-a7ab7bd722 style-4f1a55de40 style-4769f958af style-ad04ce25f0 style-9e676c7431 style-a9765437e6 style-41e07b9d1a style-3d53df2cf7 style-22220f24b7 style-d82b3e060a", className), children: [_jsx(Sun, { size: 17, className: cn(icon, dark ? "style-41a0b0dfde style-65694092f0" : "style-c7e4112ba1 style-4e3f085883 style-94f91922a1") }), _jsx(Moon, { size: 17, className: cn(icon, dark ? "style-c7e4112ba1 style-c80411b759 style-94f91922a1" : "style-41a0b0dfde style-65694092f0") })] }));
};
export default ThemeToggle;
