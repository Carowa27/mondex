import { useMediaQuery } from "react-responsive";
import { variables } from "../../globals/variables";
import { useContext } from "react";
import { LanguageContext } from "../../globals/language/language";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../globals/theme";
import { useAuth0 } from "@auth0/auth0-react";

export const Footer = () => {
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const thisYear = new Date().getFullYear();

  return (
    <footer
      className={
        isDesktop
          ? "mt-auto d-flex flex-column justify-content-between px-3 pb-2"
          : "mt-auto d-flex flex-column pb-2"
      }
      style={{
        backgroundColor: theme.typeColors.colorless.hex,
      }}
    >
      <div className={isDesktop ? "d-flex pt-3" : "pt-3"}>
        <div className={isDesktop ? "w-25 " : ""}>
          <div
            className={
              isDesktop
                ? "d-flex flex-column justify-content-around w-75"
                : "d-flex justify-content-between w-100 px-2 pb-3"
            }
            style={{
              width: "400px",
              minWidth: "fit-content",
              gap: "0.5rem",
              color: `${theme.primaryColors.link.hex}`,
            }}
          >
            <Link
              className="text-decoration-none"
              to="./search"
              style={{
                color: theme.primaryColors.link.hex,
              }}
            >
              <span
                id="footer-menu-searchpage"
                className={isDesktop ? "ps-2" : ""}
                // style={{
                //   borderLeft: `2px solid ${theme.primaryColors.border.hex}`,
                // }}
              >
                {language.lang_code.word_search}
              </span>
            </Link>
            <Link
              className="text-decoration-none"
              to="./about"
              style={{
                color: theme.primaryColors.link.hex,
              }}
            >
              <span id="footer-menu-about" className="ps-2">
                {language.lang_code.about_about_project}
              </span>
            </Link>
            {isAuthenticated ? (
              <>
                <span id="footer-menu-mypages" className="ps-2">
                  <Link
                    className="text-decoration-none"
                    to="./userpage"
                    style={{
                      color: theme.primaryColors.link.hex,
                    }}
                  >
                    {language.lang_code.my_pages_my_pages}
                  </Link>
                </span>
                <span
                  id="footer-menu-logout"
                  className="ps-2"
                  onClick={() => logout()}
                >
                  {language.lang_code.account_logout}
                </span>
              </>
            ) : (
              <span
                id="footer-menu-login"
                className="ps-2"
                onClick={() => loginWithRedirect()}
              >
                {language.lang_code.account_login}
              </span>
            )}
          </div>
        </div>
        <div className={isDesktop ? "w-75" : "px-3"}>
          <h6>{language.lang_code.disclaimer}</h6>
          <p>{language.lang_code.disclaimer_description}</p>
        </div>
      </div>
      <div className={"align-self-center"}>
        &copy; {thisYear} Carolina (
        <Link
          to="https://github.com/Carowa27"
          className="text-decoration-none"
          style={{
            color: theme.primaryColors.link.hex,
          }}
        >
          Carowa27
        </Link>
        )
      </div>
    </footer>
  );
};
