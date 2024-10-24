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
