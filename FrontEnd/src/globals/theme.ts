import { createContext } from "react";
import { IThemeContext } from "../interfaces/contextInterfaces";

export const colorModes = {
  Light: {
    name: "light",
    primaryColors: {
      blastoise: "#8fa9d8",
      squirtle: "#89c1ce",
      lt_squirtle: "#B6D9E0",
      dk_squirtle: "#567880",
      shell: "#cf7a2f",
    },
  },
  Dark: {
    name: "dark",
    primaryColors: {
      blastoise: "#8fa9d8",
      squirtle: "#3e5f66",
      lt_squirtle: "#B6D9E0",
      dk_squirtle: "#567880",
      shell: "#64360e",
    },
  },
};

export const ThemeContext = createContext<IThemeContext>({
  theme: colorModes.Light,
  changeColorMode: (wantedColorMode: string) => {
    return;
  },
});
