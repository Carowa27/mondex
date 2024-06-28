import { Link } from "react-router-dom";
import { Menu } from "./Menu";
import { useContext } from "react";
import { ThemeContext } from "../../globals/theme";
import mondex from "../../assets/mondex.png";
import { variables } from "../../globals/variables";
import { useMediaQuery } from "react-responsive";

export const Header = () => {
  const { theme } = useContext(ThemeContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });

  return (
    <>
      <header
        className={"d-flex justify-content-between ps-3 pe-4 pt-1"}
        style={
          isDesktop
            ? { height: "3.5rem", maxWidth: "100vw" }
            : { height: "3rem", maxWidth: "100vw" }
        }
      >
        <Link
          className="text-decoration-none"
          to="./"
          style={{
            color: theme.primaryColors.link.hex,
          }}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          <div id="main-logo" className="h-100 " style={{ width: "10rem" }}>
            <img src={mondex} alt="mondex logo" className="h-100 m-0 p-0" />
          </div>
        </Link>
        <Menu />
      </header>
    </>
  );
};
