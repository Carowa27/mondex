import { IPkmnCard } from "./dataFromApi";

export interface ILSContainer {
  // ADD: should include:
  // theme,
  theme: Theme;
  // ADD: user with collections,
  user: IUser;
  // lastOpenedCard,
  lastOpenedCard: IPkmnCard;
  // mostValuableCard
  mostValuableCard: IPkmnCard;
  // langVariable
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
