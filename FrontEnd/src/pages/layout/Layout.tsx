import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ThemeContext } from "../../globals/theme";
import { useContext } from "react";
import styled from "styled-components";

export const Layout = () => {
  const { theme } = useContext(ThemeContext);

  const MainStyle = styled.div`
    color: ${theme.primaryColors.eeveelution.hex};
    background-color: ${theme.primaryColors.sqrtlEV.hex};
  `;

  return (
    <MainStyle>
      <div
        // style={{
        //   minHeight: "100vh",
        // }}
        className="d-flex flex-column p-2 mh-100"
      >
        <Header></Header>
        <main className="mx-2">
          <Outlet></Outlet>
        </main>
        <Footer></Footer>
      </div>
    </MainStyle>
  );
};
