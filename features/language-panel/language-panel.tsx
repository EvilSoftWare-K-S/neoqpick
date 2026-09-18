import { useState } from "react";
import languagepanel from "./language-panel.module.css";
type TLanguages = {
  name: string;
  title: string;
  label: string;
};

const LANGUAGES: TLanguages[] = [
  {
    name: "kz",
    title: "Каз",
    label: "Казахский",
  },
  {
    name: "ru",
    title: "Рус",
    label: "Русский",
  },
  {
    name: "en",
    title: "Eng",
    label: "English",
  },
];

export function LanguagePanel() {
  const [language, setLanguage] = useState<string>("ru");
  return (
    <ul className={languagepanel.languagepanel}>
      <div className={languagepanel.languagepanelwrap}>
        <img
          src={"/icons/footer/language.svg"}
          width={18}
          height={18}
          alt="language"
        />
      </div>
      {LANGUAGES.map((lang) => (
        <li key={lang.name} >
          <button
            aria-label={lang.label}
            className={
              lang.name === language
                ? `${languagepanel.languagepanelbutton} ${languagepanel.languagepanelbuttonactive}`
                : languagepanel.languagepanelbutton
            }
            onClick={() => setLanguage(lang.name)}
          >
            <span className={languagepanel.languagepanelbuttonspan}>{lang.title}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
