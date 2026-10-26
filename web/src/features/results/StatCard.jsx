import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from '@/components/ui/Feedback';
const StatCard = ({ label, value, hint, icon }) => (_jsxs(Card, { className: "style-014b941a77", children: [_jsxs("div", { className: "style-222f930b87 style-b9677bd1cb style-32c92bb1fd style-d7db3451d1", children: [_jsx("p", { className: "style-294e640e9b style-682659f553", children: label }), icon && _jsx("span", { "aria-hidden": true, className: "style-242347c218", children: icon })] }), _jsx("p", { className: "style-d21b86ea41 style-48310d5fb1 style-87e86ce38e style-761cdb81bd style-23857f4aef style-60182fbf94", children: value }), hint && _jsx("p", { className: "style-f28fea81a5 style-4010c02329 style-682659f553", children: hint })] }));
export default StatCard;
