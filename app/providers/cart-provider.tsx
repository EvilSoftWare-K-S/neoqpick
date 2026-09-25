import type { TProductsStorage, TProduct } from "@shared/models/types";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { CartContext } from "@shared/hooks/cart/cart-context";

const CART_KEY = "cart";

const EMPTY_CART: TProductsStorage = {
  items: {},
  totalamount: 0,
};

function readCart(): TProductsStorage {
  try {
    const raw = localStorage.getItem(CART_KEY);
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

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartProducts, setCartProducts] =
    useState<TProductsStorage>(EMPTY_CART);

  const [isInitialized, setIsInitialized] = useState(false);

  // Загружаем корзину только после hydration
  useEffect(() => {
    setCartProducts(readCart());
    setIsInitialized(true);
  }, []);

  // Сохраняем только после загрузки существующей корзины
  useEffect(() => {
    if (!isInitialized) {
      return;
    }
    localStorage.setItem(CART_KEY, JSON.stringify(cartProducts));
  }, [cartProducts, isInitialized]);

  const addToCart = useCallback((product: TProduct) => {
    setCartProducts((prev) => {
      const existing = prev.items[product.id];
      const nextItems = {
        ...prev.items,
        [product.id]: existing
          ? {
              ...existing,
              amount: existing.amount + 1,
            }
          : {
              ...product,
              amount: 1,
            },
      };

      return recalcTotal(nextItems);
    });
  }, []);

  const plusProductCart = useCallback((id: string) => {
    setCartProducts((prev) => {
      const existing = prev.items[id];

      if (!existing) {
        return prev;
      }

      return recalcTotal({
        ...prev.items,
        [id]: {
          ...existing,
          amount: existing.amount + 1,
        },
      });
    });
  }, []);

  const minusProductCart = useCallback((id: string) => {
    setCartProducts((prev) => {
      const existing = prev.items[id];

      if (!existing) {
        return prev;
      }

      if (existing.amount <= 1) {
        const { [id]: _, ...rest } = prev.items;

        return recalcTotal(rest);
      }

      return recalcTotal({
        ...prev.items,
        [id]: {
          ...existing,
          amount: existing.amount - 1,
        },
      });
    });
  }, []);

  const deleteFromCart = useCallback((id: string) => {
    setCartProducts((prev) => {
      if (!prev.items[id]) {
        return prev;
      }
      const { [id]: _, ...rest } = prev.items;
      return recalcTotal(rest);
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartProducts(EMPTY_CART);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addToCart,
        plusProductCart,
        minusProductCart,
        deleteFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
