import { IPkmnCard } from "./dataFromApi";
import { ILanguage } from "./ILanguage";
import { ICollection, IValuableSavedCard, Theme } from "./LSInterface";
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

//ContainerContext
export interface IContainerContext {
  container: {
    theme: Theme;
    user: { username: string; collections: ICollection[] };
    language: ILanguage;
    mostValuableCard: IValuableSavedCard | undefined;
    lastOpenedCard: IPkmnCard | undefined;
  };
  updateContainer: (
    updatedData:
      | Theme
      | { username: ""; collections: [] }
      | ILanguage
      | IValuableSavedCard
      | IPkmnCard,
    whatToUpdate:
      | "theme"
      | "user"
      | "language"
      | "valuableCard"
      | "lastOpenedCard"
  ) => void;
}
