import { useAuth0 } from "@auth0/auth0-react";
import { LogoutBtn } from "../components/LogoutBtn";
import { useContext, useState } from "react";
import { LanguageContext } from "../globals/language/language";
import { CollectionBanner } from "../components/CollectionBanner";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { Link } from "react-router-dom";

export const UserMyPages = () => {
  const { isAuthenticated, user } = useAuth0();
  const { language } = useContext(LanguageContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const [seeAccount, setSeeAccount] = useState(false);

  return (
    <>
      {isAuthenticated && (
        <>
          <h1>
            {language.lang_code.my_pages_my_pages} - {user?.given_name}
          </h1>
          <div
            className={
              isDesktop ? "column" : "d-flex flex-column align-items-center"
            }
          >
            {!seeAccount ? (
              <div onClick={() => setSeeAccount(true)}>
                {language.lang_code.my_pages_see_my_info}
              </div>
            ) : (
              <div
                style={{
                  outline: `1px blue solid`,
                  width: "fit-content",
                  padding: "2rem 3rem",
                }}
              >
                <div className="d-flex flex-column">
                  <div
                    className="align-self-end"
                    onClick={() => setSeeAccount(false)}
                  >
                    &#x2715;
                  </div>
                  <img
                    className="rounded-circle d-flex mb-3 mx-auto"
                    src={user?.picture}
                    alt={`profile picture of ${user?.nickname}`}
                  />
                  <p>
                    <span className="font-weight-bold">
                      {language.lang_code.word_username}:
                    </span>{" "}
                    {user?.nickname}
                  </p>
                  <p>
                    <span className="font-weight-bold">
                      {language.lang_code.word_email}:
                    </span>{" "}
                    {user?.email}
                  </p>
                  <LogoutBtn />
                </div>
              </div>
            )}
            <div
              className={
                isDesktop
                  ? "row w-100 d-flex justify-content-around"
                  : "col-12 mb-3"
              }
            >
              {/* map collections of user */}
              {/* max 5 */}
              <CollectionBanner type="master" />
            </div>
            <Link to="/all-collections">
              {language.lang_code.my_pages_see_all_collections}
            </Link>
          </div>
        </>
      )}
    </>
  );
};
