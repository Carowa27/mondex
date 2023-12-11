import { ILanguageVariables } from "./ILanguage";

//ThemeContext
export interface IThemeContext {
  theme: IColorMode;
  changeColorMode: (wantedColorMode: string) => void;
}
export interface IColorMode {
  name: string;
  primaryColors: {
    blastoise: string;
    squirtle: string;
    shell: string;
  };
}

//LanguageContext
export interface ILanguageContext {
  language: ILanguage;
  changeLanguage: (wantedLanguage: string) => void;
}
export interface ILanguage {
  lang_code: ILanguageVariables;
  name: string;
}
