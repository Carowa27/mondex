import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { variables } from "../../globals/variables";
import { useContext, useState } from "react";
import { LanguageContext } from "../../globals/language/language";
import { ThemeContext } from "../../globals/theme";

export const Menu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { language, changeLanguage } = useContext(LanguageContext);
  const { theme, changeColorMode } = useContext(ThemeContext);
  return (
    <>
      {isDesktop ? (
        <div
          className="d-flex justify-content-around"
          style={{
            width: "300px",
          }}
        >
          <Link to="./search">
            <span
              className="pl-2"
              style={{
                borderLeft: `2px solid ${theme.primaryColors.hex.blastoise}`,
              }}
            >
              {language.lang_code.word_search}
            </span>
          </Link>
          <Link to="./about">
            <span className="pl-2">
              {language.lang_code.about_about_project}
            </span>
          </Link>
          <span className="pl-2" title="logga in/skapa konto/mina sidor">
            {language.lang_code.account_login}
          </span>
          {isLangMenuOpen ? (
            <>
              <div
                style={{
                  backgroundColor: `${theme.primaryColors.hex.squirtle}`,
                }}
              >
                <div
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="pl-2"
                >
                  <span> {language.lang_code.word_language}</span>
                  <i className="bi bi-chevron-compact-up pl-1"></i>
                </div>
                <div
                  className="d-flex flex-wrap justify-content-around"
                  style={{ zIndex: "200" }}
                >
                  <span
                    className="pl-2"
                    style={
                      language.name === "Svenska" ? { fontWeight: "bold" } : {}
                    }
                    onClick={() => changeLanguage("SE")}
                  >
                    SE
                  </span>
                  <span
                    className="pl-2"
                    style={
                      language.name === "English" ? { fontWeight: "bold" } : {}
                    }
                    onClick={() => changeLanguage("EN")}
                  >
                    EN
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="pl-2"
              >
                <span>{language.lang_code.word_language}</span>
                <i className="bi bi-chevron-compact-down pl-1"></i>
              </div>
            </>
          )}
          <div className="pl-3">
            {theme.name === "light" ? (
              <i
                onClick={() => changeColorMode("dark")}
                className="bi bi-moon-fill"
                style={{ color: "#554d42" }}
              ></i>
            ) : (
              <i
                onClick={() => changeColorMode("light")}
                className="bi bi-brightness-high-fill"
                style={{ color: "#FFC233" }}
              ></i>
            )}
          </div>
        </div>
      ) : (
        <>
          {isMobileMenuOpen ? (
            <div
              className="d-flex flex-column mr-3 px-2 rounded-bottom border-top-0 border-right-0"
              style={{
                position: "absolute",
                right: 0,
                cursor: "pointer",
                zIndex: "200",
                width: "110px",
                backgroundColor: `${theme.primaryColors.hex.squirtle}`,
                border: `2px solid ${theme.primaryColors.hex.blastoise}`,
              }}
            >
              <div onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <span> Menu</span>
                <i className="bi bi-chevron-compact-up pl-2"></i>
              </div>

              <Link to="./search">
                <span>{language.lang_code.word_search}</span>
              </Link>
              <Link to="./about">
                <span>{language.lang_code.about_about_project}</span>
              </Link>
              <span title="logga in/skapa konto/mina sidor">
                {language.lang_code.account_login}
              </span>
              <div className="d-flex justify-content-around pt-1">
                <span
                  style={
                    language.name === "Svenska" ? { fontWeight: "bold" } : {}
                  }
                  onClick={() => changeLanguage("SE")}
                >
                  SE
                </span>
                <span
                  style={
                    language.name === "English" ? { fontWeight: "bold" } : {}
                  }
                  onClick={() => changeLanguage("EN")}
                >
                  EN
                </span>
              </div>
            </div>
          ) : (
            <div
              className="d-flex flex-column mr-3 px-2" // justify-content-start"
              style={{
                position: "absolute",
                right: 0,
                cursor: "pointer",
                zIndex: "200",
                width: "110px",
                borderLeft: `2px solid ${theme.primaryColors.hex.blastoise}`,
                // backgroundColor: theme.primaryColors.squirtle,
              }}
            >
              <div
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  width: "110px",
                }}
              >
                <span>Menu</span>
                <i className="bi bi-chevron-compact-down pl-2"></i>
              </div>
            </div>
          )}
          <div
            className="pl-3 mr-3"
            style={{ zIndex: 300, position: "absolute", right: 0 }}
          >
            {theme.name === "light" ? (
              <i
                onClick={() => changeColorMode("dark")}
                className="bi bi-moon-fill"
                style={{ color: "#554d42" }}
              ></i>
            ) : (
              <i
                onClick={() => changeColorMode("light")}
                className="bi bi-brightness-high-fill"
                style={{ color: "#FFC233" }}
              ></i>
            )}
          </div>
        </>
      )}
    </>
  );
};
