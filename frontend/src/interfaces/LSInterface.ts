import { IColorMode } from "./colorInterfaces";
import { IPkmnCard, IPkmnSet } from "./dataFromApi";
import { ILanguage } from "./ILanguage";

export interface ILSContainer {
  theme: IColorMode | undefined;
  user: IUser | undefined;
  language: ILanguage | undefined;
  mostValuableCard: IValuableSavedCard | undefined;
  lastOpenedCard: IPkmnCard | undefined;
}
export interface IUser {
  username: string;
  collections: ICollection[] | [];
}
export interface ICollection {
  id: string;
  collection_name: string;
  set?: IPkmnSet;
  artist?: string;
  character?: string;
  cards_in_collection: ICard[] | [];
  created_date: string;
}
export interface ICard {
  amount: number;
  card: IPkmnCard;
}
export interface IValuableSavedCard {
  cards: IPkmnCard[];
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
