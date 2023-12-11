import { createContext } from "react";
import { IThemeContext } from "../interfaces/contextInterfaces";

export const colorModes = {
  Light: {
    name: "light",
    primaryColors: {
      blastoise: "143,169,216",
      squirtle: "137,193,206",
      shell: "207,122,47",
    },
  },
  Dark: {
    name: "dark",
    primaryColors: {
      blastoise: "94,117,158",
      squirtle: "86,120,128",
      shell: "100,54,14",
    },
  },
};

export const ThemeContext = createContext<IThemeContext>({
  theme: colorModes.Light,
  changeColorMode: (wantedColorMode: string) => {
    return;
  },
});
