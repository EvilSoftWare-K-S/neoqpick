import style from "./favorite-list.module.css";
import { CartOrder } from "@entities/cart-order/cart-order";
import { Button } from "@shared/button/button";
import Main from "@widgets/main/main";
import { useFavorite } from "@shared/hooks/faborite/use-favorite";
import { useCart } from "@shared/hooks/cart/use-cart";
import type { Route } from "./+types/favorite-list";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Favorite" },
    { name: "description", content: "Welcome to Favorite!" },
  ];
}

export default function FavoriteList() {
  const { favoriteProducts, deleteFromFavorite } = useFavorite();
  const { addToCart } = useCart();
  const title = "Понравилось";
  return (
    <Main title={title}>
      <div className={style.favorite}>
        <article className={style.favorite__wrap}>
          {Object.keys(favoriteProducts.items).map((type) => {
            return (
              <CartOrder
                key={favoriteProducts.items[type].id}
                order={favoriteProducts.items[type]}
                ButtonTopPanel={
                  <Button
                    variant="empty"
                    className={style.buttonTopPanel__button}
                    onClick={() =>
                      deleteFromFavorite(favoriteProducts.items[type].id)
                    }
                  >
                    <img
                      className={style.buttonTopPanel__button__img}
                      src="./icons/cart/trash.svg"
                      alt="trash"
                    />
                  </Button>
                }
                BottomPanel={
                  <Button
                    variant="empty"
                    onClick={() => addToCart(favoriteProducts.items[type])}
                  >
                    Добавить в корзину
                  </Button>
                }
              />
            );
          })}
        </article>
      </div>
    </Main>
  );
}
