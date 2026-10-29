import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
export const inputClass =
  "u-height-space-11 u-width-100pct u-border-radius-0-625rem u-border-style-var-ui-border-style-border-width-1px u-border-color-var-line u-bg-var-surface-2 u-padding-inline-space-3-5 u-color-var-ink u-color-var-ink-3 " +
  "u-transition-property-border-color-box-shadow-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-ui-ease-cubic-bezier-0-23-1-0-32-1-transition-timing-function-cubic-bezier-0-23-1-0-32-1 " +
  "u-border-color-var-accent-3 u-ui-outline-style-none-outline-style-none u-ui-ring-shadow-var-ui-ring-inset-0-0-0-4px-var-ui-ring-offset-width-var-ui-ring-color-currentcolor-box-shadow-var-ui-inset-shadow-var-ui-inset-ring-shadow-var-ui-ring-offset-shadow-var-ui-ring-shadow-var-ui-shadow u-ui-ring-color-var-accent " +
  "u-bg-var-sunken-2 u-color-var-ink-3-3 u-border-color-var-bad u-ui-ring-color-var-bad";
export const TextField = ({
  label,
  hint,
  error,
  action,
  className,
  icon,
  trailing,
  ...rest
}) => {
  const id = useId();
  return _jsxs("div", {
    className: className,
    children: [
      _jsxs("div", {
        className:
          "u-margin-bottom-space-1-5 u-display-flex-3 u-align-items-center-2 u-justify-content-space-between u-gap-space-3",
        children: [
          _jsx("label", {
            htmlFor: id,
            className: "u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-color-var-ink",
            children: label,
          }),
          action,
        ],
      }),
      _jsxs("div", {
        className: "u-position-relative",
        children: [
          icon &&
            _jsx("span", {
              className:
                "u-pointer-events-none u-position-absolute u-inset-block-0 u-left-space-3-5 u-display-grid u-place-items-center u-color-var-ink-3-2",
              children: icon,
            }),
          _jsx("input", {
            id: id,
            "aria-invalid": !!error,
            "aria-describedby": error || hint ? `${id}-d` : undefined,
            className: cn(
              inputClass,
              icon && "u-padding-left-space-10",
              trailing && "u-padding-right-space-10",
            ),
            ...rest,
          }),
          trailing &&
            _jsx("span", {
              className:
                "u-position-absolute u-inset-block-0 u-right-space-3-5 u-display-grid u-place-items-center",
              children: trailing,
            }),
        ],
      }),
      (error || hint) &&
        _jsx("p", {
          id: `${id}-d`,
          className: cn(
            "u-margin-top-space-1-5 u-letter-spacing-0-01em-text-0-75rem",
            error ? "u-color-var-bad-2" : "u-color-var-ink-3-2",
          ),
          children: error ?? hint,
        }),
    ],
  });
};
export const SelectField = ({
  label,
  hint,
  error,
  action,
  className,
  icon,
  children,
  ...rest
}) => {
  const id = useId();
  return _jsxs("div", {
    className: className,
    children: [
      _jsxs("div", {
        className:
          "u-margin-bottom-space-1-5 u-display-flex-3 u-align-items-center-2 u-justify-content-space-between u-gap-space-3",
        children: [
          _jsx("label", {
            htmlFor: id,
            className: "u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-color-var-ink",
            children: label,
          }),
          action,
        ],
      }),
      _jsxs("div", {
        className: "u-position-relative",
        children: [
          icon &&
            _jsx("span", {
              className:
                "u-pointer-events-none u-position-absolute u-inset-block-0 u-left-space-3-5 u-display-grid u-place-items-center u-color-var-ink-3-2",
              children: icon,
            }),
          _jsx("select", {
            id: id,
            "aria-invalid": !!error,
            className: cn(
              inputClass,
              "u-webkit-appearance-none-moz-appearance-none u-padding-right-space-10",
              icon && "u-padding-left-space-10",
            ),
            ...rest,
            children: children,
          }),
          _jsx(ChevronDown, {
            size: 16,
            "aria-hidden": true,
            className:
              "u-pointer-events-none u-position-absolute u-right-space-3-5 u-top-50pct u-ui-translate-y-50pct-translate-var-ui-translate-x-var-ui-translate-y u-color-var-ink-3-2",
          }),
        ],
      }),
      (error || hint) &&
        _jsx("p", {
          className: cn(
            "u-margin-top-space-1-5 u-letter-spacing-0-01em-text-0-75rem",
            error ? "u-color-var-bad-2" : "u-color-var-ink-3-2",
          ),
          children: error ?? hint,
        }),
    ],
  });
};
