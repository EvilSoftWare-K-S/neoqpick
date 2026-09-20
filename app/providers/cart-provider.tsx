import type { ProductsStorage, TProduct } from "@shared/models/types";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { CartContext } from "@shared/hooks/cart-context";

const CART_KEY = "cart";

const EMPTY_CART: ProductsStorage = {
  items: {},
  totalamount: 0,
};

function readCart(): ProductsStorage {
  if (typeof window === "undefined") {
    return EMPTY_CART;
  }

  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) {
      return EMPTY_CART;
    }
    const parsed = JSON.parse(raw) as Partial<ProductsStorage>;
    return {
      items: parsed.items ?? {},
      totalamount: parsed.totalamount ?? 0,
    };
  } catch {
    return EMPTY_CART;
  }
}

function recalcTotal(items: ProductsStorage["items"]): ProductsStorage {
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
  const [cartProducts, setCartProducts] = useState<ProductsStorage>(readCart);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartProducts));
  }, [cartProducts]);

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
  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
