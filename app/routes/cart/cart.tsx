import type { Route } from "./+types/cart";
import cart from "./cart.module.css";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cart" },
    { name: "description", content: "Welcome to Cart!" },
  ];
}

export default function Cart() {
  return <div className={cart.cart}>корзина с продуктами</div>;
}
