import { createContext } from "react";
import { IThemeContext } from "../interfaces/contextInterfaces";

export const colorModes = {
  Light: {
    name: "light",
    primaryColors: {
      sunmoon: { rgb: "85,77,66", hex: "#554d42" },
      text: { hex: "#3b4346" },
      link: { hex: "#2B375C" },
      background: { hex: "#89c1ce" },
      border: { hex: "#649980" },
      cardBackground: { hex: "#78AEBB" },
    },
  },
  Dark: {
    name: "dark",
    primaryColors: {
      sunmoon: { rgb: "255,217,82", hex: "#FFD952" },
      text: { hex: "#E9F3FF" },
      link: { hex: "#B0C5E0" },
      background: { hex: "#25383C" },
      border: { hex: "#84bda3" },
      cardBackground: { hex: "#172528" },
    },
  },
};

export const ThemeContext = createContext<IThemeContext>({
  theme: colorModes.Light,
  changeColorMode: (wantedColorMode: string) => {
    return;
  },
});
