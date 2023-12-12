import { Link } from "react-router-dom";
import { Menu } from "./Menu";

export const Header = () => {
  return (
    <>
      <div
        className="d-flex justify-content-between px-2 py-2"
        style={{ height: "3rem" }}
      >
        <Link to="./">
          <span>logo&namn</span>
        </Link>
        <Menu />
      </div>
    </>
  );
};
