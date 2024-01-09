import { createContext } from "react";
import { IThemeContext } from "../interfaces/contextInterfaces";

export const colorModes = {
  Light: {
    name: "light",
    primaryColors: {
      white: { hex: "#FAFBFB", rgb: "250, 251, 251" },
      black: { hex: "#1D201F", rgb: "29, 32, 31" },
      sunmoon: { hex: "#554d42", rgb: "85,77,66" },
      text: { hex: "#3b4346" },
      link: { hex: "#2B375C" },
      breadcrumbText: { hex: "#6C757D" },
      background: { hex: "#89c1ce" },
      border: { hex: "#649980" },
      cardBackground: { hex: "#78AEBB" },
      buttonBackground: { hex: "#F3E9E3" },
    },
    typeColors: {
      grass: { hex: "#6EC22C", rgb: "110,194,44" },
      fire: { hex: "#EA3D0E", rgb: "234,61,14" },
      water: { hex: "#23A6E2", rgb: "35,166,226" },
      lightning: { hex: "#FFD314", rgb: "255, 211, 20" },
      psychic: { hex: "#BA52B7", rgb: "186,82,183" },
      fighting: { hex: "#C67839", rgb: "198, 120, 57" },
      darkness: { hex: "#006E7F", rgb: "0,110,127" },
      metal: { hex: "#9EA7AC", rgb: "158, 167, 172" },
      colorless: { hex: "#E0DFE0", rgb: "224,223,224" },
      dragon: { hex: "#CDAE2D", rgb: "205,174,45" },
      fairy: { hex: "#D54084", rgb: "213,64,132" },
    },
  },
  Dark: {
    name: "dark",
    primaryColors: {
      white: { hex: "#FAFBFB" },
      black: { hex: "#1D201F" },
      sunmoon: { rgb: "255,217,82", hex: "#FFD952" },
      text: { hex: "#E9F3FF" },
      link: { hex: "#B0C5E0" },
      breadcrumbText: { hex: "#A6ABAF" },
      background: { hex: "#25383C" },
      border: { hex: "#84bda3" },
      cardBackground: { hex: "#172528" },
      buttonBackground: { hex: "#7D6D68" },
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
  //@ts-expect-error type definition
  changeColorMode: (wantedColorMode: string) => {
    return;
  },
});
