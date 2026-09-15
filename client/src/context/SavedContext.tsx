import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { readSavedIds, writeSavedIds } from "../lib/savedDesigns";
import { track } from "../lib/analytics";

type Ctx = {
  ids: string[];
  isSaved: (id: string) => boolean;
  toggle: (id: string) => void;
};

const SavedContext = createContext<Ctx | null>(null);

export function SavedProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(() =>
    typeof window === "undefined" ? [] : readSavedIds(),
  );

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      writeSavedIds(next);
      if (!prev.includes(id)) track("design_saved", { productId: id });
      return next;
    });
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      ids,
      isSaved: (id) => ids.includes(id),
      toggle,
    }),
    [ids, toggle],
  );

  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
}

export function useSaved() {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error("useSaved must be used within SavedProvider");
  return ctx;
}
