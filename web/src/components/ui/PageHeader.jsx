import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const PageHeader = ({ kicker, title, description, actions }) =>
  _jsxs("div", {
    className:
      "u-margin-bottom-space-8 u-display-flex-3 u-flex-direction-column u-gap-space-4 u-flex-direction-row-2 u-align-items-flex-end-2 u-justify-content-space-between-2",
    children: [
      _jsxs("div", {
        className: "u-min-width-0",
        children: [
          kicker &&
            _jsx("p", {
              className:
                "u-margin-bottom-space-2 u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-medium-weight-var-font-weight-medium u-color-var-ink-3-2",
              children: kicker,
            }),
          _jsx("h1", { className: "u-letter-spacing-0-032em-text-clamp-1-75rem-3-4vw-2-25rem", children: title }),
          description &&
            _jsx("p", {
              className: "u-margin-top-space-1-5 u-letter-spacing-0-005em-text-0-9375rem u-color-var-ink-3-2",
              children: description,
            }),
        ],
      }),
      actions &&
        _jsx("div", {
          className:
            "u-display-flex-3 u-flex-shrink-0 u-align-items-center-2 u-gap-space-2",
          children: actions,
        }),
    ],
  });
export default PageHeader;
