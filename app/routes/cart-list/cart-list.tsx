import { useCart } from "@shared/hooks/use-cart";
import cart from "./cart-list.module.css";
import { Product } from "@entities/product/product";
import type { Route } from "./+types/cart-list";
import { CartOrder } from "@entities/cart-order/cart-order";
import { currencyFormatter } from "@shared/utils/currency-formatter";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cart" },
    { name: "description", content: "Welcome to Cart!" },
  ];
}

export default function CartList() {
  const {
    cartProducts,
    plusProductCart,
    minusProductCart,
    deleteFromCart,
    clearCart,
  } = useCart();
  const title = "Корзина";
  return (
    <main>
      <section className={cart.catalog_section}>
        {title && <h1 className={cart.catalog_section_title}>{title}</h1>}
        <div className={cart.cart}>
          <article className={cart.cart_wrap}>
            {Object.keys(cartProducts.items).map((type) => {
              return (
                <CartOrder
                  key={cartProducts.items[type].id}
                  order={cartProducts.items[type]}
                  ButtonTopPanel={
                    <button
                      className={cart.buttontoppanel_wrap_button}
                      onClick={() =>
                        deleteFromCart(cartProducts.items[type].id)
                      }
                    >
                      <img
                        className={cart.buttontoppanel_wrap_button_img}
                        src="./icons/cart/trash.svg"
                        alt="trash"
                      />
                    </button>
                  }
                  BottomPanel={
                    <div className={cart.bottompanel}>
                      <div className={cart.bottompanel_wrap}>
                        <button
                          className={cart.bottompanel_wrap_button}
                          onClick={() =>
                            minusProductCart(cartProducts.items[type].id)
                          }
                        >
                          <img src="./icons/cart/minus.svg" alt="minus" />
                        </button>
                        <span className={cart.bottompanel_wrap_amount}>
                          {cartProducts.items[type].amount}
                        </span>
                        <button
                          className={cart.bottompanel_wrap_button}
                          onClick={() =>
                            plusProductCart(cartProducts.items[type].id)
                          }
                        >
                          <img src="./icons/cart/plus.svg" alt="plus" />
                        </button>
                      </div>
                      <span className={cart.bottompanel_totalcurrency}>
                        {currencyFormatter(
                          Number(cartProducts.items[type].amount) *
                            Number(cartProducts.items[type].current_price),
                        )}
                      </span>
                    </div>
                  }
                />
              );
            })}
          </article>
          {/* вынести в фичу */}
          <aside className={cart.aside}>
            <div className={cart.aside_wrap}>
              <span className={cart.aside_wrap_title}>ИТОГО</span>
              <span className={cart.aside_wrap_total}>
                {currencyFormatter(
                  Object.keys(cartProducts.items).reduce(
                    (acc, number) =>
                      acc +
                      Number(cartProducts.items[number].current_price) *
                        Number(cartProducts.items[number].amount),
                    0,
                  ),
                )}
              </span>
            </div>
            <button className={cart.aside_button} onClick={clearCart}>
              Перейти к оформлению
            </button>
          </aside>
          {/* вынести в фичу */}
        </div>
      </section>
    </main>
  );
}
