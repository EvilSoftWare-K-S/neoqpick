import { QuantityControl } from "@shared/quantity-control/quantity-control";
import styles from "./cart-order-bottom.module.css";
import { currencyFormatter } from "@shared/utils/currency-formatter";
import type { TProductCartItems } from "@shared/models/types";
import { useCart } from "@shared/hooks/use-cart";
export function CartOrderBottom({ items }: TProductCartItems) {
  const { plusProductCart, minusProductCart } = useCart();
  return (
    <div className={styles.cartOrderBottom}>
      <QuantityControl
        value={items.amount}
        onIncrement={() => plusProductCart(items.id)}
        onDecrement={() => minusProductCart(items.id)}
      />
      <span className={styles.cartOrderBottom__totalCurrency}>
        {currencyFormatter(Number(items.amount) * Number(items.current_price))}
      </span>
    </div>
  );
}
