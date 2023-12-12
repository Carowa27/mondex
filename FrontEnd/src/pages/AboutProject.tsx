import { useContext } from "react";
import { LanguageContext } from "../globals/language/language";
import { FrontPageBtnCard } from "../components/FrontPageBtnCard";
import { ThemeContext } from "../globals/theme";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";

export const AboutProject = () => {
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <h2>{language.lang_code.about_about_project}</h2>
      <div
        className={
          isDesktop
            ? "row my-1" //d-flex flex-row justify-content-around
            : "row d-flex justify-content-center" //"d-flex flex-column justify-content-around align-items-center"
        }
      >
        <FrontPageBtnCard bkcolor={`${theme.primaryColors.hex.shell}`}>
          <h5>{language.lang_code.about_exam}</h5>
          <p>{language.lang_code.about_description_exam}</p>
        </FrontPageBtnCard>
        <FrontPageBtnCard bkcolor={`${theme.primaryColors.hex.shell}`}>
          <h5>{language.lang_code.word_purpose}</h5>
          <p>{language.lang_code.about_description_purpose}</p>
        </FrontPageBtnCard>
        <FrontPageBtnCard bkcolor={`${theme.primaryColors.hex.shell}`}>
          <h5>{language.lang_code.word_goal}</h5>
          <p className="m-0">{language.lang_code.about_description_goal}</p>
        </FrontPageBtnCard>
      </div>
    </>
  );
};
