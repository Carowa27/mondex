import { useContext } from "react";
import { LanguageContext } from "../globals/language/language";

export const LoadingModule = () => {
  const { language } = useContext(LanguageContext);
  return (
    <>
      <h5>{language.lang_code.word_loading}...</h5>
    </>
  );
};
