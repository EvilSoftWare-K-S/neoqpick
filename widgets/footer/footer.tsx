import { Link, NavLink } from "react-router";
import styles from "./footer.module.css";
import header from "@widgets/header/header.module.css";
import { SocialLinks } from "@shared/social-links/social-links";
import { LanguagePanel } from "@features/language-panel/language-panel";
export function Footer(): React.JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
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
      </div>
      {/* вынести в компонент и передать объект для мепа */}
      <nav className={styles.nav}>
        <div className={styles.navcol}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${styles.navlinkactive} ${styles.navlink}`
                : styles.navlink
            }
            to={"/favorite"}
          >
            Избранное
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${styles.navlinkactive} ${styles.navlink}`
                : styles.navlink
            }
            to={"/cart"}
          >
            Корзина
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${styles.navlinkactive} ${styles.navlink}`
                : styles.navlink
            }
            to={"/contacts"}
          >
            Контакты
          </NavLink>
        </div>
        <div className={styles.navcol}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${styles.navlinkactive} ${styles.navlink}`
                : styles.navlink
            }
            to={"/conditions"}
          >
            Условия сервиса
          </NavLink>
          <LanguagePanel />
        </div>
      </nav>
      {/* вынести в компонент и передать объект для мепа */}
      <div className={styles.sociallink}>
        <SocialLinks />
      </div>
    </footer>
  );
}
