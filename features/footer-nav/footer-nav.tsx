import { LanguagePanel } from "@features/language-panel/language-panel";
import styles from "./footer-nav.module.css";
import { NavLink } from "react-router";
type Props = {
  to: string;
  children: React.ReactNode;
};
const leftLinks = [
  { to: "/favorite", label: "Избранное" },
  { to: "/cart", label: "Корзина" },
  { to: "/contacts", label: "Контакты" },
];

export function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navcol}>
        {leftLinks.map((link) => (
          <NavItem key={link.to} to={link.to}>
            {link.label}
          </NavItem>
        ))}
      </div>
      <div className={styles.navcol}>
        <NavItem to="/conditions">Условия сервиса</NavItem>
        <LanguagePanel />
      </div>
    </nav>
  );
}

function NavItem({ to, children }: Props) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? `${styles.navlinkactive} ${styles.navlink}` : styles.navlink
      }
    >
      {children}
    </NavLink>
  );
}
