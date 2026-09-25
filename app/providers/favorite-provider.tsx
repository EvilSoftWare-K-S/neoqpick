import type { TProductsStorage, TProduct } from "@shared/models/types";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { FavoriteContext } from "@shared/hooks/faborite/favorite-context";

const FAVORITE_KEY = "favorite";

const EMPTY_CART: TProductsStorage = {
  items: {},
  totalamount: 0,
};

function readCart(): TProductsStorage {
  try {
    const raw = localStorage.getItem(FAVORITE_KEY);
    if (!raw) {
      return EMPTY_CART;
    }
    const parsed = JSON.parse(raw) as Partial<TProductsStorage>;
    return {
      items: parsed.items ?? {},
      totalamount: parsed.totalamount ?? 0,
    };
  } catch {
    return EMPTY_CART;
  }
}

function recalcTotal(items: TProductsStorage["items"]): TProductsStorage {
  const total = Object.values(items).reduce(
    (sum, item) => sum + item.amount,
    0,
  );

  return {
    items,
    totalamount: total,
  };
}

export function FavoriteProvider({ children }: { children: ReactNode }) {
  const [favoriteProducts, setFavoriteProducts] =
    useState<TProductsStorage>(EMPTY_CART);

  const [isInitialized, setIsInitialized] = useState(false);

  // Загружаем корзину только после hydration
  useEffect(() => {
    setFavoriteProducts(readCart());
    setIsInitialized(true);
  }, []);

  // Сохраняем только после загрузки существующей корзины
  useEffect(() => {
    if (!isInitialized) {
      return;
    }
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(favoriteProducts));
  }, [favoriteProducts, isInitialized]);

  const addToFavorite = useCallback((product: TProduct) => {
    setFavoriteProducts((prev) => {
      const existing = prev.items[product.id];

      if (existing) {
        return prev;
      }

      const nextItems = {
        ...prev.items,
        [product.id]: {
          ...product,
          amount: 1,
        },
      };

      return recalcTotal(nextItems);
    });
  }, []);

  const deleteFromFavorite = useCallback((id: string) => {
    setFavoriteProducts((prev) => {
      if (!prev.items[id]) {
        return prev;
      }
      const { [id]: _, ...rest } = prev.items;
      return recalcTotal(rest);
    });
  }, []);

  return (
    <FavoriteContext.Provider
      value={{
        favoriteProducts,
        addToFavorite,
        deleteFromFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
