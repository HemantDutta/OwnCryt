import { FormEvent, useState } from "react";
import { submitInterest } from "../../lib/api";
import { track } from "../../lib/analytics";
import { useInterest } from "../../context/InterestContext";
import { SIZE_NOTE, SIZE_OPTIONS } from "../../data/sizes";
import { Button } from "../ui/Button";
import { CheckboxField, SelectField, TextField } from "../ui/Field";
import { Modal } from "../ui/Modal";
import styles from "./InterestModal.module.css";

export function InterestModal() {
  const { product, closeInterest } = useInterest();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [sizePreference, setSizePreference] = useState("");
  const [country, setCountry] = useState("IN");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [error, setError] = useState("");

  const reset = () => {
    setEmail("");
    setName("");
    setSizePreference("");
    setCountry("IN");
    setConsent(false);
    setStatus("idle");
    setError("");
  };

  const onClose = () => {
    closeInterest();
    reset();
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!product) return;
    if (!consent) {
      setStatus("err");
      setError("Please confirm you want updates about this piece.");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      await submitInterest({
        productId: product.id,
        email,
        name: name || undefined,
        sizePreference: sizePreference || undefined,
        country,
        marketingConsent: true,
      });
      track("interest_form_submitted", { productId: product.id });
      setStatus("ok");
    } catch (err) {
      setStatus("err");
      setError(err instanceof Error ? err.message : "Please try again.");
    }
  };

  return (
    <Modal
      open={Boolean(product)}
      title={status === "ok" ? "You’re on the list." : "I’m interested"}
      onClose={onClose}
    >
      {status === "ok" ? (
        <p className={styles.copy}>
          Thank you. We’ll let you know if this piece moves closer to production.
        </p>
      ) : (
        <form className={styles.form} onSubmit={onSubmit}>
          <p className={styles.copy}>
            {product
              ? `Tell us you want to see ${product.name} made. We’re using early demand to decide the first collection.`
              : null}
          </p>
          <TextField
            id="interest-email"
            label="Email address"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="interest-name"
            label="Name (optional)"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <SelectField
            id="interest-size"
            label="Size preference (optional)"
            value={sizePreference}
            onChange={(e) => setSizePreference(e.target.value)}
          >
            {SIZE_OPTIONS.map((option) => (
              <option key={option.value || "unset"} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectField>
          <p className={styles.sizeNote}>{SIZE_NOTE}</p>
          <SelectField
            id="interest-country"
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="IN">India</option>
            <option value="AE">United Arab Emirates</option>
            <option value="GB">United Kingdom</option>
            <option value="US">United States</option>
            <option value="OTHER">Other</option>
          </SelectField>
          <CheckboxField
            id="interest-consent"
            label="I agree to receive updates about this design and the OwnCryt collection."
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          {error ? (
            <p className={styles.error} role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : "Join this list"}
          </Button>
        </form>
      )}
    </Modal>
  );
}
