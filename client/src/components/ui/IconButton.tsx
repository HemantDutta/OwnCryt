import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import styles from "./IconButton.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: ReactNode;
};

export const IconButton = forwardRef<HTMLButtonElement, Props>(
  function IconButton({ label, children, className = "", ...rest }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        className={`${styles.btn} ${className}`.trim()}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
