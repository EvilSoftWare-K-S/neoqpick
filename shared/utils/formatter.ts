export function currencyFormatter(value: number) {
  const currencyFormatter = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  });
  return currencyFormatter.format(value);
}

export const formatCardNumber = (v: string) =>
  v
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();

export const formatPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  const p = d.startsWith("8") ? "7" + d.slice(1) : d;
  if (!p) return "";
  const a = p.slice(0, 1);
  const b = p.slice(1, 4);
  const c = p.slice(4, 7);
  const e = p.slice(7, 9);
  const f = p.slice(9, 11);
  return `+${a}${b ? ` (${b}` : ""}${c ? `) ${c}` : ""}${e ? `-${e}` : ""}${
    f ? `-${f}` : ""
  }`;
};

export const formatExpiry = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

export const formatCVC = (v: string) => { 
  return v.replace(/\D/g, "");
};