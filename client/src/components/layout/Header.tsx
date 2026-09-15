import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IconButton } from "../ui/IconButton";
import { SearchOverlay } from "./SearchOverlay";
import styles from "./Header.module.css";

const links = [
  { to: "/collection?category=dresses", label: "Women", id: "women" },
  { to: "/collection", label: "Collections", id: "collections" },
  { to: "/custom-studio", label: "Custom Studio", id: "studio" },
  { to: "/about", label: "About", id: "about" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category");

  const isNavActive = (id: string, isActive: boolean) => {
    if (id === "women") {
      return location.pathname === "/collection" && category === "dresses";
    }
    if (id === "collections") {
      return location.pathname === "/collection" && category !== "dresses";
    }
    return isActive;
  };

  return (
    <header className={styles.header}>
      <div className={styles.row}>
        <IconButton
          className={styles.menuBtn}
          label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => {
            setMenuOpen((v) => !v);
            setSearchOpen(false);
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {menuOpen ? (
              <path fill="currentColor" d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3z" />
            ) : (
              <path fill="currentColor" d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
            )}
          </svg>
        </IconButton>

        <NavLink to="/" className={styles.wordmark} onClick={() => setMenuOpen(false)}>
          OwnCryt
        </NavLink>

        <nav className={styles.desktopNav} aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.id}
              to={link.to}
              className={({ isActive }) =>
                isNavActive(link.id, isActive) ? styles.active : undefined
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.icons}>
          <IconButton
            label="Search designs"
            aria-expanded={searchOpen}
            onClick={() => {
              setSearchOpen((v) => !v);
              setMenuOpen(false);
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.49 21.49 20 15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              />
            </svg>
          </IconButton>
          <NavLink to="/saved" className={styles.iconLink} aria-label="Saved designs">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12.1 21.35 10 19.28C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8 10.78l-1.9 2.07z"
              />
            </svg>
          </NavLink>
        </div>
      </div>

      {menuOpen ? (
        <nav className={styles.mobileNav} aria-label="Mobile">
          {links.map((link) => (
            <NavLink
              key={link.id}
              to={link.to}
              className={({ isActive }) =>
                isNavActive(link.id, isActive) ? styles.active : undefined
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      ) : null}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
