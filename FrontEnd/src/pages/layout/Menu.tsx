import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { variables } from "../../globals/variables";
import { useContext } from "react";
import { LanguageContext } from "../../globals/language/language";

export const Menu = () => {
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { language } = useContext(LanguageContext);
  return (
    <div className="d-flex justify-content-evenly">
      {isDesktop ? (
        <>
          <Link to="./search">
            <span>sök</span>
          </Link>
          <span className="pl-2">om exsqrtl</span>
          <span className="pl-2" title="logga in/skapa konto/mina sidor">
            logga in
          </span>
          <span className="pl-2">{language.locale.word_language}</span>
        </>
      ) : (
        <>burger</>
      )}
    </div>
  );
};
