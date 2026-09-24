import React from "react";
import styles from "./ui-link.module.css";
import { Link, type LinkProps as RouterLinkProps } from "react-router";

export type LinkVariant = "primary" | "secondary" | "empty" | "icon";

export interface LinkProps extends Omit<RouterLinkProps, "className"> {
  variant?: LinkVariant;
  className?: string;
  children?: React.ReactNode;
}

export const UiLink = ({
  variant = "primary",
  className,
  children,
  to,
  ...rest
}: LinkProps) => {
  const classNames = [styles.link, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <Link to={to} className={classNames} {...rest}>
      {children}
    </Link>
  );
};
