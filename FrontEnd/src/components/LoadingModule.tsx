import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../globals/language/language";

export const LoadingModule = () => {
  const { language } = useContext(LanguageContext);
  const [isThirdDot, setThirdDot] = useState<boolean>(false);
  useEffect(() => {
    setInterval(() => {
      setThirdDot(true);
    }, 500);
    setInterval(() => {
      setThirdDot(false);
    }, 1000);
  }, []);
  return (
    <>
      <h5>
        {language.lang_code.word_loading}..
        {isThirdDot ? <>.</> : null}
      </h5>
    </>
  );
};
