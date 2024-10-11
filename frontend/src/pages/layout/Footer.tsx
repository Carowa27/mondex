import { useMediaQuery } from "react-responsive";
import { variables } from "../../globals/variables";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { ContainerContext } from "../../globals/containerContext";

export const Footer = () => {
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { container } = useContext(ContainerContext);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const language = container.language;
  const theme = container.theme;

  const thisYear = new Date().getFullYear();

  return (
    <footer
      className={
        isDesktop
          ? "mt-auto d-flex flex-column justify-content-between px-3 pb-2"
          : "mt-auto d-flex flex-column pb-2"
      }
      style={{
        backgroundColor:
          theme?.name === "light"
            ? `rgba(${theme?.typeColors.metal.rgb},0.2)`
            : `rgba(${theme?.typeColors.colorless.rgb},0.1)`,
      }}
    >
      <div className={isDesktop ? "d-flex pt-3" : "pt-3"}>
        <div className={isDesktop ? "w-25 " : ""}>
          <div
            className={
              isDesktop
                ? "d-flex flex-column justify-content-around w-75"
                : "d-flex justify-content-between w-100 px-3 pb-3"
            }
            style={{
              width: "400px",
              minWidth: "fit-content",
              gap: "0.5rem",
              color: `${theme?.primaryColors.link.hex}`,
            }}
          >
            <Link
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="text-decoration-none"
              to="./search"
              style={{
                color: theme?.primaryColors.link.hex,
              }}
            >
              <span
                id="footer-menu-searchpage"
                className={isDesktop ? "ps-2" : ""}
              >
                {language?.lang_code.word_search}
              </span>
            </Link>
            <Link
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="text-decoration-none"
              to="./about"
              style={{
                color: theme?.primaryColors.link.hex,
              }}
            >
              <span id="footer-menu-about" className="ps-2">
                {language?.lang_code.about_about_project}
              </span>
            </Link>
            {isAuthenticated ? (
              <>
                <span id="footer-menu-mypages" className="ps-2">
                  <Link
                    onClick={() =>
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      })
                    }
                    className="text-decoration-none"
                    to="./userpage"
                    style={{
                      color: theme?.primaryColors.link.hex,
                    }}
                  >
                    {language?.lang_code.my_pages_my_pages}
                  </Link>
                </span>
                <span
                  id="footer-menu-logout"
                  className="ps-2"
                  onClick={() => logout()}
                >
                  {language?.lang_code.account_logout}
                </span>
              </>
            ) : (
              <span
                id="footer-menu-login"
                className="ps-2"
                onClick={() => loginWithRedirect()}
              >
                {language?.lang_code.account_login}
              </span>
            )}
          </div>
        </div>
        <div className={isDesktop ? "w-75" : "px-3"}>
          <b className="fs-6">{language?.lang_code.disclaimer}</b>
          <p>{language?.lang_code.disclaimer_description}</p>
        </div>
      </div>
      <div className={"align-self-center"}>
        &copy; {thisYear} Carolina (
        <Link
          to="https://github.com/Carowa27"
          className="text-decoration-none"
          style={{
            color: theme?.primaryColors.link.hex,
          }}
        >
          Carowa27
        </Link>
        )
      </div>
    </footer>
  );
};
