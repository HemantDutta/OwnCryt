import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import styles from "./Field.module.css";

type Base = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
};

export function TextField({
  id,
  label,
  error,
  hint,
  ...rest
}: Base & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <input id={id} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-err` : undefined} {...rest} />
      {hint && !error ? <p className={styles.hint}>{hint}</p> : null}
      {error ? (
        <p className={styles.error} id={`${id}-err`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextAreaField({
  id,
  label,
  error,
  ...rest
}: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} aria-invalid={Boolean(error)} {...rest} />
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
}

export function SelectField({
  id,
  label,
  error,
  children,
  ...rest
}: Base & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <select id={id} aria-invalid={Boolean(error)} {...rest}>
        {children}
      </select>
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
}

export function CheckboxField({
  id,
  label,
  error,
  ...rest
}: Base & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={styles.check}>
      <input id={id} type="checkbox" {...rest} />
      <label htmlFor={id}>{label}</label>
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
}
