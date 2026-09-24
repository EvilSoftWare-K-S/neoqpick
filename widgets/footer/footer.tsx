import styles from "./footer.module.css";
import { SocialLinks } from "@shared/social-links/social-links";
import { Logo } from "@features/logo/logo";
import { Nav } from "@features/footer-nav/footer-nav";
export function Footer(): React.JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <Nav />
      <div className={styles.sociallink}>
        <SocialLinks />
      </div>
    </footer>
  );
}
