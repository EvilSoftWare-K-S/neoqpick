import { Link } from "react-router";
import header from "./header.module.css";
import { useState } from "react";
import { BadgeLink } from "@features/badge-link/badge-link";
export function Header(): React.JSX.Element {
  // вынести в хук
  const [countToCart, setCountToCart] = useState<number>(0);
  const [countToFavorite, setCountToFavorite] = useState<number>(0);
  // вынести в хук
  return (
    <header className={header.header}>
      {/* вынести в компонент */}
      <Link to={"/"} className={header.logo}>
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
      <nav className={header.nav}>
        {/* мепить */}
        <BadgeLink path={"/favorite"} count={countToFavorite}>
          <img src="/icons/header/favorite.svg" alt="favorite" />
        </BadgeLink>
        <BadgeLink path={"/cart"} count={countToCart}>
          <img src="/icons/header/cart.svg" alt="cart" />
        </BadgeLink>
        {/* мепить */}
      </nav>
    </header>
  );
}
