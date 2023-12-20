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
    typeColors: {
      grass: { rgb: "125,179,82", hex: "#7DB352" },
      fire: { rgb: "243,107,70", hex: "#F36B46" },
      water: { rgb: "121,208,247", hex: "#79D046" },
      lightning: { rgb: "243, 210, 65", hex: "#F3D241" },
      psychic: { rgb: "174,109,172", hex: "#AE6DAC" },
      fighting: { rgb: "209, 152, 90", hex: "#D1985A" },
      darkness: { rgb: "0,110,127", hex: "#006E7F" },
      metal: { rgb: "158, 167, 172", hex: "#9EA7AC" },
      colorless: { rgb: "224,223,224", hex: "#E0DFE0" },
      dragon: { rgb: "199,193,41", hex: "#C7C129" },
      fairy: { rgb: "193,72,127", hex: "#C1487F" },
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
    typeColors: {
      grass: { rgb: "125,179,82", hex: "#7DB352" },
      fire: { rgb: "243,107,70", hex: "#F36B46" },
      water: { rgb: "121,208,247", hex: "#79D046" },
      lightning: { rgb: "243, 210, 65", hex: "#F3D241" },
      psychic: { rgb: "174,109,172", hex: "#AE6DAC" },
      fighting: { rgb: "209, 152, 90", hex: "#D1985A" },
      darkness: { rgb: "0,110,127", hex: "#006E7F" },
      metal: { rgb: "158, 167, 172", hex: "#9EA7AC" },
      colorless: { rgb: "224,223,224", hex: "#E0DFE0" },
      dragon: { rgb: "199,193,41", hex: "#C7C129" },
      fairy: { rgb: "193,72,127", hex: "#C1487F" },
    },
  },
};

export const ThemeContext = createContext<IThemeContext>({
  theme: colorModes.Light,
  changeColorMode: (wantedColorMode: string) => {
    return;
  },
});
