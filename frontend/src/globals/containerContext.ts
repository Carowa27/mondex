import { createContext } from "react";
import { IValuableSavedCard, Lang, Theme } from "../interfaces/LSInterface";
import { IContainerContext } from "../interfaces/contextInterfaces";
import { IPkmnCard } from "../interfaces/dataFromApi";

export const container = {
  mostValuableCard: undefined,
  theme: Theme.LIGHT,
  user: { username: "", collections: [] },
  lastOpenedCard: undefined,
  language: Lang.EN,
};

export const ContainerContext = createContext<IContainerContext>({
  mostValuableCard: undefined,
  theme: Theme.LIGHT,
  user: { username: "", collections: [] },
  lastOpenedCard: undefined,
  language: Lang.EN,
  updateContainer: (
    //@ts-expect-error type definition
    updatedData:
      | Theme
      | { username: ""; collections: [] }
      | Lang
      | IValuableSavedCard
      | IPkmnCard,
    //@ts-expect-error type definition
    whatToUpdate:
      | "theme"
      | "user"
      | "language"
      | "valuableCard"
      | "lastOpenedCard"
  ) => {
    return;
  },
});
