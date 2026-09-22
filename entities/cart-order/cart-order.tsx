import type { TProductCart } from "@shared/models/types";
import cart_order from "./cart-order.module.css";
import { currencyFormatter } from "@shared/utils/currency-formatter";
export function CartOrder({
  order,
  ButtonTopPanel,
  BottomPanel,
}: {
  order: TProductCart;
  ButtonTopPanel?: React.JSX.Element;
  BottomPanel?: React.JSX.Element;
}) {
  return (
    <article className={cart_order.cartorder}>
      {/* <div className={cart_order.cartorder_wrap}> */}
      <div className={cart_order.cartorder_wrapinfo}>
        <div className={cart_order.cartorder_wrapinfo_wrapimg}>
          <img
            className={cart_order.cartorder_wrapinfo_wrapimg_img}
            src={order.href}
            alt={order.title}
          />
        </div>
        <div className={cart_order.cartorder_wrapinfo_info}>
          <span className={cart_order.cartorder_wrapinfo_info_title}>
            {order.title}
          </span>
          <span className={cart_order.cartorder_wrapinfo_info_price}>
            {currencyFormatter(Number(order.current_price))}
          </span>
        </div>
        {ButtonTopPanel ? ButtonTopPanel : null}
      </div>
      {BottomPanel ? BottomPanel : null}
      {/* </div> */}
    </article>
  );
}
