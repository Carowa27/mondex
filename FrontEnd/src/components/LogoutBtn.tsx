import { useAuth0 } from "@auth0/auth0-react";
import { LanguageContext } from "../globals/language/language";
import { useContext } from "react";
import { ThemeContext } from "../globals/theme";

export const LogoutBtn = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const { logout, isAuthenticated } = useAuth0();
  return (
    <>
      {isAuthenticated && (
        <button
          className="btn m-2"
          onClick={() => logout()}
          style={{
            border: `1px solid ${theme.primaryColors.text.hex}`,
            color: theme.primaryColors.text.hex,
          }}
        >
          {language.lang_code.account_logout}
        </button>
      )}
    </>
  );
};
