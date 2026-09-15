import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { submitNewsletter } from "../../lib/api";
import { track } from "../../lib/analytics";
import { Button } from "../ui/Button";
import { CheckboxField, TextField } from "../ui/Field";
import styles from "./Footer.module.css";

export function Footer() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setStatus("err");
      setMessage("Please confirm you want updates.");
      return;
    }
    setStatus("loading");
    try {
      await submitNewsletter({ email, marketingConsent: true });
      track("newsletter_signup_completed", { source: "footer" });
      setStatus("ok");
      setMessage("You’re on the list.");
      setEmail("");
      setConsent(false);
    } catch (err) {
      setStatus("err");
      setMessage(err instanceof Error ? err.message : "Please try again.");
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <p className={styles.logo}>OwnCryt</p>
          <p className={styles.tag}>
            The look of luxury. The freedom to own it.
          </p>
        </div>
        <nav aria-label="Footer">
          <Link to="/collection">Collections</Link>
          <Link to="/custom-studio">Custom Studio</Link>
          <Link to="/about">About OwnCryt</Link>
          <Link to="/saved">Saved designs</Link>
        </nav>
        <nav aria-label="Legal">
          <a href="mailto:hello@owncryt.example">Contact</a>
          <span>Instagram — link coming</span>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms</Link>
        </nav>
        <form className={styles.form} onSubmit={onSubmit}>
          <p className={styles.formTitle}>Join the list</p>
          <TextField
            id="footer-email"
            label="Email address"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <CheckboxField
            id="footer-consent"
            label="I agree to receive collection updates from OwnCryt."
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <Button type="submit" variant="inverse" disabled={status === "loading"}>
            {status === "loading" ? "Joining…" : "Join the list"}
          </Button>
          {message ? (
            <p className={status === "err" ? styles.err : styles.ok} role="status">
              {message}
            </p>
          ) : (
            <p className={styles.note}>We only write when there is something worth wearing.</p>
          )}
        </form>
      </div>
      <div className={styles.meta}>
        <p>India</p>
        <p>Indicative prices in INR. Pieces are in development — not for sale yet.</p>
      </div>
    </footer>
  );
}
