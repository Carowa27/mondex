import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { ThemeContext } from "../globals/theme";
import { useContext } from "react";

export const FrontPageBtnCard = ({
  header,
  children,
  footer,
}: {
  header?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) => {
  const { theme } = useContext(ThemeContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  return (
    <div
      className={
        isDesktop
          ? "p-2 col mx-2" //"d-flex flex-column p-2"
          : "p-2 col-11" //"d-flex flex-column p-2"
      }
      style={
        isDesktop
          ? {
              width: "32%",
              height: "100%",
              backgroundColor: `${theme.primaryColors.shell}`,
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              borderRadius: "1rem",
            }
          : {
              width: "95%",
              height: "32%",
              backgroundColor: `${theme.primaryColors.shell}`,
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              borderRadius: "0.8rem",
            }
      }
    >
      {header && <h4>{header}</h4>}
      {children && <>{children}</>}
      {footer && <div className="mt-auto align-self-end">{footer}</div>}
    </div>
  );
};
