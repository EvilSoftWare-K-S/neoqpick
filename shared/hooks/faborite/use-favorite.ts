import { useContext } from "react";
import { FavoriteContext } from "./favorite-context";

export function useFavorite() {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error("useFavorite must be used inside FavoriteProvider");
  }

  return context;
}
