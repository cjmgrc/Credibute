import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import { AlertTriangle, AtSign, Check, UserMinus } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Menu from "@/components/ui/Menu";
import { GithubMark } from "@/components/brand/BrandIcons";
const MemberRow = ({ m, onRemove }) => {
  const id = m.identities[0];
  return _jsxs("li", {
    className:
      "u-display-flex-3 u-flex-wrap-wrap u-align-items-center-2 u-column-gap-space-4 u-row-gap-space-2 u-padding-block-space-4",
    children: [
      _jsx(Avatar, { name: m.name, tone: m.tone }),
      _jsxs("div", {
        className:
          "u-min-width-8rem u-flex-1 u-flex-none u-flex-basis-space-36",
        children: [
          _jsx("p", {
            className: "u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold",
            children: m.name,
          }),
          _jsx("p", {
            className: "u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2",
            children: m.label,
          }),
        ],
      }),
      _jsx("div", {
        className:
          "u-order-9999 u-display-flex-3 u-min-width-0 u-flex-basis-100pct u-flex-wrap-wrap u-align-items-center-2 u-column-gap-space-5 u-row-gap-space u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-2 u-order-0 u-flex-basis-auto u-flex-1-2",
        children: id
          ? _jsxs(_Fragment, {
              children: [
                id.username &&
                  _jsxs("span", {
                    className:
                      "u-display-flex-3 u-align-items-center-2 u-gap-space-1-5",
                    children: [
                      _jsx(GithubMark, { size: 14 }),
                      "@",
                      id.username,
                    ],
                  }),
                _jsxs("span", {
                  className:
                    "u-display-flex-3 u-min-width-0 u-align-items-center-2 u-gap-space-1-5",
                  children: [
                    _jsx(AtSign, {
                      size: 13,
                      "aria-hidden": true,
                      className: "u-flex-shrink-0 u-color-var-ink-3-2",
                    }),
                    _jsx("span", {
                      className: "u-text-overflow-ellipsis-white-space-nowrap",
                      children: id.email,
                    }),
                  ],
                }),
                m.identities.length > 1 &&
                  _jsxs("span", {
                    className: "u-color-var-ink-3-2",
                    children: ["+", m.identities.length - 1, " more"],
                  }),
              ],
            })
          : _jsx("span", {
              className: "u-color-var-ink-3-2",
              children: "No Git identity yet",
            }),
      }),
      id
        ? _jsxs("span", {
            className:
              "u-display-flex-3 u-align-items-center-2 u-gap-space u-letter-spacing-0-01em-text-0-75rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-color-var-ok",
            children: [
              _jsx(Check, { size: 14, strokeWidth: 3, "aria-hidden": true }),
              "Matched",
            ],
          })
        : _jsxs("span", {
            className:
              "u-display-flex-3 u-align-items-center-2 u-gap-space u-letter-spacing-0-01em-text-0-75rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-color-var-warn",
            children: [
              _jsx(AlertTriangle, { size: 14, "aria-hidden": true }),
              "Unmatched",
            ],
          }),
      _jsx(Menu, {
        label: `Options for ${m.name}`,
        items: [
          {
            label: "Remove member",
            icon: _jsx(UserMinus, { size: 16 }),
            tone: "danger",
            onSelect: onRemove,
          },
        ],
      }),
    ],
  });
};
export default MemberRow;
