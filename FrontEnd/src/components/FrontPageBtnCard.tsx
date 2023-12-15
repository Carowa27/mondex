import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";

export const FrontPageBtnCard = ({
  children,
  footer,
  bkcolor,
}: {
  children: React.ReactNode;
  footer?: React.ReactNode;
  bkcolor?: string;
}) => {
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  return (
    <div
      className={
        isDesktop
          ? "px-4 py-3 col mx-2 d-flex flex-column"
          : "px-3 py-2 col-12 mb-2 d-flex align-items-start flex-column"
      }
      style={
        isDesktop
          ? {
              width: "32%",
              minHeight: "85vh",
              height: "auto",
              backgroundColor: `${bkcolor}`,
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              borderRadius: "1rem",
              textWrap: "wrap",
            }
          : {
              width: "100%",
              minHeight: "29vh",
              height: "auto",
              backgroundColor: `${bkcolor}`,
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              borderRadius: "0.8rem",
              textWrap: "wrap",
            }
      }
    >
      {children && <>{children}</>}
      {footer && <div className="mt-auto align-self-end">{footer}</div>}
    </div>
  );
};
