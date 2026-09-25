import { createContext } from "react";
import type { TProductsStorage, TProduct } from "@shared/models/types";

export type CartContextValue = {
  cartProducts: TProductsStorage;
  addToCart: (product: TProduct) => void;
  plusProductCart: (id: string) => void;
  minusProductCart: (id: string) => void;
  deleteFromCart: (id: string) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextValue | null>(null);
