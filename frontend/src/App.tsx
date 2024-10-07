import { RouterProvider } from "react-router-dom";
import { Router } from "./Router";
import { ThemeContext, colorModes } from "./globals/theme";
import { useState } from "react";
import { lang } from "./globals/language/language";
import {
  IColorMode,
  IContainerContext,
  IThemeContext,
} from "./interfaces/contextInterfaces";
import {
  ILSContainer,
  IUser,
  IValuableSavedCard,
} from "./interfaces/LSInterface";
import { IPkmnCard } from "./interfaces/dataFromApi";
import { ContainerContext } from "./globals/containerContext";
import { ILanguage } from "./interfaces/ILanguage";

function App() {
  const [theme, setTheme] = useState<IThemeContext>({
    theme: colorModes.Light,
    //@ts-expect-error type definition
    changeColorMode: (wantedColorMode: string) => {
      return;
    },
  });
  theme.changeColorMode = (wantedColorMode: string) => {
    let active: IColorMode = colorModes.Light;
    if (wantedColorMode === "light") {
      active = colorModes.Light;
    } else {
      active = colorModes.Dark;
    }
    setTheme({ ...theme, theme: active });
  };
  const [container, setContainer] = useState<IContainerContext>({
    container: {
      mostValuableCard: undefined,
      theme: colorModes.Light,
      user: { username: "", collections: [] },
      lastOpenedCard: undefined,
      language: lang.EN,
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
      | IPkmnCard,
    whatToUpdate:
      | "theme"
      | "user"
      | "language"
      | "valuableCard"
      | "lastOpenedCard"
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
  };
  return (
    <>
      <ContainerContext.Provider value={container}>
        <ThemeContext.Provider value={theme}>
          <RouterProvider router={Router}></RouterProvider>
        </ThemeContext.Provider>
      </ContainerContext.Provider>
    </>
  );
}

export default App;
