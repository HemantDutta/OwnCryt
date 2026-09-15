import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { searchProducts } from "../data/products";
import { track } from "../lib/analytics";
import { ProductCard } from "../components/product/ProductCard";
import styles from "./CollectionPage.module.css";

export function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";
  const results = useMemo(() => searchProducts(q), [q]);

  useEffect(() => {
    if (q) track("search_used", { queryLength: q.length, results: results.length });
  }, [q, results.length]);

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <h1>Search.</h1>
        <p>
          {q
            ? `${results.length} result${results.length === 1 ? "" : "s"} for “${q}”`
            : "Type a silhouette, colour, or dress name."}
        </p>
      </header>
      {q && results.length === 0 ? (
        <p className={styles.empty}>No designs matched that search.</p>
      ) : (
        <div className={styles.grid}>
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
