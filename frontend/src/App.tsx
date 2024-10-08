import { RouterProvider } from "react-router-dom";
import { Router } from "./Router";
import { colorModes } from "./globals/theme";
import { useState } from "react";
import { lang } from "./globals/language/language";
import { IContainerContext } from "./interfaces/contextInterfaces";
import {
  ILSContainer,
  IUser,
  IValuableSavedCard,
} from "./interfaces/LSInterface";
import { IPkmnCard } from "./interfaces/dataFromApi";
import { ContainerContext } from "./globals/containerContext";
import { ILanguage } from "./interfaces/ILanguage";
import { IColorMode } from "./interfaces/colorInterfaces";
import { getMondexLs, updateMondexLs } from "./functions/LSFunctions";

const value: ILSContainer = getMondexLs();
function App() {
  const [container, setContainer] = useState<IContainerContext>({
    container: {
      mostValuableCard:
        value && value.mostValuableCard ? value.mostValuableCard : undefined,
      theme: value && value.theme ? value.theme : colorModes.Light,
      user: value && value.user ? value.user : undefined,
      lastOpenedCard:
        value && value.lastOpenedCard ? value.lastOpenedCard : undefined,
      language: value && value.language ? value.language : lang.EN,
    },
    //@ts-expect-error type definition
    updateContainer: (updatedData: ILSContainer) => {
      return;
    },
  });
  container.updateContainer = (
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
  ) => {
    whatToUpdate === "theme" &&
      setContainer((prevState) => ({
        ...prevState,
        container: { ...prevState.container, theme: updatedData as IColorMode },
      }));
    whatToUpdate === "user" &&
      setContainer((prevState) => ({
        ...prevState,
        container: { ...prevState.container, user: updatedData as IUser },
      }));
    whatToUpdate === "language" &&
      setContainer((prevState) => ({
        ...prevState,
        container: {
          ...prevState.container,
          language: updatedData as ILanguage,
        },
      }));
    whatToUpdate === "valuableCard" &&
      setContainer((prevState) => ({
        ...prevState,
        container: {
          ...prevState.container,
          mostValuableCard: updatedData as IValuableSavedCard,
        },
      }));
    whatToUpdate === "lastOpenedCard" &&
      setContainer((prevState) => ({
        ...prevState,
        container: {
          ...prevState.container,
          lastOpenedCard: updatedData as IPkmnCard,
        },
      }));
    whatToUpdate === "containerObject" &&
      setContainer((prevState) => ({
        ...prevState,
        ...(updatedData as ILSContainer),
      }));
  };
  updateMondexLs(container.container);
  return (
    <>
      <ContainerContext.Provider value={container}>
        <RouterProvider router={Router}></RouterProvider>
      </ContainerContext.Provider>
    </>
  );
}

export default App;
