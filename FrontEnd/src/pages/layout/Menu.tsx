import { useMediaQuery } from "react-responsive";
import { theme } from "../../globals/theme";

export const Menu = () => {
  const isDesktop = useMediaQuery({ query: theme.breakpoints.desktop });
  return (
    <div className="d-flex justify-content-evenly">
      {isDesktop ? (
        <>
          <span>sök</span>
          <span className="pl-2">om exsqrtl</span>
          <span className="pl-2" title="logga in/skapa konto/mina sidor">
            logga in
          </span>
          <span className="pl-2">språk</span>
        </>
      ) : (
        <>burger</>
      )}
    </div>
  );
};
