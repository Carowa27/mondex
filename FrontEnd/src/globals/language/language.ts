import { SE, EN } from "../../interfaces/ILanguage";
import { createContext } from "react";
import { ILanguageContext } from "../../interfaces/contextInterfaces";

export const lang = {
  SE: {
    lang_code: SE,
    name: "Svenska",
  },
  EN: {
    lang_code: EN,
    name: "English",
  },
};

export const LanguageContext = createContext<ILanguageContext>({
  language: lang.SE,
  changeLanguage: (wantedLanguage: string) => {
    return;
  },
});
