import { useState } from "react";
import { useCart } from "@shared/hooks/cart/use-cart";
import styles from "./pay.module.css";
import type { Route } from "./+types/pay";
import { redirect } from "react-router";
import { Receipt } from "@features/receipt/receipt";
import { PaymentCard } from "@features/payment-card/payment-card";
import Main from "@widgets/main/main";
import { useNavigate } from "react-router";
import { Button } from "@shared/button/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Оплата заказа" },
    { name: "description", content: "Оформление и оплата заказа" },
  ];
}

export async function clientLoader() {
  const raw = localStorage.getItem("cart");
  const cart = raw ? JSON.parse(raw) : null;
  const items = cart?.items ?? {};

  if (Object.keys(items).length === 0) {
    return redirect("/cart");
  }
  return null;
}

export default function Pay() {
  const { cartProducts, clearCart } = useCart();
  const navigate = useNavigate();
  const [card, setCard] = useState({
    name: "",
    phone: "",
    number: "",
    expiry: "",
    cvc: "",
  });

  const handleChange = (patch: Partial<typeof card>) =>
    setCard((prev) => ({ ...prev, ...patch }));

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    alert(
      `${Object.values(card).map((requisite) => `\n${requisite} `)}
       ${Object.values(cartProducts.items).map((item) => `\n${item.title} `)}`,
    );
    clearCart();
    navigate("/", { replace: true });
  };

  return (
    <Main title="Оплата заказа">
      <div className={styles.layout}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <PaymentCard value={card} onChange={handleChange} />
          <Button type="submit" className={styles.submit}>
            Оплатить
          </Button>
        </form>

        <div className={styles.summary}>
          <Receipt />
        </div>
      </div>
    </Main>
  );
}
