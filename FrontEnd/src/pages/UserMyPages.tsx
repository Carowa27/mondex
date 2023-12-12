import { useAuth0 } from "@auth0/auth0-react";
import { LogoutBtn } from "../components/LogoutBtn";
import { useContext } from "react";
import { LanguageContext } from "../globals/language/language";

export const UserMyPages = () => {
  const { isAuthenticated, user } = useAuth0();
  const { language } = useContext(LanguageContext);
  return (
    <>
      {isAuthenticated && (
        <>
          <h1>{language.lang_code.my_pages_my_pages}</h1>
          <div className="column">
            <img
              src={user?.picture}
              alt={`profile picture of ${user?.nickname}`}
            />
            <p>Username: {user?.nickname}</p>
            <p>Email: {user?.email}</p>
          </div>
          <LogoutBtn />
        </>
      )}
    </>
  );
};
