import { Link } from "react-router";
import styles from "./header.module.css";
import { useState } from "react";
import { BadgeLink } from "@shared/badge-link/badge-link";
import { useCart } from "@shared/hooks/use-cart";
export function Header(): React.JSX.Element {
   const { cartProducts } = useCart();
  // вынести в хук 
  const [countToFavorite, setCountToFavorite] = useState<number>(0);
  // вынести в хук
  return (
    <header className={styles.header}>
      {/* вынести в компонент */}
      <Link to={"/"} className={styles.logo}>
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
      </Link>
      {/* вынести в компонент */}
      <nav className={styles.nav}>
        {/* мепить */}
        <BadgeLink path={"/favorite"} count={countToFavorite}>
          <img height={24} width={24} src="/icons/header/favorite.svg" alt="favorite" />
        </BadgeLink>
        <BadgeLink path={"/cart"} count={cartProducts.totalamount}>
          <img height={24} width={24} src="/icons/header/cart.svg" alt="cart" />
        </BadgeLink>
        {/* мепить */}
      </nav>
    </header>
  );
}
