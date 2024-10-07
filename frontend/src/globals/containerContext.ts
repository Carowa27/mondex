import { createContext } from "react";
import {
  ILSContainer,
  IUser,
  IValuableSavedCard,
} from "../interfaces/LSInterface";
import { IContainerContext } from "../interfaces/contextInterfaces";
import { IPkmnCard } from "../interfaces/dataFromApi";
import { lang } from "./language/language";
import { ILanguage } from "../interfaces/ILanguage";
import { colorModes } from "./theme";
import { IColorMode } from "../interfaces/colorInterfaces";

// export const container = {
//   mostValuableCard: undefined,
//   theme: colorModes.Light,
//   user: { username: "", collections: [] },
//   lastOpenedCard: undefined,
//   language: "EN",
// };

export const ContainerContext = createContext<IContainerContext>({
  container: {
    mostValuableCard: undefined,
    theme: undefined,
    user: undefined,
    lastOpenedCard: undefined,
    language: undefined,
  },
  updateContainer: (
    //@ts-expect-error type definition
    updatedData:
      | IColorMode
      | IUser
      | ILanguage
      | IValuableSavedCard
      | IPkmnCard
      | ILSContainer,
    //@ts-expect-error type definition
    whatToUpdate:
      | "theme"
      | "user"
      | "language"
      | "valuableCard"
      | "lastOpenedCard"
      | "containerObject"
  ) => {
    return;
  },
});
