import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ThemeContext } from "../../globals/theme";
import { useContext } from "react";
import "../../main.css";

export const Layout = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        minHeight: "100vh",
        color: theme.primaryColors.text.hex,
        backgroundColor: theme.primaryColors.background.hex,
        overflowY: "hidden",
        overflowX: "hidden",
      }}
      className="d-flex flex-column"
    >
      <Header />
      <main className="mx-2 mb-1 p-2">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
