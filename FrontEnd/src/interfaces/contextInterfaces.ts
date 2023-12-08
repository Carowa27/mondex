import { ILanguageVariables } from "./ILanguage";

//ThemeContext
export interface IThemeContext {
  theme: IColorMode;
  changeColorMode: (wantedColorMode: string) => void;
}
export interface IColorMode {
  primaryColors: {
    blastoise: string;
    squirtle: string;
    lt_squirtle: string;
    dk_squirtle: string;
    shell: string;
  };
}

//LanguageContext
export interface ILanguageContext {
  language: ILanguage;
  changeLanguage: (wantedLanguage: string) => void;
}
export interface ILanguage {
  locale: ILanguageVariables;
  name: string;
}
