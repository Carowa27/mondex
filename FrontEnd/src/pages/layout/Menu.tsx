import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { variables } from "../../globals/variables";
import { useContext, useState } from "react";
import { LanguageContext } from "../../globals/language/language";
import { ThemeContext } from "../../globals/theme";
import { useAuth0 } from "@auth0/auth0-react";

export const Menu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { language, changeLanguage } = useContext(LanguageContext);
  const { theme, changeColorMode } = useContext(ThemeContext);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <>
      {isDesktop ? (
        <div
          className="d-flex justify-content-around"
          style={{
            width: "400px",
          }}
        >
          <Link className="text-decoration-none" to="./search">
            <span
              id="main-menu-searchpage"
              className="pl-2"
              style={{
                borderLeft: `2px solid ${theme.primaryColors.border.hex}`,
              }}
            >
              {language.lang_code.word_search}
            </span>
          </Link>
          <Link className="text-decoration-none" to="./about">
            <span id="main-menu-about" className="pl-2">
              {language.lang_code.about_about_project}
            </span>
          </Link>
          {isAuthenticated ? (
            <>
              <span id="main-menu-mypages" className="pl-2">
                {/* {language.lang_code.account_login} */}
                <Link className="text-decoration-none" to="./userpage">
                  {language.lang_code.my_pages_my_pages}
                </Link>
              </span>
              <span
                id="main-menu-logout"
                className="pl-2"
                onClick={() => logout()}
              >
                {language.lang_code.account_logout}
              </span>
            </>
          ) : (
            <span
              id="main-menu-login"
              className="pl-2"
              onClick={() => loginWithRedirect()}
            >
              {language.lang_code.account_login}
            </span>
          )}
          {isLangMenuOpen ? (
            <>
              <div
                style={{
                  backgroundColor: `${theme.primaryColors.background.hex}`,
                }}
              >
                <div
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="pl-2"
                  style={{
                    borderLeft: `2px solid ${theme.primaryColors.border.hex}`,
                  }}
                >
                  <span id="main-menu-language">
                    {" "}
                    {language.lang_code.word_language}
                  </span>
                  <i className="bi bi-chevron-compact-up pl-1"></i>
                </div>
                <div
                  className="d-flex flex-wrap justify-content-around p-2 rounded-bottom border-top-0 border-right-0"
                  style={{
                    zIndex: "200",
                    position: "absolute",
                    border: `2px solid ${theme.primaryColors.border.hex}`,
                    backgroundColor: `${theme.primaryColors.background.hex}`,
                    width: "4.35rem",
                  }}
                >
                  <span
                    id="main-menu-language-se"
                    className={
                      language.name === "Svenska"
                        ? "font-weight-bold"
                        : "font-weight-normal"
                    }
                    onClick={() => changeLanguage("SE")}
                  >
                    SE
                  </span>
                  <span
                    id="main-menu-language-en"
                    className={
                      language.name === "English"
                        ? "font-weight-bold"
                        : "font-weight-normal"
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
                <span id="main-menu-language">
                  {language.lang_code.word_language}
                </span>
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
              id="main-menu-container"
              className="d-flex flex-column mr-3 px-2 rounded-bottom border-top-0 border-right-0"
              style={{
                position: "absolute",
                right: 0,
                cursor: "pointer",
                zIndex: "200",
                width: "120px",
                backgroundColor: `${theme.primaryColors.background.hex}`,
                border: `2px solid ${theme.primaryColors.border.hex}`,
              }}
            >
              <div onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <span id="main-menu"> Menu</span>
                <i className="bi bi-chevron-compact-up pl-2"></i>
              </div>

              <Link
                className="text-decoration-none"
                to="./search"
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
              >
                <span id="main-menu-searchpage">
                  {language.lang_code.word_search}
                </span>
              </Link>
              <Link
                className="text-decoration-none"
                to="./about"
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
              >
                <span id="main-menu-about">
                  {language.lang_code.about_about_project}
                </span>
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    className="text-decoration-none"
                    to="./userpage"
                    onClick={() => {
                      setIsMobileMenuOpen(!isMobileMenuOpen);
                    }}
                  >
                    <span id="main-menu-mypages">
                      {language.lang_code.my_pages_my_pages}
                    </span>
                  </Link>
                  <span id="main-menu-logout" onClick={() => logout()}>
                    {language.lang_code.account_logout}
                  </span>
                </>
              ) : (
                <span
                  id="main-menu-login"
                  onClick={() => (
                    loginWithRedirect(), setIsMobileMenuOpen(!isMobileMenuOpen)
                  )}
                >
                  {language.lang_code.account_login}
                </span>
              )}
              <div className="d-flex justify-content-around pt-1 pb-1">
                <span
                  id="main-menu-language-se"
                  className={
                    language.name === "Svenska"
                      ? "font-weight-bold"
                      : "font-weight-normal"
                  }
                  onClick={() => changeLanguage("SE")}
                >
                  SE
                </span>
                <span
                  id="main-menu-language-en"
                  className={
                    language.name === "English"
                      ? "font-weight-bold"
                      : "font-weight-normal"
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
                width: "120px",
                borderLeft: `2px solid ${theme.primaryColors.border.hex}`,
              }}
            >
              <div
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  width: "110px",
                }}
              >
                <span id="main-menu">Menu</span>
                <i className="bi bi-chevron-compact-down pl-2"></i>
              </div>
            </div>
          )}
          <div
            id="main-menu-theme-container"
            className="pl-3 mr-3"
            style={{ zIndex: 300, position: "absolute", right: 0 }}
          >
            {theme.name === "light" ? (
              <i
                id="main-menu-theme-light"
                onClick={() => changeColorMode("dark")}
                className="bi bi-moon-fill"
                style={{ color: theme.primaryColors.sunmoon.hex }}
              ></i>
            ) : (
              <i
                id="main-menu-theme-light"
                onClick={() => changeColorMode("light")}
                className="bi bi-brightness-high-fill"
                style={{ color: theme.primaryColors.sunmoon.hex }}
              ></i>
            )}
          </div>
        </>
      )}
    </>
  );
};
