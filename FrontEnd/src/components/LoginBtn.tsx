import { useAuth0 } from "@auth0/auth0-react";
import { LanguageContext } from "../globals/language/language";
import { useContext } from "react";

export const LoginBtn = () => {
  const { language } = useContext(LanguageContext);
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <>
      {!isAuthenticated && (
        <button className="btn m-2" onClick={() => loginWithRedirect()}>
          {language.lang_code.account_login}
        </button>
      )}
    </>
  );
};
