import React, { Children, ReactNode, useContext } from "react";

export const theme = {
  light: {
    primaryColors: {
      blastoise: "#8fa9d8",
      squirtle: "#89c1ce",
      shell: "#cf7a2f",
    },
    accentColors: {
      blk: "#12181a",
    },
  },
  breakpoints: {
    desktop: "(min-width: 1024px)",
    tablet: "(min-width: 768px) and (max-width: 1023px)",
    mobile: "(max-width: 767px)",
  },
};

interface IChildren {
  children: ReactNode;
}

export function ThemeProvider(props: IChildren) {
  return (
    <ThemeContext.Provider value={theme.light}>
      {props.children}
    </ThemeContext.Provider>
  );
}
const ThemeContext = React.createContext(
  theme.light // default value
);
export function useTheme() {
  return useContext(ThemeContext);
}
