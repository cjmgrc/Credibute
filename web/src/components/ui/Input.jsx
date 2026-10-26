import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
export const inputClass = "style-22189506c2 style-58d0413dd9 style-a7ab7bd722 style-4f1a55de40 style-4769f958af style-ad04ce25f0 style-cf20b3b1c2 style-3c70d0a0c9 style-301f460e2d " +
    "style-ce20f1583b style-3d53df2cf7 style-501b3e6c9f " +
    "style-db79a5773c style-2e357972fc style-888dcfc8cd style-ade7100c28 " +
    "style-18a2f55c80 style-fbadd0baa4 style-29b5e3ee0b style-c8b88ad645";
export const TextField = ({ label, hint, error, action, className, icon, trailing, ...rest }) => {
    const id = useId();
    return (_jsxs("div", { className: className, children: [_jsxs("div", { className: "style-a7b3741ba7 style-222f930b87 style-71556df3b4 style-32c92bb1fd style-d7db3451d1", children: [_jsx("label", { htmlFor: id, className: "style-294e640e9b style-87e86ce38e style-3c70d0a0c9", children: label }), action] }), _jsxs("div", { className: "style-d2d9e1f134", children: [icon && _jsx("span", { className: "style-33228ff7d5 style-747355bdc2 style-eb9e48c5dd style-fd24211bbd style-0f2a693e93 style-4446c26b62 style-682659f553", children: icon }), _jsx("input", { id: id, "aria-invalid": !!error, "aria-describedby": error || hint ? `${id}-d` : undefined, className: cn(inputClass, icon && "style-c40cf1ae3a", trailing && "style-527250d582"), ...rest }), trailing && _jsx("span", { className: "style-747355bdc2 style-eb9e48c5dd style-3937181a27 style-0f2a693e93 style-4446c26b62", children: trailing })] }), (error || hint) && (_jsx("p", { id: `${id}-d`, className: cn("style-5a06344d31 style-4010c02329", error ? "style-5640c57ccb" : "style-682659f553"), children: error ?? hint }))] }));
};
export const SelectField = ({ label, hint, error, action, className, icon, children, ...rest }) => {
    const id = useId();
    return (_jsxs("div", { className: className, children: [_jsxs("div", { className: "style-a7b3741ba7 style-222f930b87 style-71556df3b4 style-32c92bb1fd style-d7db3451d1", children: [_jsx("label", { htmlFor: id, className: "style-294e640e9b style-87e86ce38e style-3c70d0a0c9", children: label }), action] }), _jsxs("div", { className: "style-d2d9e1f134", children: [icon && _jsx("span", { className: "style-33228ff7d5 style-747355bdc2 style-eb9e48c5dd style-fd24211bbd style-0f2a693e93 style-4446c26b62 style-682659f553", children: icon }), _jsx("select", { id: id, "aria-invalid": !!error, className: cn(inputClass, "style-395428ec59 style-527250d582", icon && "style-c40cf1ae3a"), ...rest, children: children }), _jsx(ChevronDown, { size: 16, "aria-hidden": true, className: "style-33228ff7d5 style-747355bdc2 style-3937181a27 style-4e45f4841a style-5dde0fd996 style-682659f553" })] }), (error || hint) && _jsx("p", { className: cn("style-5a06344d31 style-4010c02329", error ? "style-5640c57ccb" : "style-682659f553"), children: error ?? hint })] }));
};
