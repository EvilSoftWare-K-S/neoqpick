import { createContext } from "react";
import type { ProductsStorage, TProduct } from "@shared/models/types";

export type CartContextValue = {
  cartProducts: ProductsStorage;
  addToCart: (product: TProduct) => void;
};

export const CartContext = createContext<CartContextValue | null>(null);
