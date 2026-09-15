import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost" | "inverse";

type Common = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type LinkProps = Common & {
  to: string;
  onClick?: ButtonHTMLAttributes<HTMLAnchorElement>["onClick"];
};

type NativeProps = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    to?: undefined;
  };

export function Button(props: LinkProps | NativeProps) {
  const variant = props.variant ?? "primary";
  const cls = `${styles.btn} ${styles[variant]} ${props.className ?? ""}`.trim();

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={cls} onClick={props.onClick}>
        {props.children}
      </Link>
    );
  }

  const button = props as NativeProps;
  return (
    <button
      className={cls}
      type={button.type ?? "button"}
      disabled={button.disabled}
      onClick={button.onClick}
    >
      {button.children}
    </button>
  );
}
