export type TLanguage = "kz" | "ru" | "en";

export type TLanguageMeta = {
  name: TLanguage;
  title: string;
  label: string;
};

export const LANGUAGES: readonly TLanguageMeta[] = [
  { name: "kz", title: "Каз", label: "Казахский" },
  { name: "ru", title: "Рус", label: "Русский" },
  { name: "en", title: "Eng", label: "English" },
] as const;

export const DEFAULT_LANGUAGE: TLanguage = "ru";
