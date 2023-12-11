import { createContext } from "react";
import { IThemeContext } from "../interfaces/contextInterfaces";

export const colorModes = {
  Light: {
    name: "light",
    primaryColors: {
      rgb: {
        blastoise: "143,169,216",
        squirtle: "137,193,206",
        shell: "207,122,47",
      },
      hex: {
        blastoise: "#8fa9d8",
        squirtle: "#89c1ce",
        shell: "#cf7a2f",
      },
    },
  },
  Dark: {
    name: "dark",
    primaryColors: {
      rgb: {
        blastoise: "94,117,158",
        squirtle: "86,120,128",
        shell: "100,54,14",
      },
      hex: {
        blastoise: "#5e759e",
        squirtle: "#567880",
        shell: "#64360e",
      },
    },
  },
};

export const ThemeContext = createContext<IThemeContext>({
  theme: colorModes.Light,
  changeColorMode: (wantedColorMode: string) => {
    return;
  },
});
