import { Link } from "react-router-dom";
import { Menu } from "./Menu";

export const Header = () => {
  return (
    <>
      <div
        className="d-flex justify-content-between px-2  align-items-center"
        style={{ height: "3rem" }}
      >
        <Link className="text-decoration-none" to="./">
          <span id="main-logo">logo&namn</span>
        </Link>
        <Menu />
      </div>
    </>
  );
};
