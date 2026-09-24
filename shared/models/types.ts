export type TBDProducts = {
  id: string;
  title: string;
  href: string;
  current_price: string;
  old_price: string;
  rate: string;
  type: string;
};
export type TProduct = Omit<TBDProducts, "type">;

export type TProductsResponse = Record<string, TProduct[]>;

export type TProductCart = TProduct & { amount: number };

export type TProductCartItems = Record<string, TProductCart>

export type TProductsStorage = {
  items: TProductCartItems;
  totalamount: number;
};
