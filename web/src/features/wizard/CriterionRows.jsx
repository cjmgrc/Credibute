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
const small = inputClass.replace("style-22189506c2 ", "style-539ae144f0 ");
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
          "style-d1626f14b8 style-b682aa7242 style-582305bd50 style-4769f958af",
        children: criteria.map((c, i) =>
          _jsxs(
            "li",
            {
              className:
                "style-222f930b87 style-71556df3b4 style-90fc3ec35a style-f33d55d2db",
              children: [
                _jsx("span", {
                  "aria-hidden": true,
                  className:
                    "style-0f2a693e93 style-ebd37e04d4 style-27ead27a81 style-4446c26b62 style-49abc543ea style-2de8262ccb style-4010c02329 style-87e86ce38e style-682659f553",
                  children: i + 1,
                }),
                _jsxs("div", {
                  className: "style-184ddc11e5 style-7bd5bab6d7",
                  children: [
                    _jsx("p", {
                      className: "style-294e640e9b style-87e86ce38e",
                      children: c.name,
                    }),
                    _jsx("p", {
                      className: "style-4010c02329 style-682659f553",
                      children: c.description,
                    }),
                  ],
                }),
                _jsxs("span", {
                  className:
                    "style-49abc543ea style-4f1a55de40 style-4769f958af style-0f9e667291 style-a8c1dfb1d4 style-294e640e9b style-87e86ce38e style-60182fbf94",
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
              className: "style-b5776161da style-294e640e9b style-9e676c7431",
              children: SIGNAL_DETAIL[last.signal].map((d) =>
                _jsxs(
                  "li",
                  {
                    className: "style-222f930b87 style-d7db3451d1",
                    children: [
                      _jsx("span", {
                        "aria-hidden": true,
                        className:
                          "style-f28fea81a5 style-b82d83cf0c style-27ead27a81 style-b005d61d09 style-d8e6f3c399",
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
          "style-d1626f14b8 style-b682aa7242 style-582305bd50 style-4769f958af",
        children: criteria.map((c, i) => {
          const manual = c.signal === "manual";
          return _jsxs(
            "li",
            {
              className:
                "style-0f2a693e93 style-d7db3451d1 style-f33d55d2db style-315e8d22ff style-16a631cbd5",
              children: [
                _jsx("span", {
                  "aria-hidden": true,
                  className:
                    "style-e564b4081d style-ebd37e04d4 style-4446c26b62 style-49abc543ea style-2de8262ccb style-4010c02329 style-87e86ce38e style-682659f553 style-94148d35b0",
                  children: i + 1,
                }),
                _jsxs("div", {
                  className: "style-0f2a693e93 style-074569488c",
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
                      className: cn(small, "style-4010c02329"),
                      placeholder: "What does it reward? (optional)",
                      value: c.description,
                      onChange: (e) =>
                        patch(c.id, { description: e.target.value }),
                    }),
                  ],
                }),
                _jsx("select", {
                  "aria-label": `Criterion ${i + 1} signal`,
                  className: cn(small, "style-395428ec59"),
                  value: c.signal,
                  onChange: (e) => patch(c.id, { signal: e.target.value }),
                  children: SIGNALS.map((s) =>
                    _jsx("option", { value: s.key, children: s.label }, s.key),
                  ),
                }),
                manual
                  ? _jsx("span", {
                      className:
                        "style-222f930b87 style-539ae144f0 style-71556df3b4 style-4010c02329 style-682659f553",
                      children: "Not scored",
                    })
                  : _jsxs("div", {
                      className: "style-d2d9e1f134",
                      children: [
                        _jsx("input", {
                          "aria-label": `Criterion ${i + 1} weight`,
                          type: "number",
                          inputMode: "numeric",
                          min: 0,
                          max: 100,
                          className: cn(
                            small,
                            "style-c1cec5c4a6 style-fe5b15276f style-60182fbf94",
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
                            "style-33228ff7d5 style-747355bdc2 style-8b66d98296 style-4e45f4841a style-5dde0fd996 style-4010c02329 style-682659f553",
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
                    "style-0f2a693e93 style-3ee10ef4c0 style-4446c26b62 style-49abc543ea style-682659f553 style-6a238a29da style-3d53df2cf7 style-d64255261e style-5cc85fc4e5 style-07239c3bb9",
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
          "style-d21b86ea41 style-222f930b87 style-faa8a23c68 style-71556df3b4 style-074569488c",
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
            "style-d21b86ea41 style-27e6c43219 style-294e640e9b style-7294770c9c",
          children: issues.map((x) =>
            _jsx("li", { children: x.message }, x.code),
          ),
        }),
    ],
  });
};
