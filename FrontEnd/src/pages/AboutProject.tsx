import { useContext } from "react";
import { LanguageContext } from "../globals/language/language";
import { ThemeContext } from "../globals/theme";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { BreadCrumbs } from "./layout/BreadCrumbs";

export const AboutProject = () => {
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div className="d-flex justify-content-between align-items-start">
        <h2>{language.lang_code.about_about_project}</h2>
        <BreadCrumbs pageParam="about" />
      </div>
      <div
        id="about-container"
        className={isDesktop ? "row my-1" : "column my-1"}
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
                  width: "40%",
                  border: `2px solid rgba(${theme.typeColors.metal.rgb},0.5)`,
                  backgroundColor: `rgba(${theme.typeColors.metal.rgb},0.1)`,
                  minHeight: "85vh",
                  height: "auto",
                }
              : {
                  border: `2px solid  rgba(${theme.typeColors.metal.rgb},0.5)`,
                  backgroundColor: `rgba(${theme.typeColors.metal.rgb},0.1)`,
                }
          }
        >
          <h5 id="about-card-examprj-header">
            {language.lang_code.about_exam}
          </h5>
          <p>{language.lang_code.about_description_exam}</p>
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
                  width: "40%",
                  border: `2px solid rgba(${theme.typeColors.metal.rgb},0.5)`,
                  backgroundColor: `rgba(${theme.typeColors.metal.rgb},0.1)`,
                  minHeight: "85vh",
                  height: "auto",
                }
              : {
                  border: `2px solid  rgba(${theme.typeColors.metal.rgb},0.5)`,
                  backgroundColor: `rgba(${theme.typeColors.metal.rgb},0.1)`,
                }
          }
        >
          <h5 id="about-card-purpose-header">
            {language.lang_code.word_purpose}
          </h5>
          <p>{language.lang_code.about_description_purpose}</p>
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
                  width: "40%",
                  border: `2px solid rgba(${theme.typeColors.metal.rgb},0.5)`,
                  backgroundColor: `rgba(${theme.typeColors.metal.rgb},0.1)`,
                  minHeight: "85vh",
                  height: "auto",
                }
              : {
                  border: `2px solid  rgba(${theme.typeColors.metal.rgb},0.5)`,
                  backgroundColor: `rgba(${theme.typeColors.metal.rgb},0.1)`,
                }
          }
        >
          <h5 id="about-card-goal-header">{language.lang_code.word_goal}</h5>
          <p className="m-0">{language.lang_code.about_description_goal}</p>
        </div>
      </div>
    </>
  );
};
