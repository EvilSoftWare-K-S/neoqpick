import {
  dictionaries,
  type TTranslationKey,
} from "@shared/dictionaries/dictionaries";
import { DEFAULT_LANGUAGE, type TLanguage } from "@shared/dictionaries/types";

export function getTranslation(
  key: TTranslationKey,
  lang: TLanguage = DEFAULT_LANGUAGE,
): string {
  return dictionaries[lang][key] ?? dictionaries[DEFAULT_LANGUAGE][key] ?? key;
}
