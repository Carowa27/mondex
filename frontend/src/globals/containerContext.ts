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
import { getMondexLs } from "../functions/LSFunctions";

// export const container = {
//   mostValuableCard: undefined,
//   theme: colorModes.Light,
//   user: { username: "", collections: [] },
//   lastOpenedCard: undefined,
//   language: "EN",
// };
const value: ILSContainer = getMondexLs();
console.log("contextvalue", value);

export const ContainerContext = createContext<IContainerContext>({
  container: {
    mostValuableCard:
      value && value.mostValuableCard !== undefined
        ? value.mostValuableCard
        : undefined,
    theme: value && value.theme !== undefined ? value.theme : colorModes.Light,
    user: value && value.user !== undefined ? value.user : undefined,
    lastOpenedCard:
      value && value.lastOpenedCard !== undefined
        ? value.lastOpenedCard
        : undefined,
    language: value && value.language !== undefined ? value.language : lang.EN,
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
