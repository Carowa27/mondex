import { RouterProvider } from "react-router-dom";
import { Router } from "./Router";
import { ThemeContext, colorModes } from "./globals/theme";
import { useState } from "react";
import { LanguageContext, lang } from "./globals/language/language";
import {
  ILanguageContext,
  IThemeContext,
} from "./interfaces/contextInterfaces";

function App() {
  const [theme, setTheme] = useState<IThemeContext>({
    theme: colorModes.Light,
    changeColorMode: (wantedColorMode: string) => {
      return;
    },
  });
  theme.changeColorMode = (wantedColorMode: string) => {
    let active = colorModes.Light;
    if (wantedColorMode === "light") {
      active = colorModes.Light;
    } else {
      active = colorModes.Dark;
    }
    setTheme({ ...theme, theme: active });
  };
  const [language, setLanguage] = useState<ILanguageContext>({
    language: lang.SE,
    changeLanguage: (wantedLanguage: string) => {
      return;
    },
  });
  language.changeLanguage = (wantedLanguage: string) => {
    let active = lang.SV;
    if (wantedLanguage === "sv") {
      active = lang.SV;
    } else {
      active = lang.EN;
    }
    setLanguage({ ...language, language: active });
  };
  return (
    <>
      <LanguageContext.Provider value={language}>
        <ThemeContext.Provider value={theme}>
          <RouterProvider router={Router}></RouterProvider>
        </ThemeContext.Provider>
      </LanguageContext.Provider>
    </>
  );
}

export default App;
