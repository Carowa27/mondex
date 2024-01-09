import { Link } from "react-router-dom";
import { Menu } from "./Menu";
import { useContext } from "react";
import { ThemeContext } from "../../globals/theme";

export const Header = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div
        className="d-flex justify-content-between ps-3 pe-4 py-2"
        style={{ height: "3rem" }}
      >
        <Link
          className="text-decoration-none"
          to="./"
          style={{
            color: theme.primaryColors.link.hex,
          }}
        >
          <div id="main-logo">logo&namn</div>
        </Link>
        <Menu />
      </div>
    </>
  );
};
