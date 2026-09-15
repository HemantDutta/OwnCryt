import { products } from "../data/products";
import { useSaved } from "../context/SavedContext";
import { ProductCard } from "../components/product/ProductCard";
import { Button } from "../components/ui/Button";
import styles from "./CollectionPage.module.css";

export function SavedPage() {
  const { ids } = useSaved();
  const list = products.filter((p) => ids.includes(p.id));

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <h1>Saved designs.</h1>
        <p>Kept on this device for now. Sign-in and cloud saves will come later.</p>
      </header>
      {list.length === 0 ? (
        <div className={styles.empty}>
          <p>Nothing saved yet.</p>
          <Button to="/collection" variant="secondary">
            Browse the collection
          </Button>
        </div>
      ) : (
        <div className={styles.grid}>
          {list.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
