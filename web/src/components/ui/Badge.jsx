import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '@/lib/cn';
const tones = {
    neutral: "style-2de8262ccb style-9e676c7431",
    accent: "style-95debef1e0 style-242347c218",
    ok: "style-c0af61bc47 style-0e23fa0f9b",
    warn: "style-8a7ae3341a style-7294770c9c",
    bad: "style-91f2585319 style-5640c57ccb",
};
const Badge = ({ tone = 'neutral', dot, children, className }) => (_jsxs("span", { className: cn("style-123306850f style-71556df3b4 style-70007b8768 style-b005d61d09 style-588daa1a98 style-1fcf28756b style-4010c02329 style-87e86ce38e", tones[tone], className), children: [dot && _jsx("span", { "aria-hidden": true, className: "style-dc797fcc71 style-b005d61d09 style-0cf6c2e8fe" }), children] }));
export default Badge;
