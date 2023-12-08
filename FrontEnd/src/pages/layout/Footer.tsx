import { useContext } from "react";
import { ThemeContext } from "../../globals/theme";

export const Footer = () => {
  const { theme, changeColorMode } = useContext(ThemeContext);
  return (
    <div className="mt-auto">
      <h4 className="mb-0">Footer(?)</h4>
      <div
        onClick={() => changeColorMode("light")}
        style={{ backgroundColor: `${theme.primaryColors.blastoise}` }}
      >
        LightMode
      </div>
      <div
        onClick={() => changeColorMode("dark")}
        style={{ backgroundColor: `${theme.primaryColors.blastoise}` }}
      >
        DarkMode
      </div>
    </div>
  );
};
