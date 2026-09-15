import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "../ui/IconButton";
import styles from "./SearchOverlay.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function SearchOverlay({ open, onClose }: Props) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next = q.trim();
    if (!next) return;
    navigate(`/search?q=${encodeURIComponent(next)}`);
    onClose();
  };

  return (
    <div className={styles.root}>
      <form onSubmit={onSubmit} className={styles.form} role="search">
        <label htmlFor="site-search" className={styles.sr}>
          Search designs
        </label>
        <input
          id="site-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search dresses, silhouettes, occasions"
          autoFocus
          autoComplete="off"
        />
        <IconButton label="Close search" onClick={onClose}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3z"
            />
          </svg>
        </IconButton>
      </form>
    </div>
  );
}
