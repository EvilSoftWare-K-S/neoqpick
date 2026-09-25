import type { TLanguage } from "./types";

export const dictionaries = {
  ru: {
    "wireless_headphones": "Беспроводные наушники",
    "headphones": "Наушники",
  },
  kz: {
    "wireless_headphones": "Сымсыз құлаққаптар",
    "headphones": "Құлаққап",
  },
  en: {
    "wireless_headphones": "Wireless headphones",
    "headphones": "Headphones",
  },
} as const satisfies Record<TLanguage, Record<string, string>>;

export type TTranslationKey = keyof (typeof dictionaries)["ru"];

