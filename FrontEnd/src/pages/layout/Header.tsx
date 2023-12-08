import { Link } from "react-router-dom";
import { Menu } from "./Menu";

export const Header = () => {
  return (
    <div
      className="d-flex justify-content-between px-2 pb-2 align-items-center"
      style={{ height: "3.5rem" }}
    >
      <Link to="./">
        <span>logo&namn</span>
      </Link>
      <Menu />
    </div>
  );
};
