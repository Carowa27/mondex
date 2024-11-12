import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { variables } from "../../globals/variables";
import { useContext, useState } from "react";
import { lang } from "../../globals/language/language";
import { colorModes } from "../../globals/theme";
import { ContainerContext } from "../../globals/containerContext";
import { IMobileMenuParams } from "./Layout";

export const Menu = ({
  isMobileMenuOpened,
  changeIsMobileMenuOpen,
}: IMobileMenuParams) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const isTablet = useMediaQuery({ query: variables.breakpoints.tablet });
  const { container, updateContainer } = useContext(ContainerContext);
  const language = container.language;
  const theme = container.theme;
  return (
    <>
      {isDesktop || isTablet ? (
        <div
          className="d-flex justify-content-around py-2"
          style={{
            width: "400px",
            minWidth: "fit-content",
            gap: "0.5rem",
            color: `${theme?.primaryColors.link.hex}`,
          }}
        >
          <Link
            className="text-decoration-none"
            to="./search"
            style={{
              color: theme?.primaryColors.link.hex,
            }}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            <span
              id="main-menu-searchpage"
              className="ps-2"
              style={{
                borderLeft: `2px solid rgba(${theme?.typeColors.water.rgb},0.8)`,
              }}
            >
              {language?.lang_code.word_search}
            </span>
          </Link>
          <Link
            className="text-decoration-none"
            to="./about"
            style={{
              color: theme?.primaryColors.link.hex,
            }}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            <span id="main-menu-about" className="ps-2">
              {language?.lang_code.about_about_project}
            </span>
          </Link>
          {container.user && container.user.username !== "" && (
            <>
              <span id="main-menu-mypages" className="ps-2">
                <Link
                  className="text-decoration-none"
                  to="./userpage"
                  style={{
                    color: theme?.primaryColors.link.hex,
                  }}
                  onClick={() =>
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    })
                  }
                >
                  {language?.lang_code.my_pages_my_pages}
                </Link>
              </span>
            </>
          )}
          {/*    <span
                id="main-menu-logout"
                className="ps-2"
                onClick={() => logout()}
              >
                {language?.lang_code.account_logout}
              </span>
            </>
          ) : (
            <span
              id="main-menu-login"
              className="ps-2"
              onClick={() => loginWithRedirect()}
            >
              {language?.lang_code.account_login}
            </span>
         )} */}
          {isLangMenuOpen ? (
            <>
              <div
                style={{
                  backgroundColor: `${theme?.primaryColors.background.hex}`,
                }}
              >
                <div
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="ps-2 clickable-event"
                >
                  <span id="main-menu-language?">
                    {" "}
                    {language?.lang_code.word_language}
                  </span>
                  <i className="bi bi-chevron-up ps-1"></i>
                </div>
                <div
                  className="d-flex flex-wrap justify-content-around p-2 rounded-bottom border-top-0 border-right-0"
                  style={{
                    zIndex: "200",
                    position: "absolute",
                    backgroundColor: `${theme?.primaryColors.background.hex}`,
                    width: "4.35rem",
                  }}
                >
                  <span
                    id="main-menu-language?-se"
                    className={
                      language?.name === "Svenska"
                        ? "fw-bold clickable-event"
                        : "fw-normal clickable-event"
                    }
                    onClick={() => (
                      setIsLangMenuOpen(false),
                      updateContainer(lang.SE, "language")
                    )}
                  >
                    SE
                  </span>
                  <span
                    id="main-menu-language?-en"
                    className={
                      language?.name === "English"
                        ? "fw-bold clickable-event"
                        : "fw-normal  clickable-event"
                    }
                    onClick={() => (
                      setIsLangMenuOpen(false),
                      updateContainer(lang.EN, "language")
                    )}
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
                className="ps-2 clickable-event"
              >
                <span id="main-menu-language?">
                  {language?.lang_code.word_language}
                </span>
                <i className="bi bi-chevron-down ps-1"></i>
              </div>
            </>
          )}
          <div className="ps-3 clickable-event">
            {theme?.name === "light" ? (
              <i
                onClick={() => updateContainer(colorModes.Dark, "theme")}
                className="bi bi-moon-fill"
                style={{ color: "#554d42" }}
              ></i>
            ) : (
              <i
                onClick={() => updateContainer(colorModes.Light, "theme")}
                className="bi bi-brightness-high-fill"
                style={{ color: "#FFC233" }}
              ></i>
            )}
          </div>
        </div>
      ) : (
        <>
          {isMobileMenuOpened ? (
            <div
              id="main-menu-container"
              className="d-flex flex-column pe-4 rounded-bottom"
              style={{
                marginTop: "10px",
                color: `${theme?.primaryColors.link.hex}`,
                position: "absolute",
                right: 0,
                cursor: "pointer",
                zIndex: "500",
                minWidth: "fit-content",
                width: "40%",
                gap: "0.8rem",
                backgroundColor: `${theme?.primaryColors.background.hex}`,
                borderLeft: `2px solid rgba(${theme?.typeColors.water.rgb},0.8)`,
                borderBottom: `1px solid rgba(${theme?.typeColors.water.rgb},0.8)`,
              }}
            >
              <div onClick={() => changeIsMobileMenuOpen(!isMobileMenuOpened)}>
                <span id="main-menu" className="ps-2">
                  Menu
                </span>
                <i className="bi bi-chevron-up ps-2"></i>
              </div>

              <Link
                className="text-decoration-none"
                to="./search"
                onClick={() => {
                  changeIsMobileMenuOpen(false),
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                }}
                style={{
                  color: theme?.primaryColors.link.hex,
                }}
              >
                <span id="main-menu-searchpage" className="ps-2">
                  {language?.lang_code.word_search}
                </span>
              </Link>
              <Link
                className="text-decoration-none"
                to="./about"
                onClick={() => {
                  changeIsMobileMenuOpen(false),
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                }}
                style={{
                  color: theme?.primaryColors.link.hex,
                }}
              >
                <span id="main-menu-about" className="ps-2">
                  {language?.lang_code.about_about_project}
                </span>
              </Link>
              {
                container.user ? (
                  <>
                    <Link
                      className="text-decoration-none"
                      to="./userpage"
                      onClick={() => {
                        changeIsMobileMenuOpen(false),
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                      }}
                      style={{
                        color: theme?.primaryColors.link.hex,
                      }}
                    >
                      <span id="main-menu-mypages" className="ps-2">
                        {language?.lang_code.my_pages_my_pages}
                      </span>
                    </Link>
                    {/* <span
                    id="main-menu-logout"
                    className="ps-2"
                    onClick={() => logout()}
                  >
                    {language?.lang_code.account_logout}
                  </span> */}
                  </>
                ) : null
                // (
                //   <span
                //     id="main-menu-login"
                //     className="ps-2"
                //     onClick={() => (
                //       loginWithRedirect(), setIsMobileMenuOpen(!isMobileMenuOpen)
                //     )}
                //   >
                //     {language?.lang_code.account_login}
                //   </span>)
              }
              <div className="d-flex justify-content-around pt-1 pb-1">
                <span
                  id="main-menu-language-se"
                  className={
                    language?.name === "Svenska"
                      ? "fw-bold ps-2 clickable-event"
                      : "fw-normal ps-2 clickable-event"
                  }
                  onClick={() => (
                    changeIsMobileMenuOpen(false),
                    updateContainer(lang.SE, "language")
                  )}
                >
                  SE
                </span>
                <span
                  id="main-menu-language-en"
                  className={
                    language?.name === "English"
                      ? "fw-bold clickable-event"
                      : "fw-normal clickable-event"
                  }
                  onClick={() => (
                    changeIsMobileMenuOpen(false),
                    updateContainer(lang.EN, "language")
                  )}
                >
                  EN
                </span>
              </div>
            </div>
          ) : (
            <div
              className="d-flex flex-column pe-4 ps-2"
              style={{
                marginTop: "10px",
                color: `${theme?.primaryColors.link.hex}`,
                position: "absolute",
                right: 0,
                cursor: "pointer",
                zIndex: "500",
                minWidth: "fit-content",
                width: "40%", //"120px",
                borderLeft: `2px solid rgba(${theme?.typeColors.water.rgb},0.8)`,
              }}
            >
              <div
                onClick={() => changeIsMobileMenuOpen(!isMobileMenuOpened)}
                style={{
                  width: "110px",
                }}
              >
                <span id="main-menu">Menu</span>
                <i className="bi bi-chevron-down ps-2"></i>
              </div>
            </div>
          )}
          <div
            id="main-menu-theme?-container"
            className="ps-3 pe-2 me-3 mt-2"
            style={{ zIndex: 600, position: "absolute", right: 0 }}
          >
            {theme?.name === "light" ? (
              <i
                id="main-menu-theme?-light"
                onClick={() => updateContainer(colorModes.Dark, "theme")}
                className="bi bi-moon-fill"
                style={{ color: theme?.primaryColors.sunmoon.hex }}
              ></i>
            ) : (
              <i
                id="main-menu-theme?-light"
                onClick={() => updateContainer(colorModes.Light, "theme")}
                className="bi bi-brightness-high-fill"
                style={{ color: theme?.primaryColors.sunmoon.hex }}
              ></i>
            )}
          </div>
        </>
      )}
    </>
  );
};
