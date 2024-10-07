import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { ContainerContext } from "../globals/containerContext";

export const LogoutBtn = () => {
  const { container } = useContext(ContainerContext);
  const { logout, isAuthenticated } = useAuth0();
  const language = container.language;
  const theme = container.theme;
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
