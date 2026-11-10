import { Pin } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Toggle button. The accessible name stays constant ("Pin X") and the state is
 * exposed through aria-pressed, so screen readers announce "Pin X, pressed".
 * Always visible (never hover-only) so it works on touch.
 */
const PinButton = ({ pinned, onToggle, name, className }) => (
  <button
    type="button"
    className={cn("pin-btn", className)}
    aria-pressed={pinned}
    aria-label={`Pin ${name}`}
    title={pinned ? "Unpin" : "Pin to top"}
    onClick={onToggle}
  >
    <Pin size={16} strokeWidth={2} aria-hidden="true" />
  </button>
);

export default PinButton;
