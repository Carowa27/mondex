import { IColorMode } from "./colorInterfaces";
import { IPkmnCard } from "./dataFromApi";
import { ILanguage } from "./ILanguage";
import { IUser, IValuableSavedCard } from "./LSInterface";

//ContainerContext
export interface IContainerContext {
  container: {
    theme: IColorMode;
    user: IUser;
    language: ILanguage;
    mostValuableCard: IValuableSavedCard | undefined;
    lastOpenedCard: IPkmnCard | undefined;
  };
  updateContainer: (
    updatedData:
      | IColorMode
      | IUser
      | ILanguage
      | IValuableSavedCard
      | IPkmnCard,
    whatToUpdate:
      | "theme"
      | "user"
      | "language"
      | "valuableCard"
      | "lastOpenedCard"
  ) => void;
}
