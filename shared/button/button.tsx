import React from "react";
import styles from "./button.module.css";

export type ButtonVariant = "primary" | "secondary" | "empty";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children?: React.ReactNode;
}

export const Button = ({
  variant = "primary",
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) => {
  const classNames = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classNames} {...rest}>
      {children}
    </button>
  );
};
