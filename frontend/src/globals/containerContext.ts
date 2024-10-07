import { createContext } from "react";
import { IUser, IValuableSavedCard, Theme } from "../interfaces/LSInterface";
import { IContainerContext } from "../interfaces/contextInterfaces";
import { IPkmnCard } from "../interfaces/dataFromApi";
import { lang } from "./language/language";

export const container = {
  mostValuableCard: undefined,
  theme: Theme.LIGHT,
  user: { username: "", collections: [] },
  lastOpenedCard: undefined,
  language: "EN",
};

export const ContainerContext = createContext<IContainerContext>({
  container: {
    mostValuableCard: undefined,
    theme: Theme.LIGHT,
    user: { username: "", collections: [] },
    lastOpenedCard: undefined,
    language: lang.EN,
  },
  updateContainer: (
    //@ts-expect-error type definition
    updatedData: Theme | IUser | ILanguage | IValuableSavedCard | IPkmnCard,
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
