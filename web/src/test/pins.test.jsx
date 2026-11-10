import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import PinButton from "@/components/ui/PinButton";
import PinProvider, { usePins } from "@/context/PinContext";
import ToastProvider from "@/context/ToastContext";

const Probe = ({ kind, label = "Campus Connect" }) => {
  const pins = usePins(kind);
  return (
    <PinButton
      name={`${kind} ${label}`}
      pinned={pins.isPinned("a")}
      onToggle={() => pins.toggle("a", label)}
    />
  );
};

const setup = (...kinds) =>
  render(
    <ToastProvider>
      <PinProvider>
        {kinds.map((k) => (
          <Probe key={k} kind={k} />
        ))}
      </PinProvider>
    </ToastProvider>,
  );

describe("pins", () => {
  beforeEach(() => localStorage.clear());

  it("toggles aria-pressed and persists to storage", () => {
    setup("project");
    const button = screen.getByRole("button", { name: "Pin project Campus Connect" });
    expect(button).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(JSON.parse(localStorage.getItem("credibute.pins")).project).toEqual(["a"]);
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("keeps projects, evaluations and reports separate", () => {
    setup("project", "evaluation", "report");
    fireEvent.click(screen.getByRole("button", { name: "Pin evaluation Campus Connect" }));
    expect(screen.getByRole("button", { name: "Pin evaluation Campus Connect" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Pin project Campus Connect" })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("button", { name: "Pin report Campus Connect" })).toHaveAttribute("aria-pressed", "false");
  });

  it("restores saved pins and ignores corrupt storage", () => {
    localStorage.setItem("credibute.pins", JSON.stringify({ report: ["a", 5] }));
    setup("report");
    expect(screen.getByRole("button", { name: "Pin report Campus Connect" })).toHaveAttribute("aria-pressed", "true");
  });
});
