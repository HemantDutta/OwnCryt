import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductBySlug, products } from "../data/products";
import { formatInrRange, statusLabel } from "../lib/format";
import { track } from "../lib/analytics";
import { useInterest } from "../context/InterestContext";
import { useSaved } from "../context/SavedContext";
import { Button } from "../components/ui/Button";
import { ProductCard } from "../components/product/ProductCard";
import { NotFoundPage } from "./EditorialPage";
import styles from "./ProductPage.module.css";

export function ProductPage() {
  const { slug = "" } = useParams();
  const product = getProductBySlug(slug);
  const { openInterest } = useInterest();
  const { isSaved, toggle } = useSaved();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (product) track("product_viewed", { productId: product.id, source: "pdp" });
    setActive(0);
  }, [product]);

  const related = useMemo(() => {
    if (!product) return [];
    const same = products.filter(
      (p) => p.id !== product.id && p.category === product.category,
    );
    const rest = products.filter(
      (p) => p.id !== product.id && !same.some((s) => s.id === p.id),
    );
    return [...same, ...rest].slice(0, 4);
  }, [product]);

  if (!product) return <NotFoundPage />;

  const image = product.images[active] ?? product.images[0];
  const saved = isSaved(product.id);

  return (
    <article className={styles.page}>
      <p className={styles.crumb}>
        <Link to="/collection">The Collection</Link>
        <span aria-hidden="true">/</span>
        <span>{product.name}</span>
      </p>

      <div className={styles.layout}>
        <div className={styles.gallery}>
          <div className={styles.frame}>
            {image ? (
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                fetchPriority="high"
              />
            ) : null}
          </div>
          {product.images.length > 1 ? (
            <div className={styles.thumbs} role="tablist" aria-label="Product views">
              {product.images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  className={i === active ? styles.thumbOn : styles.thumb}
                  onClick={() => setActive(i)}
                  aria-label={`View ${i === 0 ? "full" : "detail"}`}
                >
                  <img src={img.src} alt="" width={120} height={160} />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className={styles.info}>
          <div className={styles.panel}>
            <div className={styles.metaRow}>
              <span className={styles.badge}>{statusLabel(product.status)}</span>
              <span className={styles.badge}>{product.category}</span>
            </div>
            <h1>{product.name}</h1>
            <p className={styles.descriptor}>{product.descriptor}</p>
            <p className={styles.desc}>{product.description}</p>
            <div className={styles.priceBox}>
              <p className={styles.priceLabel}>Indicative estimate</p>
              <p className={styles.price}>
                {formatInrRange(product.indicativePriceInr, product.indicativePriceMaxInr)}
              </p>
              <p className={styles.priceNote}>Not a final retail price. INR.</p>
            </div>
            <div className={styles.ctas}>
              <Button
                onClick={() => {
                  track("product_interest_clicked", { productId: product.id });
                  openInterest(product);
                }}
              >
                I’m interested
              </Button>
              <Button variant="secondary" onClick={() => toggle(product.id)}>
                {saved ? "Saved" : "Save design"}
              </Button>
            </div>
          </div>

          <div className={styles.panel}>
            <h2>Design details</h2>
            <ul className={styles.specs}>
              {product.designDetails.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>

          <div className={styles.panel}>
            <h2>Material & fit</h2>
            <dl className={styles.facts}>
              <div>
                <dt>Fabric</dt>
                <dd>{product.fabric ?? "To be confirmed in sampling."}</dd>
              </div>
              <div>
                <dt>Sizing</dt>
                <dd>
                  XS–XL, plus free size. Custom measurements will be available if we
                  produce this piece — nothing to send now.
                </dd>
              </div>
            </dl>
          </div>

          <section className={`${styles.panel} ${styles.demand}`}>
            <h2>Want to see this piece made?</h2>
            <p>
              Tell us you’re interested. We’re using early demand to decide which designs
              become part of the first OwnCryt collection.
            </p>
          </section>
        </div>
      </div>

      {related.length > 0 ? (
        <section className={styles.related} aria-labelledby="more-edit">
          <div className={styles.relatedHead}>
            <h2 id="more-edit">More from the edit</h2>
            <Link to="/collection">View all</Link>
          </div>
          <div className={styles.relatedGrid}>
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
