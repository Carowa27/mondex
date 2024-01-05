import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ThemeContext } from "../../globals/theme";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

export const Layout = () => {
  const { theme } = useContext(ThemeContext);

  const MainStyle = styled.div`
    color: ${theme.primaryColors.text.hex};
    background-color: ${theme.primaryColors.background.hex};
    overflow-y: hidden;
    overflow-x: hidden;
    html,
    body {
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    a {
      color: ${theme.primaryColors.link.hex};
    }
  `;

  return (
    <MainStyle>
      <div
        style={{
          minHeight: "100vh",
        }}
        className="d-flex flex-column p-2"
      >
        <Header />
        <main className="mx-2">
          <Outlet />
        </main>
        <Footer />
      </div>
    </MainStyle>
  );
};
