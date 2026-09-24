import { useCart } from "@shared/hooks/use-cart";
import cart from "./cart-list.module.css";
import type { Route } from "./+types/cart-list";
import { CartOrder } from "@entities/cart-order/cart-order";
import { currencyFormatter } from "@shared/utils/currency-formatter";
import { CartSummary } from "@features/cart-summary/cart-summary";
import { totalSummary } from "@shared/utils/total-summary";
import { Button } from "@shared/button/button";
import Main from "@widgets/main/main";
import { CartOrderBottom } from "@features/cart-order-bottom/cart-order-bottom";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cart" },
    { name: "description", content: "Welcome to Cart!" },
  ];
}

export default function CartList() {
  const { cartProducts, deleteFromCart } = useCart();
  const title = "Корзина";
  return (
    <Main title={title}>
      <div className={cart.cart}>
        <article className={cart.cart_wrap}>
          {Object.keys(cartProducts.items).map((type) => {
            return (
              <CartOrder
                key={cartProducts.items[type].id}
                order={cartProducts.items[type]}
                ButtonTopPanel={
                  <Button
                    variant="empty"
                    className={cart.buttonTopPanel__button}
                    onClick={() => deleteFromCart(cartProducts.items[type].id)}
                  >
                    <img
                      className={cart.buttonTopPanel__button__img}
                      src="./icons/cart/trash.svg"
                      alt="trash"
                    />
                  </Button>
                }
                BottomPanel={
                  <CartOrderBottom items={cartProducts.items[type]} />
                }
              />
            );
          })}
        </article>
        <CartSummary
          total={currencyFormatter(totalSummary(cartProducts.items))}
        />
      </div>
    </Main>
  );
}
