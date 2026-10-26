import {
  Fragment as _Fragment,
  jsxs as _jsxs,
  jsx as _jsx,
} from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";
const sizes = {
  sm: "style-1fb07b38c6 style-0f9e667291 style-41d447f47e",
  md: "style-fdd2f85cad style-9513b39680 style-e5aa42d83f",
  lg: "style-2bf5d58a82 style-25e1240045 style-1f467b1929",
};
const variants = {
  primary:
    "style-292affc1f7 style-5e9a40ae2b style-fefcfaed8f style-66b0a3ab8c",
  secondary:
    "style-4f1a55de40 style-4769f958af style-ad04ce25f0 style-3c70d0a0c9 style-a9765437e6 style-b6d1913570",
  ghost: "style-9e676c7431 style-0637e93d27 style-d82b3e060a",
  danger: "style-fba8a08a00 style-5e9a40ae2b style-2c2c63d813",
};
export const buttonClass = (variant = "primary", size = "md", extra) =>
  cn(
    "style-123306850f style-27ead27a81 style-78905c9e86 style-71556df3b4 style-a503dd374c style-074569488c style-963f6168b7 style-a7ab7bd722 style-87e86ce38e style-f66698ebd0",
    "style-d3d381877a style-3d53df2cf7 style-501b3e6c9f",
    "style-03cc0a209d style-4a563e1d99 style-8d3c1014b9 style-3027c7bda4",
    sizes[size],
    variants[variant],
    extra,
  );
const Button = (props) => {
  const {
    variant = "primary",
    size = "md",
    icon,
    trailing,
    className,
    children,
  } = props;
  const cls = buttonClass(variant, size, className);
  const inner = _jsxs(_Fragment, { children: [icon, children, trailing] });
  if ("to" in props && props.to !== undefined) {
    const p = props;
    return _jsx(Link, {
      to: p.to,
      className: cls,
      onClick: p.onClick,
      children: inner,
    });
  }
  if ("href" in props && props.href !== undefined) {
    const p = props;
    return _jsx("a", {
      href: p.href,
      target: p.target,
      rel: p.rel ?? (p.target === "_blank" ? "noreferrer noopener" : undefined),
      className: cls,
      children: inner,
    });
  }
  const {
    variant: _v,
    size: _s,
    icon: _i,
    trailing: _t,
    className: _c,
    children: _ch,
    type = "button",
    ...rest
  } = props;
  return _jsx("button", {
    type: type,
    className: cls,
    ...rest,
    children: inner,
  });
};
export default Button;
