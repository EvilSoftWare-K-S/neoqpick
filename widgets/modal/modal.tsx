import { useCallback, useEffect, useRef, type ReactNode } from "react";
import styles from "./Modal.module.css";
import { useLockBodyScroll } from "./use-lock-body-scroll";
import { ModalPortal } from "./modal-portal";
import { Button } from "@shared/button/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(isOpen);

  // Escape
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  // Автофокус на модалке при открытии
  useEffect(() => {
    if (!isOpen) return;
    const t = window.setTimeout(() => modalRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [isOpen]);

  const handleOverlayMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!closeOnOverlayClick) return;
      if (e.target === e.currentTarget) onClose();
    },
    [closeOnOverlayClick, onClose],
  );

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div
        className={styles.overlay}
        onMouseDown={handleOverlayMouseDown}
        role="presentation"
      >
        <div
          ref={modalRef}
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          tabIndex={-1}
        >
          <div className={styles.header}>
            {title ? <h2 className={styles.title}>{title}</h2> : <span />}
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Закрыть"
            >
              <CloseIcon />
            </button>
          </div>

          <div className={styles.content}>{children}</div>

          {footer && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>
    </ModalPortal>
  );
}

/* Иконка крестика — inline SVG, без внешних зависимостей */
function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

type ExpandButtonProps = {
  onOpen: () => void;
  title: string;
};

export function ExpandButton({ onOpen, title }: ExpandButtonProps) {
  return (
    <Button
      variant="icon"
      type="button"
      onClick={onOpen}
      aria-label={`открыть модальное окно с дополнительной информацией о ${title}`}
      style={{ width: 20, height: 20, backgroundColor: "white" }}
    >
      <img width={24} height={24} src="./icons/modal/expand.svg" alt="expand" />
    </Button>
  );
}
