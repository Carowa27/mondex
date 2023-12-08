import { SE, EN } from "../../interfaces/ILanguage";
import { createContext } from "react";
import { ILanguageContext } from "../../interfaces/contextInterfaces";

export const lang = {
  SE: {
    locale: SE,
    name: "Svenska",
  },
  EN: {
    locale: EN,
    name: "English",
  },
};

export const LanguageContext = createContext<ILanguageContext>({
  language: lang.SE,
  changeLanguage: (wantedLanguage: string) => {
    return;
  },
});
