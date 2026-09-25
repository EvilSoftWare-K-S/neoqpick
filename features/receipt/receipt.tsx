import { useCart } from "@shared/hooks/cart/use-cart";
import { currencyFormatter } from "@shared/utils/formatter";
import styles from "./receipt.module.css";
import { Logo } from "@features/logo/logo";

export function Receipt() {
  const { cartProducts } = useCart();
  const items = Object.values(cartProducts.items);

  return (
    <section className={styles.receipt}>
      <p className={styles.header}>
        <Logo />
        <span className={styles.date}>
          {new Date().toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      </p>

      <hr className={styles.divider} />

      <ul className={styles.items}>
        {items.map((item) => (
          <li key={item.id} className={styles.item}>
            <span className={styles.itemTitle}>{item.title}</span>
            <span className={styles.itemAmount}>x{item.amount}</span>
            <span className={styles.itemPrice}>
              {currencyFormatter(Number(item.current_price) * item.amount)}
            </span>
          </li>
        ))}
      </ul>

      <hr className={styles.divider} />

      <p className={styles.total}>
        <span>Итого</span>
        <span className={styles.totalSum}>
          {currencyFormatter(
            items.reduce(
              (acc, i) => acc + Number(i.current_price) * i.amount,
              0,
            ),
          )}
        </span>
      </p>

      <hr className={styles.perforation} aria-hidden />
      <p className={styles.thanks}>Спасибо за покупку!</p>
    </section>
  );
}
