import styles from "./social-links.module.css";
import { UiLink } from "@shared/link/ui-link";
type TSocial = {
  name: string;
  href: string;
  icon: string;
  label: string;
};

const SOCIALS: TSocial[] = [
  {
    name: "vk",
    href: "https://vk.com/QPICK",
    icon: "/icons/social/vk.svg",
    label: "ВКонтакте",
  },
  {
    name: "telegram",
    href: "https://t.me/QPICK",
    icon: "/icons/social/telegram.svg",
    label: "Telegram",
  },
  {
    name: "whatsapp",
    href: "https://wa.me/79999999999",
    icon: "/icons/social/whatsapp.svg",
    label: "WhatsApp",
  },
];

export function SocialLinks() {
  return (
    <ul className={styles.socialLinks}>
      {SOCIALS.map((social) => (
        <li key={social.name}>
          <UiLink
            to={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className={styles.socialLinks__link}
          >
            <img src={social.icon} alt={social.name} width={30} height={30} />
          </UiLink>
        </li>
      ))}
    </ul>
  );
}
