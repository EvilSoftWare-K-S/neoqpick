import styles from "./logo.module.css";
import { UiLink } from "@shared/link/ui-link";
export function Logo() {
  return (
    <UiLink
      variant="secondary"
      to={"/"}
      aria-label={`Click to go to catalog`}
      className={styles.logo}
    >
      <svg
        width="85"
        height="30"
        viewBox="0 0 85 30"
        style={{ display: "block" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="0"
          y="24"
          fontFamily="Montserrat, sans-serif"
          fontSize="25"
          width={700}
          fontWeight="bold"
          fill={`var(--color-text-logo)`}
        >
          QPICK
        </text>
      </svg>
    </UiLink>
  );
}
