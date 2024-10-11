import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { ContainerContext } from "../globals/containerContext";

export const LoginBtn = () => {
  const { container } = useContext(ContainerContext);
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const language = container.language;
  const theme = container.theme;
  return (
    <>
      {!isAuthenticated && (
        <button
          className="btn m-2 mw-50 d-flex align-self-center justify-content-center"
          style={{
            border: `1px solid ${theme?.primaryColors.text.hex}`,
            color: theme?.primaryColors.text.hex,
          }}
          onClick={() => loginWithRedirect()}
        >
          <span>
            {language?.lang_code.account_create_account}/
            {language?.lang_code.account_login}
          </span>
        </button>
      )}
    </>
  );
};
