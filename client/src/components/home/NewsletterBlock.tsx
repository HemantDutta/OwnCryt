import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { submitNewsletter } from "../../lib/api";
import { track } from "../../lib/analytics";
import { Button } from "../ui/Button";
import { CheckboxField, TextField } from "../ui/Field";
import styles from "./NewsletterBlock.module.css";

export function NewsletterBlock() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setStatus("err");
      setMessage("Please confirm you want collection updates.");
      return;
    }
    setStatus("loading");
    try {
      await submitNewsletter({
        email,
        firstName: firstName || undefined,
        marketingConsent: true,
      });
      track("newsletter_signup_completed", { source: "homepage" });
      setStatus("ok");
      setMessage("You’re on the list.");
    } catch (err) {
      setStatus("err");
      setMessage(err instanceof Error ? err.message : "Please try again.");
    }
  };

  return (
    <section className={styles.section} aria-labelledby="newsletter-heading">
      <div className={styles.inner}>
        <h2 id="newsletter-heading">Be the first to know.</h2>
        <p>Get early access to new designs, collection updates, and the pieces worth waiting for.</p>
        {status === "ok" ? (
          <p className={styles.ok} role="status">
            {message}
          </p>
        ) : (
          <form className={styles.form} onSubmit={onSubmit}>
            <TextField
              id="news-email"
              label="Email address"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="news-name"
              label="First name (optional)"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <CheckboxField
              id="news-consent"
              label="I agree to receive OwnCryt emails. You can unsubscribe anytime."
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <Button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Joining…" : "Join the list"}
            </Button>
            {message ? (
              <p className={styles.err} role="alert">
                {message}
              </p>
            ) : (
              <p className={styles.privacy}>
                We use your email only to share collection news. See our{" "}
                <Link to="/privacy">Privacy Policy</Link>.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
