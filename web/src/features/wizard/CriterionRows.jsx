import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import { useState } from "react";
import { Info, Plus, Scale, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Menu from "@/components/ui/Menu";
import Dialog, { ModalBody } from "@/components/ui/Dialog";
import { inputClass } from "@/components/ui/Input";
import { SIGNALS, SIGNAL_DETAIL, newCriterion } from "@/domain/rubric";
import { balanceWeights, rubricIssues } from "@/domain/scoring";
import { cn } from "@/lib/cn";
const small = inputClass.replace("u-height-space-11 ", "u-height-space-9 ");
/** Read-only rows for the default rubric. */
export const DefaultRows = ({ criteria }) => {
  const [open, setOpen] = useState(null);
  const [last, setLast] = useState(null);
  const show = (c) => {
    setLast(c);
    setOpen(c);
  };
  return _jsxs(_Fragment, {
    children: [
      _jsx("ol", {
        className:
          "u-ui-divide-y-reverse-0-border-bottom-style-var-ui-border-style u-border-color-var-line-2 u-border-block-style-var-ui-border-style-border-block-width-1px u-border-color-var-line",
        children: criteria.map((c, i) =>
          _jsxs(
            "li",
            {
              className:
                "u-display-flex-3 u-align-items-center-2 u-gap-space-4 u-padding-block-space-4",
              children: [
                _jsx("span", {
                  "aria-hidden": true,
                  className:
                    "u-display-grid u-width-space-8-height-space-8 u-flex-shrink-0 u-place-items-center u-border-radius-var-radius-lg u-bg-var-sunken-3 u-letter-spacing-0-01em-text-0-75rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-color-var-ink-3-2",
                  children: i + 1,
                }),
                _jsxs("div", {
                  className: "u-min-width-0 u-flex-1",
                  children: [
                    _jsx("p", {
                      className: "u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold",
                      children: c.name,
                    }),
                    _jsx("p", {
                      className: "u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2",
                      children: c.description,
                    }),
                  ],
                }),
                _jsxs("span", {
                  className:
                    "u-border-radius-var-radius-lg u-border-style-var-ui-border-style-border-width-1px u-border-color-var-line u-padding-inline-space-3 u-padding-block-space-1-5 u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-font-variant-numeric-tabular-nums",
                  children: [c.weight, "%"],
                }),
                _jsx(Menu, {
                  label: `Options for ${c.name}`,
                  items: [
                    {
                      label: "How it’s measured",
                      icon: _jsx(Info, { size: 16 }),
                      onSelect: () => show(c),
                    },
                  ],
                }),
              ],
            },
            c.id,
          ),
        ),
      }),
      _jsx(Dialog, {
        open: !!open,
        onClose: () => setOpen(null),
        label: "How it\u2019s measured",
        children:
          last &&
          _jsx(ModalBody, {
            title: last.name,
            description: `${last.weight}% of the estimate`,
            footer: _jsx(Button, {
              onClick: () => setOpen(null),
              children: "Done",
            }),
            children: _jsx("ul", {
              className: "u-ui-space-y-reverse-0-margin-block-start-space-2-5-var-ui-space-y-reverse u-letter-spacing-0-text-0-8125rem u-color-var-ink-2",
              children: SIGNAL_DETAIL[last.signal].map((d) =>
                _jsxs(
                  "li",
                  {
                    className: "u-display-flex-3 u-gap-space-3",
                    children: [
                      _jsx("span", {
                        "aria-hidden": true,
                        className:
                          "u-margin-top-space-2 u-width-space-height-space u-flex-shrink-0 u-border-radius-3-40282e38px u-bg-var-ink-3",
                      }),
                      d,
                    ],
                  },
                  d,
                ),
              ),
            }),
          }),
      }),
    ],
  });
};
/** Editable rows for an instructor rubric. */
export const EditableRows = ({ criteria, onChange }) => {
  const patch = (id, p) =>
    onChange(criteria.map((c) => (c.id === id ? { ...c, ...p } : c)));
  const issues = rubricIssues(criteria);
  return _jsxs("div", {
    children: [
      _jsx("ol", {
        className:
          "u-ui-divide-y-reverse-0-border-bottom-style-var-ui-border-style u-border-color-var-line-2 u-border-block-style-var-ui-border-style-border-block-width-1px u-border-color-var-line",
        children: criteria.map((c, i) => {
          const manual = c.signal === "manual";
          return _jsxs(
            "li",
            {
              className:
                "u-display-grid u-gap-space-3 u-padding-block-space-4 u-grid-cols-2rem-1fr-12rem-5-5rem-2rem u-align-items-flex-start",
              children: [
                _jsx("span", {
                  "aria-hidden": true,
                  className:
                    "u-display-none-3 u-width-space-8-height-space-8 u-place-items-center u-border-radius-var-radius-lg u-bg-var-sunken-3 u-letter-spacing-0-01em-text-0-75rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-color-var-ink-3-2 u-display-grid-3",
                  children: i + 1,
                }),
                _jsxs("div", {
                  className: "u-display-grid u-gap-space-2",
                  children: [
                    _jsx("input", {
                      "aria-label": `Criterion ${i + 1} name`,
                      className: small,
                      placeholder: "Criterion name",
                      value: c.name,
                      onChange: (e) => patch(c.id, { name: e.target.value }),
                    }),
                    _jsx("input", {
                      "aria-label": `Criterion ${i + 1} description`,
                      className: cn(small, "u-letter-spacing-0-01em-text-0-75rem"),
                      placeholder: "What does it reward? (optional)",
                      value: c.description,
                      onChange: (e) =>
                        patch(c.id, { description: e.target.value }),
                    }),
                  ],
                }),
                _jsx("select", {
                  "aria-label": `Criterion ${i + 1} signal`,
                  className: cn(small, "u-webkit-appearance-none-moz-appearance-none"),
                  value: c.signal,
                  onChange: (e) => patch(c.id, { signal: e.target.value }),
                  children: SIGNALS.map((s) =>
                    _jsx("option", { value: s.key, children: s.label }, s.key),
                  ),
                }),
                manual
                  ? _jsx("span", {
                      className:
                        "u-display-flex-3 u-height-space-9 u-align-items-center-2 u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2",
                      children: "Not scored",
                    })
                  : _jsxs("div", {
                      className: "u-position-relative",
                      children: [
                        _jsx("input", {
                          "aria-label": `Criterion ${i + 1} weight`,
                          type: "number",
                          inputMode: "numeric",
                          min: 0,
                          max: 100,
                          className: cn(
                            small,
                            "u-padding-right-space-7 u-text-align-right u-font-variant-numeric-tabular-nums",
                          ),
                          value: c.weight,
                          onChange: (e) =>
                            patch(c.id, {
                              weight: Math.min(
                                100,
                                Math.max(
                                  0,
                                  Math.round(Number(e.target.value) || 0),
                                ),
                              ),
                            }),
                        }),
                        _jsx("span", {
                          "aria-hidden": true,
                          className:
                            "u-pointer-events-none u-position-absolute u-right-space-3 u-top-50pct u-ui-translate-y-50pct-translate-var-ui-translate-x-var-ui-translate-y u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2",
                          children: "%",
                        }),
                      ],
                    }),
                _jsx("button", {
                  type: "button",
                  "aria-label": `Remove criterion ${i + 1}`,
                  onClick: () =>
                    onChange(criteria.filter((x) => x.id !== c.id)),
                  className:
                    "u-display-grid u-width-space-9-height-space-9 u-place-items-center u-border-radius-var-radius-lg u-color-var-ink-3-2 u-transition-property-transform-color-background-color-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-ui-scale-x-90pct-ui-scale-y-90pct u-bg-var-bad-soft u-color-var-bad",
                  children: _jsx(Trash2, { size: 16 }),
                }),
              ],
            },
            c.id,
          );
        }),
      }),
      _jsxs("div", {
        className:
          "u-margin-top-space-3 u-display-flex-3 u-flex-wrap-wrap u-align-items-center-2 u-gap-space-2",
        children: [
          _jsx(Button, {
            variant: "secondary",
            size: "sm",
            icon: _jsx(Plus, { size: 15 }),
            onClick: () => onChange([...criteria, newCriterion()]),
            children: "Add criterion",
          }),
          _jsx(Button, {
            variant: "ghost",
            size: "sm",
            icon: _jsx(Scale, { size: 15 }),
            onClick: () => onChange(balanceWeights(criteria)),
            children: "Balance weights",
          }),
        ],
      }),
      issues.length > 0 &&
        _jsx("ul", {
          className:
            "u-margin-top-space-3 u-ui-space-y-reverse-0-margin-block-start-space-var-ui-space-y-reverse u-letter-spacing-0-text-0-8125rem u-color-var-warn",
          children: issues.map((x) =>
            _jsx("li", { children: x.message }, x.code),
          ),
        }),
    ],
  });
};
