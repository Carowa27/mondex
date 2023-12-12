import { useMediaQuery } from "react-responsive";
import { FrontPageBtnCard } from "../components/FrontPageBtnCard";
import { Link } from "react-router-dom";
import { variables } from "../globals/variables";
import { useContext } from "react";
import { LanguageContext } from "../globals/language/language";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginBtn } from "../components/LoginBtn";
import { LogoutBtn } from "../components/LogoutBtn";
import { CollectionBanner } from "../components/CollectionBanner";

export const Home = () => {
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { language } = useContext(LanguageContext);
  const { isLoading, isAuthenticated, user, error } = useAuth0();

  console.log("user home", user);
  return (
    <>
      <div
        className={
          isDesktop
            ? "row m-1" //d-flex flex-row justify-content-around
            : "row d-flex justify-content-center" //"d-flex flex-column justify-content-around align-items-center"
        }
        style={{ height: "90vh" }}
      >
        {/* <Link to="./about"></Link> */}
        <FrontPageBtnCard>
          <h4>{language.lang_code.about_about_project}</h4>
          <div>test</div>
        </FrontPageBtnCard>
        <FrontPageBtnCard>
          <h4>{language.lang_code.word_search}</h4>
          <div>test</div>
          <Link to="./search">Go search now</Link>
        </FrontPageBtnCard>
        {error && <p>Error with authentication</p>}
        {!error && isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <FrontPageBtnCard
              footer={
                <>
                  <LoginBtn />
                  <LogoutBtn />
                </>
              }
            >
              {isAuthenticated ? (
                <h4>{`Welcome Back, ${user?.given_name}!`}</h4>
              ) : (
                <>
                  <h4>{language.lang_code.word_account}</h4>
                  <p>{language.lang_code.account_description}</p>
                </>
              )}
              <CollectionBanner />
            </FrontPageBtnCard>
          </>
        )}
      </div>
    </>
  );
};
