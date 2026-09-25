import type { TProduct } from "@shared/models/types";
import style from "./catalog-item.module.css";
import { useCart } from "@shared/hooks/cart/use-cart";
import { Button } from "@shared/button/button";
import { UiLink } from "@shared/link/ui-link";
export function CatalogItem({
  product,
  buttonExpand,
}: {
  product: TProduct;
  buttonExpand?: React.ReactNode;
}) {
  const { addToCart } = useCart();
  return (
    <article className={style.product}>
      {buttonExpand != null && (
        <div className={style.product__expand}>{buttonExpand}</div>
      )}
      <UiLink
        variant="secondary"
        to={`/${product.id}`}
        aria-label={`Click to go to ${product.title}${product.id}`}
        className={style.product__link}
      >
        <div className={`${style.product__imageWrap}`}>
          <img
            className={style.product__image}
            src={product.href}
            alt={product.title}
          />
        </div>
      </UiLink>
      <section className={style.product__panel}>
        <h3 className={style.product__title}>{product.title}</h3>
        <p className={style.product__priceWrap}>
          <span className={style.product__price}>
            {product.current_price} ₽
          </span>
          {product.old_price && (
            <s className={style.product__oldPrice}>{product.old_price} ₽</s>
          )}
        </p>

        <p className={style.product__rateWrap}>
          <img src="./icons/catalog/rate.svg" alt="rate" />
          <span className={style.product__rateText}>{product.rate}</span>
        </p>
        <Button
          variant="empty"
          type="button"
          onClick={() => addToCart(product)}
          className={style.product__button}
          aria-label={`Добавить ${product.title} в корзину`}
        >
          <span>Купить</span>
        </Button>
      </section>
    </article>
  );
}
