export function currencyFormatter(value: number) {
  const currencyFormatter = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  });
  return currencyFormatter.format(value);
}
