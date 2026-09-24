import styles from "./header.module.css";
import { useState } from "react";
import { BadgeLink } from "@shared/badge-link/badge-link";
import { useCart } from "@shared/hooks/use-cart";
import { Logo } from "@features/logo/logo";
export function Header(): React.JSX.Element {
  const { cartProducts } = useCart();
  // вынести в хук
  const [countToFavorite, setCountToFavorite] = useState<number>(0);
  // вынести в хук
  return (
    <header className={styles.header}>
      <Logo />
      <nav className={styles.nav}>
        <BadgeLink path={"/favorite"} count={countToFavorite}>
          <img
            height={24}
            width={24}
            src="/icons/header/favorite.svg"
            alt="favorite"
          />
        </BadgeLink>
        <BadgeLink path={"/cart"} count={cartProducts.totalamount}>
          <img height={24} width={24} src="/icons/header/cart.svg" alt="cart" />
        </BadgeLink>
      </nav>
    </header>
  );
}
