import styles from "./ErrorFallback.module.css";

type Props = {
  onRetry?: () => void;
};

export function ErrorFallback({ onRetry }: Props) {
  return (
    <section className={styles.page} role="alert">
      <p className={styles.eyebrow}>A pause in the atelier</p>
      <h1>This page came unstitched.</h1>
      <p>
        Something went wrong while loading this view. Your saved designs on this
        device are still here. Try again, or go back to the collection.
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.primary} onClick={() => window.location.reload()}>
          Refresh
        </button>
        <a
          href="/"
          className={styles.secondary}
          onClick={(event) => {
            if (!onRetry) return;
            event.preventDefault();
            onRetry();
          }}
        >
          Return home
        </a>
      </div>
    </section>
  );
}
