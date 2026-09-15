import { Link } from "react-router-dom";
import { formatInrRange, statusLabel } from "../../lib/format";
import { track } from "../../lib/analytics";
import type { Product } from "../../types/product";
import { useInterest } from "../../context/InterestContext";
import { useSaved } from "../../context/SavedContext";
import { IconButton } from "../ui/IconButton";
import styles from "./ProductCard.module.css";

type Props = {
  product: Product;
  eager?: boolean;
};

export function ProductCard({ product, eager = false }: Props) {
  const { isSaved, toggle } = useSaved();
  const { openInterest } = useInterest();
  const saved = isSaved(product.id);
  const primary = product.images[0];
  const hover = product.images[1];

  return (
    <article className={styles.card}>
      <Link
        to={`/product/${product.slug}`}
        className={styles.media}
        onClick={() => track("product_viewed", { productId: product.id, source: "card" })}
      >
        {primary ? (
          <img
            src={primary.src}
            alt={primary.alt}
            width={primary.width}
            height={primary.height}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={eager ? "high" : "auto"}
          />
        ) : null}
        {hover ? (
          <img
            className={styles.alt}
            src={hover.src}
            alt=""
            width={hover.width}
            height={hover.height}
            loading="lazy"
            decoding="async"
          />
        ) : null}
        <span className={styles.status}>{statusLabel(product.status)}</span>
      </Link>
      <div className={styles.body}>
        <div className={styles.copy}>
          <h3>
            <Link to={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
          <p>{product.descriptor}</p>
          <p className={styles.price}>
            {formatInrRange(product.indicativePriceInr, product.indicativePriceMaxInr)}{" "}
            <span>est.</span>
          </p>
        </div>
        <div className={styles.actions}>
          <Link className={styles.view} to={`/product/${product.slug}`}>
            View piece
          </Link>
          <IconButton
            label={saved ? "Remove saved design" : "Save design"}
            aria-pressed={saved}
            onClick={() => toggle(product.id)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill={saved ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.6"
                d="M12.1 21.35 10 19.28C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8 10.78l-1.9 2.07z"
              />
            </svg>
          </IconButton>
          <button
            type="button"
            className={styles.interest}
            onClick={() => {
              track("product_interest_clicked", { productId: product.id });
              openInterest(product);
            }}
          >
            I’m interested
          </button>
        </div>
      </div>
    </article>
  );
}
