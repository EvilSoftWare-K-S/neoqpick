import type { TProduct } from "@shared/models/types";
import { Link } from "react-router";
import style from "./product.module.css";
import { useCart } from "@shared/hooks/use-cart";
export function Product({ product }: { product: TProduct }) {
  const { addToCart } = useCart();
  return (
    <article
      key={product.id}
      className={style.catalog_section_wraparticle_wrap_link_card}
    >
      <div className={`${style.card_wrapimg}`}>
        <img
          className={style.card_wrapimg_img}
          src={product.href}
          alt={product.title}
        />
      </div>

      <div className={style.card_panel}>
        <Link to={`/catalog/${product.id}`} className={style.card_panel_link}>
          <h3 className={style.card_panel_title}>{product.title}</h3>
        </Link>
        <div className={style.card_panel_wrapprice}>
          <span className={style.card_panel_wrapprice_curprice}>
            {product.current_price} ₽
          </span>
          {product.old_price && (
            <span className={style.card_panel_wrapprice_oldprice}>
              {product.old_price} ₽
            </span>
          )}
        </div>

        <div className={style.card_panel_wraprate}>
          <img
            className={style.card_panel_wraprate_img}
            src="./icons/catalog/rate.svg"
            alt="rate"
          />
          <span className={style.card_panel_wraprate_text}>{product.rate}</span>
        </div>
        <button
          onClick={() => addToCart(product)}
          className={style.card_panel_button}
        >
          Купить
        </button>
      </div>
    </article>
  );
}
 