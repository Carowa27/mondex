import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { theme } from "../../globals/theme";

export const Layout = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: `${theme.light.primaryColors.squirtle}`,
      }}
      className="d-flex flex-column p-2"
    >
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};
