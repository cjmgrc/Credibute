import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { BRAND } from '@/domain/rubric';
import { cn } from '@/lib/cn';
export const LogoMark = ({ size = 24, className }) => (_jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true, className: cn("style-7cc50dcb0f", className), children: [_jsx("rect", { x: "2", y: "12", width: "5", height: "10", rx: "2.5", fill: "currentColor", opacity: ".55" }), _jsx("rect", { x: "9.5", y: "3", width: "5", height: "19", rx: "2.5", fill: "currentColor" }), _jsx("rect", { x: "17", y: "8", width: "5", height: "14", rx: "2.5", fill: "currentColor", opacity: ".8" })] }));
const Logo = ({ to = '/', light, className }) => (_jsxs(Link, { to: to, "aria-label": `${BRAND} home`, className: cn("style-123306850f style-71556df3b4 style-074569488c style-49abc543ea style-48a1d34f1a style-3d53df2cf7 style-501b3e6c9f style-03cc0a209d", light ? "style-5e9a40ae2b" : "style-3c70d0a0c9", className), children: [_jsx(LogoMark, {}), _jsx("span", { className: "style-0c6a41fdd5 style-0670710393 style-f57f7ce15c", children: BRAND })] }));
export default Logo;
