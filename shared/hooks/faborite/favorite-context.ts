import { createContext } from "react";
import type { TProductsStorage, TProduct } from "@shared/models/types";

export type FavoriteContextValue = {
  favoriteProducts: TProductsStorage;
  addToFavorite: (product: TProduct) => void;
  deleteFromFavorite: (id: string) => void;
};

export const FavoriteContext = createContext<FavoriteContextValue | null>(null);
