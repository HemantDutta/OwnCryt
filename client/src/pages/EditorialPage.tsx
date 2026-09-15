import { Link } from "react-router-dom";
import styles from "./EditorialPage.module.css";

export function AboutPage() {
  return (
    <article className={styles.page}>
      <img
        src="/images/about.svg"
        alt="Editorial study for the OwnCryt atelier"
        width={1600}
        height={900}
      />
      <h1>A new way to want a dress.</h1>
      <p>
        OwnCryt is exploring a simple shift in fashion: making aspirational Western
        silhouettes more accessible, while listening closely to what people actually want
        to wear.
      </p>
      <h2>Design philosophy</h2>
      <p>
        We start with the dress, not the factory. Line, proportion, and the feeling of
        expense — then we ask whether it can be made well at a price that respects the
        wearer.
      </p>
      <h2>Quality within reach</h2>
      <p>
        Luxury cues should not require luxury markups as a default. The first collection
        will be built around demand, not around a warehouse of unsold inventory.
      </p>
      <h2>Before the first stitch</h2>
      <p>
        This site is a pre-launch house. The pieces you see are proposed designs. We
        collect interest, ideas, and emails so we know which silhouettes are worth
        bringing into the world. Nothing here is for sale yet.
      </p>
    </article>
  );
}

export function PrivacyPage() {
  return (
    <article className={styles.page}>
      <h1>Privacy Policy</h1>
      <p>
        OwnCryt collects email addresses and optional details when you join the list,
        express interest in a design, or submit a Custom Studio inquiry. We store that
        information so we can follow up about the collection. Saved designs live in your
        browser only.
      </p>
      <p>
        We do not sell personal data. You can ask to be removed from our lists by writing
        to the contact address on this site once it is published.
      </p>
    </article>
  );
}

export function TermsPage() {
  return (
    <article className={styles.page}>
      <h1>Terms</h1>
      <p>
        OwnCryt is a pre-launch fashion project. Product pages describe proposed designs.
        Indicative prices are estimates, not offers. Custom Studio submissions are
        inquiries, not manufacturing contracts. We do not accept payment or ship garments
        through this website.
      </p>
    </article>
  );
}

export function NotFoundPage() {
  return (
    <article className={styles.page}>
      <h1>This page has not been cut.</h1>
      <p>
        The piece you were looking for is not here. Return to{" "}
        <Link to="/collection">the collection</Link>.
      </p>
    </article>
  );
}
