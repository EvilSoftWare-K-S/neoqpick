import { Button } from "@shared/button/button";
import styles from "./cart-summary.module.css";
import { useCart } from "@shared/hooks/use-cart";
export function CartSummary({ total }: { total: string }) {
  const { clearCart } = useCart();
  return (
    <aside className={styles.cartSummary}>
      <p className={styles.cartSummary__row}>
        <span className={styles.cartSummary__row__title}>ИТОГО</span>
        <span className={styles.cartSummary__row__total}>{total}</span>
      </p>
      <Button
        variant="primary"
        className={styles.cartSummary__button}
        onClick={clearCart}
      >
        <span>Перейти к оформлению</span>
      </Button>
    </aside>
  );
}
