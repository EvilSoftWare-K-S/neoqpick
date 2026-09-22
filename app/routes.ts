import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("./routes/catalog/catalog.tsx"),
  route("cart", "./routes/cart-list/cart-list.tsx"),
] satisfies RouteConfig;
