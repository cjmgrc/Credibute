import {
  Fragment as _Fragment,
  jsxs as _jsxs,
  jsx as _jsx,
} from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";
const sizes = {
  sm: "u-height-space-8 u-padding-inline-space-3 u-text-0-8125rem",
  md: "u-height-space-10 u-padding-inline-space-4 u-text-0-875rem",
  lg: "u-height-space-12 u-padding-inline-space-6-2 u-text-0-9375rem",
};
const variants = {
  primary:
    "u-bg-var-accent u-color-var-color-white u-ui-shadow-inset-0-1px-0-var-ui-shadow-color-ffffff2e-0-1px-2px-var-ui-shadow-color-14143c33-box-shadow-var-ui-inset-shadow-var-ui-inset-ring-shadow-var-ui-ring-offset-shadow-var-ui-ring-shadow-var-ui-shadow u-bg-var-accent-hover",
  secondary:
    "u-border-style-var-ui-border-style-border-width-1px u-border-color-var-line u-bg-var-surface-2 u-color-var-ink u-ui-shadow-var-sh-lift-box-shadow-var-ui-inset-shadow-var-ui-inset-ring-shadow-var-ui-ring-offset-shadow-var-ui-ring-shadow-var-ui-shadow u-border-color-var-line-strong-2",
  ghost: "u-color-var-ink-2 u-bg-var-sunken u-color-var-ink-2",
  danger: "u-bg-var-bad u-color-var-color-white u-opacity-0-9",
};
export const buttonClass = (variant = "primary", size = "md", extra) =>
  cn(
    "u-display-inline-flex u-flex-shrink-0 u-webkit-user-select-none-user-select-none u-align-items-center-2 u-justify-content-center u-gap-space-2 u-white-space-nowrap u-border-radius-0-625rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-ui-tracking-0-005em-letter-spacing-0-005em",
    "u-transition-property-transform-background-color-border-color-box-shadow-color-opacity-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-ui-ease-cubic-bezier-0-23-1-0-32-1-transition-timing-function-cubic-bezier-0-23-1-0-32-1",
    "u-scale-0-97 u-pointer-events-none-2 u-pointer-events-none-3 u-opacity-0-45",
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
