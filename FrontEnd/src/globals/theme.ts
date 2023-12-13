import { createContext } from "react";
import { IThemeContext } from "../interfaces/contextInterfaces";

export const colorModes = {
  Light: {
    name: "light",
    primaryColors: {
      eeveelution: { rgb: "59,67,70", hex: "#3b4346" }, //umbreon
      sqrtlEV: { rgb: "137,193,206", hex: "#89c1ce" }, // sqrtl
      bulbasaurEV: { rgb: "132,189,163", hex: "#84bda3" }, //bulbasaur
      charmanderEV: { rgb: "233,174,128", hex: "#e9ae80" }, //charmander
      sunmoon: { rgb: "85,77,66", hex: "#554d42" }, //moon
    },
  },
  Dark: {
    name: "dark",
    primaryColors: {
      eeveelution: { rbg: "245,229,169", hex: "#FFF5D1" }, //leafeon
      sqrtlEV: { rgb: "143,169,216", hex: "#8fa9d8" }, // blastoise
      bulbasaurEV: { rgb: "67,131,136", hex: "#438388" }, //venusaur
      charmanderEV: { rgb: "212,141,84", hex: "#d48d54" }, //charizard
      sunmoon: { rgb: "255,217,82", hex: "#FFD952" }, //sun
    },
  },
};

export const ThemeContext = createContext<IThemeContext>({
  theme: colorModes.Light,
  changeColorMode: (wantedColorMode: string) => {
    return;
  },
});
