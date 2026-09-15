import { FormEvent, useEffect, useMemo, useState } from "react";
import { submitCustomDesign } from "../lib/api";
import { track } from "../lib/analytics";
import { SIZE_NOTE, SIZE_OPTIONS } from "../data/sizes";
import { Button } from "../components/ui/Button";
import { CheckboxField, SelectField, TextAreaField, TextField } from "../components/ui/Field";
import styles from "./CustomStudioPage.module.css";

const occasions = ["Party", "Evening", "Wedding guest", "Vacation", "Casual", "Other"];

export function CustomStudioPage() {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState("");
  const [occasion, setOccasion] = useState("Party");
  const [silhouette, setSilhouette] = useState("");
  const [color, setColor] = useState("");
  const [fabric, setFabric] = useState("");
  const [budget, setBudget] = useState("");
  const [size, setSize] = useState("");
  const [country, setCountry] = useState("IN");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [error, setError] = useState("");

  const previews = useMemo(
    () => files.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [files],
  );

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    setFiles((prev) => [...prev, ...Array.from(list)].slice(0, 6));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError("Consent is required so we can contact you about this inquiry.");
      return;
    }
    setStatus("loading");
    setError("");
    const form = new FormData();
    form.set("description", description);
    form.set("occasion", occasion);
    form.set("silhouette", silhouette);
    form.set("color", color);
    form.set("fabric", fabric);
    form.set("budget", budget);
    form.set("size", size);
    form.set("country", country);
    form.set("name", name);
    form.set("email", email);
    form.set("phone", phone);
    form.set("marketingConsent", "true");
    files.forEach((file) => form.append("images", file));
    try {
      await submitCustomDesign(form);
      track("design_submission_completed");
      setStatus("ok");
    } catch (err) {
      setStatus("err");
      setError(err instanceof Error ? err.message : "Please try again.");
    }
  };

  if (status === "ok") {
    return (
      <section className={styles.page}>
        <h1>Your idea has been received.</h1>
        <p>
          Our team will review your inspiration and reach out if we can explore bringing it
          to life. This is a design inquiry, not an order.
        </p>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <p className={styles.step}>Step {step} of 3</p>
      <h1>Imagine it. Wear it.</h1>
      <p className={styles.lede}>
        Have a reference image, a sketch, or simply an idea? Share your vision with OwnCryt.
        We may explore making it — we cannot promise manufacturing, price, or a date.
      </p>

      <form
        className={styles.form}
        onSubmit={step === 3 ? onSubmit : (e) => e.preventDefault()}
      >
        {step === 1 ? (
          <div
            className={styles.drop}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              addFiles(e.dataTransfer.files);
            }}
          >
            <p>Drop reference images, sketches, or moodboards here.</p>
            <label className={styles.file}>
              Choose files
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => addFiles(e.target.files)}
              />
            </label>
            <ul className={styles.previews}>
              {previews.map(({ file, url }) => (
                <li key={file.name + file.size}>
                  <img src={url} alt="" />
                  <span>{file.name}</span>
                  <button
                    type="button"
                    onClick={() => setFiles((prev) => prev.filter((f) => f !== file))}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <Button
              onClick={() => {
                track("design_submission_started");
                setStep(2);
              }}
            >
              Continue
            </Button>
          </div>
        ) : null}

        {step === 2 ? (
          <div className={styles.grid}>
            <TextAreaField
              id="dress"
              label="Describe your dress"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <SelectField
              id="occasion"
              label="Occasion"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
            >
              {occasions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </SelectField>
            <TextField
              id="sil"
              label="Preferred silhouette"
              value={silhouette}
              onChange={(e) => setSilhouette(e.target.value)}
            />
            <TextField
              id="color"
              label="Preferred colour"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <TextField
              id="fabric"
              label="Preferred fabric, if known"
              value={fabric}
              onChange={(e) => setFabric(e.target.value)}
            />
            <TextField
              id="budget"
              label="Desired budget range"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
            <SelectField
              id="size"
              label="Preferred size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {SIZE_OPTIONS.map((option) => (
                <option key={option.value || "unset"} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SelectField>
            <p className={styles.sizeNote}>{SIZE_NOTE}</p>
            <SelectField
              id="country"
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
            <div className={styles.row}>
              <Button variant="secondary" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={() => setStep(3)} disabled={description.trim().length < 8}>
                Continue
              </Button>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className={styles.grid}>
            <TextField
              id="name"
              label="Name"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="email"
              label="Email address"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="phone"
              label="Phone (optional)"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <CheckboxField
              id="consent"
              label="I agree to be contacted about this design inquiry."
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            {error ? <p className={styles.err}>{error}</p> : null}
            <div className={styles.row}>
              <Button variant="secondary" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Sending…" : "Submit design request"}
              </Button>
            </div>
          </div>
        ) : null}
      </form>
    </section>
  );
}
