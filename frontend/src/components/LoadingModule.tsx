import { useContext, useEffect, useState } from "react";
import { ContainerContext } from "../globals/containerContext";

export const LoadingModule = () => {
  const { container } = useContext(ContainerContext);
  const language = container.language;
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
        {language?.lang_code.word_loading}..
        {isThirdDot ? <>.</> : null}
      </h5>
    </>
  );
};
