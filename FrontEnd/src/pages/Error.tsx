import { useContext } from "react";
import { LanguageContext } from "../globals/language/language";
import { ThemeContext } from "../globals/theme";

export const Error = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <h1>404</h1>
    </>
  );
};
