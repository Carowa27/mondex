import { ILanguageVariables } from "./ILanguage";

//ThemeContext
export interface IThemeContext {
  theme: IColorMode;
  changeColorMode: (wantedColorMode: string) => void;
}
export interface IColorType {
  hex: string;
  rgb?: string;
}

export interface IPrimaryColors {
  sunmoon: IColorType;
  text: IColorType;
  link: IColorType;
  background: IColorType;
  border: IColorType;
  cardBackground: IColorType;
}

export interface IColorMode {
  name: string;
  primaryColors: IPrimaryColors;
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
