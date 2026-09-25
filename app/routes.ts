import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("./routes/catalog/catalog.tsx"),
  route("cart", "./routes/cart-list/cart-list.tsx"),
  route("favorite", "./routes/favorite-list/favorite-list.tsx"),
  route(":id", "./routes/product/product.tsx"),
  route("pay", "./routes/pay/pay.tsx"),
] satisfies RouteConfig;
