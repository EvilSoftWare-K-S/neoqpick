import {
  type RouteConfig,
  route,
  index,
} from "@react-router/dev/routes";

export default [
  index("./routes/home/home.tsx"),
  route("cart", "routes/cart/cart.tsx"),
] satisfies RouteConfig;
