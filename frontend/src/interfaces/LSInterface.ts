import { IColorMode } from "./colorInterfaces";
import { IPkmnCard } from "./dataFromApi";
import { ILanguage } from "./ILanguage";

export interface ILSContainer {
  theme: IColorMode;
  user: IUser;
  language: ILanguage;
  mostValuableCard: IValuableSavedCard | undefined;
  lastOpenedCard: IPkmnCard | undefined;
}
export interface IUser {
  username: string;
  collections: ICollection[];
}
export interface ICollection {
  id: number;
  collection_name: string;
  cards_in_collection: ICard[];
  created_date: string;
}
export interface ICard {
  amount: number;
  card: IPkmnCard;
}
export interface IValuableSavedCard {
  card: IPkmnCard;
  savedOn: string;
}
export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}
export enum Lang {
  SV = "sv",
  EN = "en",
}
