import badge from "./badge-link.module.css";
import { UiLink } from "@shared/link/ui-link";
interface ICartLinkProps {
  children: React.ReactNode;
  count: number;
  path: string;
}
export function BadgeLink({ children, count, path }: ICartLinkProps) {
  const showBadge = count > 0;
  const badgeText = count > 9 ? "9+" : String(count);

  return (
    <UiLink
      to={path}
      className={badge.link}
      aria-label={showBadge ? `${path}: ${count}` : `${path}`}
    >
      {children}
      {showBadge && <span className={badge.badge}>{badgeText}</span>}
    </UiLink>
  );
}
