import { IColorMode } from "./colorInterfaces";
import { IPkmnCard } from "./dataFromApi";
import { ILanguage } from "./ILanguage";
import { ILSContainer, IUser, IValuableSavedCard } from "./LSInterface";

//ContainerContext
export interface IContainerContext {
  container: {
    theme: IColorMode | undefined;
    user: IUser | undefined;
    language: ILanguage | undefined;
    mostValuableCard: IValuableSavedCard | undefined;
    lastOpenedCard: IPkmnCard | undefined;
  };
  updateContainer: (
    updatedData:
      | IColorMode
      | IUser
      | ILanguage
      | IValuableSavedCard
      | IPkmnCard
      | ILSContainer,
    whatToUpdate:
      | "theme"
      | "user"
      | "language"
      | "valuableCard"
      | "lastOpenedCard"
      | "containerObject"
  ) => void;
  clearContainer: () => void;
}
