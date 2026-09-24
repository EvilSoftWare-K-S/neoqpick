import type { TProductCartItems } from "@shared/models/types";

export function totalSummary(items: TProductCartItems): number {
  return Object.keys(items).reduce(
    (acc, number) =>
      acc + Number(items[number].current_price) * Number(items[number].amount),
    0,
  );
}
