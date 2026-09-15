import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "../types/product";

type Ctx = {
  product: Product | null;
  openInterest: (product: Product) => void;
  closeInterest: () => void;
};

const InterestContext = createContext<Ctx | null>(null);

export function InterestProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<Product | null>(null);
  const openInterest = useCallback((next: Product) => setProduct(next), []);
  const closeInterest = useCallback(() => setProduct(null), []);
  const value = useMemo(
    () => ({ product, openInterest, closeInterest }),
    [product, openInterest, closeInterest],
  );
  return <InterestContext.Provider value={value}>{children}</InterestContext.Provider>;
}

export function useInterest() {
  const ctx = useContext(InterestContext);
  if (!ctx) throw new Error("useInterest must be used within InterestProvider");
  return ctx;
}
