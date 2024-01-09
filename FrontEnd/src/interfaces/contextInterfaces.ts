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
  white: IColorType;
  black: IColorType;
  sunmoon: IColorType;
  text: IColorType;
  link: IColorType;
  breadcrumbText: IColorType;
  background: IColorType;
  border: IColorType;
  buttonBackground: IColorType;
}

export interface ITypeColors {
  grass: IColorType;
  fire: IColorType;
  water: IColorType;
  lightning: IColorType;
  psychic: IColorType;
  fighting: IColorType;
  darkness: IColorType;
  metal: IColorType;
  colorless: IColorType;
  dragon: IColorType;
  fairy: IColorType;
}

export interface IColorMode {
  name: string;
  primaryColors: IPrimaryColors;
  typeColors: ITypeColors;
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
