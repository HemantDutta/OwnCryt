import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  filterProducts,
  products,
  sortProducts,
  type SortKey,
} from "../data/products";
import type { ProductCategory } from "../types/product";
import { ProductCard } from "../components/product/ProductCard";
import styles from "./CollectionPage.module.css";

const filters: { id: ProductCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "dresses", label: "Dresses" },
  { id: "evening", label: "Evening" },
  { id: "party", label: "Party" },
  { id: "minimal", label: "Minimal" },
  { id: "statement", label: "Statement" },
];

const SORTS: SortKey[] = ["featured", "newest", "price-asc", "price-desc"];
const FILTER_IDS = new Set(filters.map((f) => f.id));

export function CollectionPage() {
  const [params, setParams] = useSearchParams();
  const rawCategory = params.get("category") ?? "all";
  const category = FILTER_IDS.has(rawCategory as ProductCategory | "all")
    ? (rawCategory as ProductCategory | "all")
    : "all";
  const rawSort = params.get("sort") ?? "featured";
  const sort: SortKey = SORTS.includes(rawSort as SortKey)
    ? (rawSort as SortKey)
    : "featured";
  const [sheet, setSheet] = useState(false);

  const list = useMemo(
    () => sortProducts(filterProducts(products, category), sort),
    [category, sort],
  );

  const setCategory = (next: ProductCategory | "all") => {
    const copy = new URLSearchParams(params);
    if (next === "all") copy.delete("category");
    else copy.set("category", next);
    setParams(copy);
  };

  const setSort = (next: SortKey) => {
    const copy = new URLSearchParams(params);
    if (next === "featured") copy.delete("sort");
    else copy.set("sort", next);
    setParams(copy);
  };

  const activeCount = category === "all" ? 0 : 1;

  useEffect(() => {
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheet(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [sheet]);

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <h1>The Collection.</h1>
        <p>
          These are proposed designs for OwnCryt’s first edit — concepts we are
          considering for production, not pieces available to buy today.
        </p>
      </header>

      <div className={styles.toolbar}>
        <button
          type="button"
          className={styles.sheetBtn}
          onClick={() => setSheet(true)}
        >
          Filter & sort{activeCount ? ` (${activeCount})` : ""}
        </button>
        <div className={styles.desktopFilters}>
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className={category === f.id ? styles.on : undefined}
              onClick={() => setCategory(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <label className={styles.sort}>
          <span>Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
      </div>

      {sheet ? (
        <div className={styles.sheet}>
          <button
            type="button"
            className={styles.sheetBackdrop}
            aria-label="Close filters"
            onClick={() => setSheet(false)}
          />
          <div className={styles.sheetPanel} role="dialog" aria-label="Filter and sort">
            <h2>Filter & sort</h2>
            <div className={styles.chipRow}>
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={category === f.id ? styles.on : undefined}
                  onClick={() => setCategory(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <label className={styles.sort}>
              <span>Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </label>
            <div className={styles.sheetActions}>
              <button
                type="button"
                onClick={() => {
                  setCategory("all");
                  setSort("featured");
                }}
              >
                Clear
              </button>
              <button type="button" className={styles.apply} onClick={() => setSheet(false)}>
                Apply
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {list.length === 0 ? (
        <p className={styles.empty}>
          No pieces in this view.{" "}
          <button type="button" onClick={() => setCategory("all")}>
            Reset filters
          </button>
        </p>
      ) : (
        <div className={styles.grid}>
          {list.map((product, i) => (
            <ProductCard key={product.id} product={product} eager={i < 2} />
          ))}
        </div>
      )}
    </div>
  );
}
