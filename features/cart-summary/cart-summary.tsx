import styles from "./cart-summary.module.css";
import { UiLink } from "@shared/link/ui-link";
export function CartSummary({ total }: { total: string }) {
  return (
    <aside className={styles.cartSummary}>
      <p className={styles.cartSummary__row}>
        <span className={styles.cartSummary__row__title}>ИТОГО</span>
        <span className={styles.cartSummary__row__total}>{total}</span>
      </p>
      <UiLink to={"/pay"} variant="primary">
        <span>Перейти к оформлению</span>
      </UiLink>
    </aside>
  );
}
