import { isValidElement } from "react";
import styles from "./main.module.css";

export default function Main({
  children,
  title,
}: {
  children: React.ReactNode;
  title: React.ReactNode | string | null;
}) {
  return (
    <main className={styles.main}>
      <section className={styles.main__section}>
        {title != null &&
          (isValidElement(title) ? (
            title
          ) : (
            <h1 className={styles.main__section__title}>{title}</h1>
          ))}
        {children}
      </section>
    </main>
  );
}
