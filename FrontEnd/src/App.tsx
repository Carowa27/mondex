import { RouterProvider } from "react-router-dom";
import { Router } from "./Router";
import { ThemeContext, colorModes } from "./globals/theme";
import { useState } from "react";
import { LanguageContext, lang } from "./globals/language/language";
import {
  ILanguageContext,
  IThemeContext,
} from "./interfaces/contextInterfaces";
//import { useAuth0 } from "@auth0/auth0-react";

function App() {
  //const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  // const [bearerToken, setBearerToken] = useState("");
  const [theme, setTheme] = useState<IThemeContext>({
    theme: colorModes.Light,
    //@ts-expect-error type definition
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
    //@ts-expect-error type definition
    changeLanguage: (wantedLanguage: string) => {
      return;
    },
  });
  language.changeLanguage = (wantedLanguage: string) => {
    let active = lang.SE;
    if (wantedLanguage === "SE") {
      active = lang.SE;
    } else {
      active = lang.EN;
    }
    setLanguage({ ...language, language: active });
  };

  // useEffect(() => {
  //   const getToken = async () => {
  //     const token = isAuthenticated ? await getAccessTokenSilently() : "";
  //     setBearerToken(token);
  //   };
  //   getToken();
  // }, [getAccessTokenSilently, isAuthenticated]);

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
