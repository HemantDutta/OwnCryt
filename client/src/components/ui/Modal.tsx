import { useEffect, useId, useRef, type ReactNode } from "react";
import { IconButton } from "./IconButton";
import styles from "./Modal.module.css";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ open, title, onClose, children }: Props) {
  const titleId = useId();
  const onCloseRef = useRef(onClose);
  const dialogRef = useRef<HTMLDivElement>(null);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const id = window.requestAnimationFrame(() => {
      dialogRef.current
        ?.querySelector<HTMLElement>("input, textarea, select")
        ?.focus();
    });
    return () => {
      window.cancelAnimationFrame(id);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      if (prev instanceof HTMLElement) prev.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className={styles.root} role="presentation">
      <button className={styles.backdrop} aria-label="Close dialog" onClick={onClose} />
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className={styles.top}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          <IconButton label="Close" onClick={onClose}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3z"
              />
            </svg>
          </IconButton>
        </div>
        {children}
      </div>
    </div>
  );
}

