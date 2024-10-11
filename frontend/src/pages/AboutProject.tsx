import { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { BreadCrumbs } from "./layout/BreadCrumbs";
import { ContainerContext } from "../globals/containerContext";

export const AboutProject = () => {
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { container } = useContext(ContainerContext);
  const language = container.language;
  const theme = container.theme;
  return (
    <>
      <div className="d-flex justify-content-between align-items-start">
        <h2>{language?.lang_code.about_about_project}</h2>
        <BreadCrumbs pageParam="about" />
      </div>
      <div
        id="about-container"
        className={
          isDesktop
            ? "d-flex flex-row justify-content-around my-1 "
            : "column my-1"
        }
      >
        <div
          className={
            isDesktop
              ? "rounded px-3 py-2 my-2 d-flex flex-column"
              : "w-100 rounded px-4 py-3 my-2 d-flex flex-column order-3"
          }
          style={
            isDesktop
              ? {
                  width: "32%",
                  border: `2px solid rgba(${theme?.typeColors.metal.rgb},0.5)`,
                  backgroundColor: `rgba(${theme?.typeColors.metal.rgb},0.1)`,
                  minHeight: "80vh",
                  height: "auto",
                }
              : {
                  border: `2px solid  rgba(${theme?.typeColors.metal.rgb},0.5)`,
                  backgroundColor: `rgba(${theme?.typeColors.metal.rgb},0.1)`,
                }
          }
        >
          <h5 id="about-card-examprj-header">
            {language?.lang_code.about_exam}
          </h5>
          <p>{language?.lang_code.about_description_exam}</p>
        </div>
        <div
          className={
            isDesktop
              ? "rounded px-3 py-2 my-2 d-flex flex-column"
              : "w-100 rounded px-4 py-3 my-2 d-flex flex-column order-3"
          }
          style={
            isDesktop
              ? {
                  width: "32%",
                  border: `2px solid rgba(${theme?.typeColors.metal.rgb},0.5)`,
                  backgroundColor: `rgba(${theme?.typeColors.metal.rgb},0.1)`,
                  minHeight: "80vh",
                  height: "auto",
                }
              : {
                  border: `2px solid  rgba(${theme?.typeColors.metal.rgb},0.5)`,
                  backgroundColor: `rgba(${theme?.typeColors.metal.rgb},0.1)`,
                }
          }
        >
          <h5 id="about-card-purpose-header">
            {language?.lang_code.word_purpose}
          </h5>
          <p>{language?.lang_code.about_description_purpose}</p>
        </div>
        <div
          className={
            isDesktop
              ? "rounded px-3 py-2 my-2 d-flex flex-column"
              : "w-100 rounded px-4 py-3 my-2 d-flex flex-column order-3"
          }
          style={
            isDesktop
              ? {
                  width: "32%",
                  border: `2px solid rgba(${theme?.typeColors.metal.rgb},0.5)`,
                  backgroundColor: `rgba(${theme?.typeColors.metal.rgb},0.1)`,
                  minHeight: "80vh",
                  height: "auto",
                }
              : {
                  border: `2px solid  rgba(${theme?.typeColors.metal.rgb},0.5)`,
                  backgroundColor: `rgba(${theme?.typeColors.metal.rgb},0.1)`,
                }
          }
        >
          <h5 id="about-card-goal-header">{language?.lang_code.word_goal}</h5>
          <p className="m-0">{language?.lang_code.about_description_goal}</p>
        </div>
      </div>
    </>
  );
};
