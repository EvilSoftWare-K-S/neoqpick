import { useState } from "react";
import styles from "./payment-card.module.css";
import {
  formatCardNumber,
  formatCVC,
  formatExpiry,
  formatPhone,
} from "@shared/utils/formatter";
import { Button } from "@shared/button/button";

type TCardData = {
  name: string;
  phone: string;
  number: string;
  expiry: string;
  cvc: string;
};

interface IPaymentCardProps {
  value: TCardData;
  onChange: (patch: Partial<TCardData>) => void;
}

export function PaymentCard({ value, onChange }: IPaymentCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <section className={styles.wrapper}>
      <article className={`${styles.card} ${flipped ? styles.flipped : ""}`}>
        <article className={`${styles.face} ${styles.front}`}>
          <div className={styles.chip} aria-hidden />
          <p className={styles.label}>Владелец</p>
          <input
            id="payment-card-name"
            name="name"
            type="name"
            autoComplete="name"
            required
            className={styles.inputFront}
            placeholder="IVAN IVANOV"
            value={value.name}
            maxLength={26}
            onChange={(e) => onChange({ name: e.target.value.toUpperCase() })}
          />
          <p className={styles.label}>Телефон</p>
          <input
            id="payment-card-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            className={styles.inputFront}
            placeholder="+7 (___) ___-__-__"
            inputMode="tel"
            value={value.phone}
            onChange={(e) => onChange({ phone: formatPhone(e.target.value) })}
          />
          <span className={styles.brand}>QPICK PAY</span>
        </article>

        <article className={`${styles.face} ${styles.back}`}>
          <div className={styles.stripe} />
          <div className={styles.backRow}>
            <label className={styles.backLabel}>
              Номер карты
              <input
                id="payment-card-number"
                name="cardNumber"
                type="text"
                autoComplete="cc-number"
                required
                className={styles.inputBack}
                placeholder="0000 0000 0000 0000"
                inputMode="numeric"
                value={value.number}
                onChange={(e) =>
                  onChange({ number: formatCardNumber(e.target.value) })
                }
              />
            </label>

            <label className={styles.backLabelSmall}>
              Срок
              <input
                id="payment-card-expiry"
                name="cardExpiry"
                type="text"
                autoComplete="cc-exp"
                required
                className={styles.inputBack}
                placeholder="MM/YY"
                inputMode="numeric"
                maxLength={5}
                value={value.expiry}
                onChange={(e) =>
                  onChange({ expiry: formatExpiry(e.target.value) })
                }
              />
            </label>

            <label className={styles.backLabelSmall}>
              CVC
              <input
                id="payment-card-cvc"
                name="cardCvc"
                type="password"
                autoComplete="cc-csc"
                required
                className={styles.inputBack}
                placeholder="•••"
                inputMode="numeric"
                maxLength={3}
                value={value.cvc}
                onChange={(e) => onChange({ cvc: formatCVC(e.target.value) })}
              />
            </label>
          </div>
        </article>
      </article>

      <Button
        type="button"
        className={styles.flipBtn}
        onClick={() => setFlipped((f) => !f)}
        aria-label="Перевернуть карту"
      >
        {flipped ? "← К данным получателя" : "К реквизитам карты →"}
      </Button>
    </section>
  );
}
