import { useAuth0 } from "@auth0/auth0-react";
import { LanguageContext } from "../globals/language/language";
import { useContext } from "react";
import { ThemeContext } from "../globals/theme";

export const LoginBtn = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <>
      {!isAuthenticated && (
        <button
          className="btn m-2 mw-50 d-flex align-self-center justify-content-center"
          style={{
            border: `1px solid ${theme.primaryColors.text.hex}`,
            color: theme.primaryColors.text.hex,
          }}
          onClick={() => loginWithRedirect()}
        >
          <span>
            {language.lang_code.account_create_account}/
            {language.lang_code.account_login}
          </span>
        </button>
      )}
    </>
  );
};
