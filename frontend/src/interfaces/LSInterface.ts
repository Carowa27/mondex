import { IPkmnCard } from "./dataFromApi";

export interface ILSContainer {
  theme: Theme;
  user: IUser;
  language: Lang;
  mostValuableCard: IValuableSavedCard | undefined;
  lastOpenedCard: IPkmnCard | undefined;
}
interface IUser {
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
