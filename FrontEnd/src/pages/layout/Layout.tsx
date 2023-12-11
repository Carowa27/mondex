import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ThemeContext } from "../../globals/theme";
import { useContext } from "react";

export const Layout = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      style={{
        minHeight: "100vh",
        background: `${theme.primaryColors.hex.squirtle}`,
      }}
      className="d-flex flex-column p-2"
    >
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};
