import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { useContext, useEffect, useRef, useState } from "react";
import "../../main.css";
import { ContainerContext } from "../../globals/containerContext";

export interface IMobileMenuParams {
  isMobileMenuOpened: boolean;
  changeIsMobileMenuOpen: (state: boolean) => void;
}

export const Layout = () => {
  const { container } = useContext(ContainerContext);
  const theme = container.theme;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (mainRef.current && mainRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [mainRef]);

  return (
    <div
      style={{
        minHeight: "100vh",
        color: theme?.primaryColors.text.hex,
        backgroundColor: theme?.primaryColors.background.hex,
        overflowY: "hidden",
        overflowX: "hidden",
      }}
      className="d-flex flex-column"
    >
      <Header
        isMobileMenuOpened={isMobileMenuOpen}
        changeIsMobileMenuOpen={(state: boolean) => setIsMobileMenuOpen(state)}
      />
      <main className="mx-2 mb-1 p-2" ref={mainRef}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
