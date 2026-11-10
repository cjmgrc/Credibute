import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useToast } from "@/context/ToastContext";

/** Each page keeps its own pins: a pinned project is not automatically a pinned evaluation or report. */
export const PIN_KINDS = ["project", "evaluation", "report"];

const STORAGE_KEY = "credibute.pins";
const empty = () => ({ project: [], evaluation: [], report: [] });

const load = () => {
  const out = empty();
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (raw && typeof raw === "object") {
      for (const kind of PIN_KINDS) {
        if (Array.isArray(raw[kind])) {
          out[kind] = [
            ...new Set(raw[kind].filter((id) => typeof id === "string")),
          ];
        }
      }
    }
  } catch {
    /* storage unavailable or corrupt: start with no pins */
  }
  return out;
};

const save = (pins) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pins));
  } catch {
    /* private mode / quota: pins last for this session only */
  }
};

const PinContext = createContext(null);

const PinProvider = ({ children }) => {
  const [pins, setPins] = useState(load);

  useEffect(() => save(pins), [pins]);

  // Keep other open tabs in sync.
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === STORAGE_KEY) setPins(load());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = useCallback((kind, id) => {
    setPins((prev) => {
      const list = prev[kind] ?? [];
      return {
        ...prev,
        // Newest pin first, so the thing you just pinned leads the shelf.
        [kind]: list.includes(id) ? list.filter((x) => x !== id) : [id, ...list],
      };
    });
  }, []);

  const value = useMemo(() => ({ pins, toggle }), [pins, toggle]);
  return <PinContext.Provider value={value}>{children}</PinContext.Provider>;
};

/** Pins for one page: `usePins("project")`, `usePins("evaluation")`, `usePins("report")`. */
export const usePins = (kind) => {
  const ctx = useContext(PinContext);
  if (!ctx) throw new Error("usePins must be used inside PinProvider");
  const toast = useToast();
  const { pins, toggle: toggleKind } = ctx;
  const ids = pins[kind];

  const isPinned = useCallback((id) => ids.includes(id), [ids]);
  const toggle = useCallback(
    (id, name) => {
      const wasPinned = ids.includes(id);
      toggleKind(kind, id);
      if (name) toast(wasPinned ? `“${name}” unpinned` : `“${name}” pinned`);
    },
    [ids, kind, toast, toggleKind],
  );

  return { ids, isPinned, toggle };
};

export default PinProvider;
