import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ThemeContext } from "../../globals/theme";
import { useContext } from "react";

export const Layout = () => {
  const { theme } = useContext(ThemeContext);

  // html,
  // body {
  //   -ms-overflow-style: none;
  //   scrollbar-width: none;
  //   &::-webkit-scrollbar {
  //     display: none;
  //   }
  // }

  return (
    <div
      style={{
        minHeight: "100vh",
        color: theme.primaryColors.text.hex,
        backgroundColor: theme.primaryColors.background.hex,
        overflowY: "hidden",
        overflowX: "hidden",
      }}
      className="d-flex flex-column p-2"
    >
      <Header />
      <main className="mx-2">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
