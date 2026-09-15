import { featuredProducts } from "../data/products";
import { Button } from "../components/ui/Button";
import { ProductCard } from "../components/product/ProductCard";
import { NewsletterBlock } from "../components/home/NewsletterBlock";
import styles from "./HomePage.module.css";

export function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <img
          src="/images/hero.svg"
          alt="Editorial campaign study for OwnCryt’s first collection"
          width={1600}
          height={900}
          fetchPriority="high"
          decoding="async"
        />
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>The first edit</p>
          <h1>The look of luxury. The freedom to own it.</h1>
          <p className={styles.lede}>
            Statement silhouettes, thoughtfully imagined for a new generation of fashion.
          </p>
          <div className={styles.ctas}>
            <Button to="/collection" variant="inverse">
              Explore the collection
            </Button>
            <Button to="/custom-studio" variant="secondary" className={styles.ghost}>
              Design your own
            </Button>
          </div>
        </div>
      </section>

      <section className={styles.edit} aria-labelledby="first-edit">
        <div className={styles.editHead}>
          <h2 id="first-edit">The First Edit</h2>
          <p>Proposed designs. Not in production — tell us which ones should be.</p>
        </div>
        <div className={styles.grid}>
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} eager={i < 2} />
          ))}
        </div>
        <div className={styles.center}>
          <Button to="/collection" variant="secondary">
            View all pieces
          </Button>
        </div>
      </section>

      <section className={styles.statement}>
        <h2>Expensive-looking. Within reach.</h2>
        <p>
          OwnCryt is built around a simple idea: remarkable fashion should not have to come
          with an unreasonable price tag. We are exploring the silhouettes, details, and
          designs people actually want to wear—and building a collection around them.
        </p>
      </section>

      <section className={styles.banner}>
        <img
          src="/images/editorial.svg"
          alt=""
          width={1600}
          height={900}
          loading="lazy"
        />
        <div className={styles.bannerCopy}>
          <h2>Your next favorite dress hasn’t been made yet.</h2>
          <p>Help us decide what comes next.</p>
          <Button to="/collection" variant="inverse">
            Discover the edit
          </Button>
        </div>
      </section>

      <section className={styles.custom}>
        <img
          src="/images/custom-studio.svg"
          alt="Atelier study for OwnCryt Custom Studio"
          width={1200}
          height={1600}
          loading="lazy"
        />
        <div>
          <h2>Your vision. Your silhouette.</h2>
          <p>
            Have a dress in mind? Share your inspiration, and we’ll explore how to bring
            your design to life.
          </p>
          <Button to="/custom-studio">Submit your design</Button>
        </div>
      </section>

      <NewsletterBlock />
    </>
  );
}
