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

export type ProductsResponse = Record<string, TProduct[]>;

export type ProductsStorage = {
  items: Record<string, TProduct & { amount: number }>;
  totalamount: number;
};