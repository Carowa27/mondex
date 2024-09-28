import { IPkmnCard } from "./dataFromApi";

export interface ILSContainer {
  theme: Theme;
  user: IUser;
  lastOpenedCard: IPkmnCard;
  mostValuableCard: IPkmnCard;
  language: Lang;
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
  added_date: string;
}
export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}
export enum Lang {
  SV = "sv",
  EN = "en",
}
