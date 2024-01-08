import { useAuth0 } from "@auth0/auth0-react";
import { LanguageContext } from "../globals/language/language";
import { useContext } from "react";

export const LogoutBtn = () => {
  const { language } = useContext(LanguageContext);
  const { logout, isAuthenticated } = useAuth0();
  return (
    <>
      {isAuthenticated && (
        <button className="btn m-2 border" onClick={() => logout()}>
          {language.lang_code.account_logout}
        </button>
      )}
    </>
  );
};
