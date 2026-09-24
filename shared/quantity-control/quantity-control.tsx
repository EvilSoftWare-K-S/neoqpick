import { Button } from "@shared/button/button";
import styles from "./quantity-control.module.css";
interface IQuantityControl {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const QuantityControl = ({
  value,
  onIncrement,
  onDecrement,
}: IQuantityControl) => (
  <div className={styles.bottomPanel}>
    <Button
      variant="icon"
      className={styles.bottomPanel__button}
      onClick={onDecrement}
      aria-label="Уменьшить количество"
    >
      <img src="./icons/cart/minus.svg" alt="minus" />
    </Button>
    <span className={styles.bottomPanel__amount}>{value}</span>
    <Button
      variant="icon"
      className={styles.bottomPanel__button}
      onClick={onIncrement}
      aria-label="Увеличить количество"
    >
      <img src="./icons/cart/plus.svg" alt="plus" />
    </Button>
  </div>
);
