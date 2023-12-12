import { useMediaQuery } from "react-responsive";
import { FrontPageBtnCard } from "../components/FrontPageBtnCard";
import { Link } from "react-router-dom";
import { variables } from "../globals/variables";
import { useContext } from "react";
import { LanguageContext } from "../globals/language/language";
import { useAuth0 } from "@auth0/auth0-react";

export const Home = () => {
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { language } = useContext(LanguageContext);
  const { isLoading, isAuthenticated, loginWithRedirect, user, logout } =
    useAuth0();

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
        <FrontPageBtnCard header={language.lang_code.about_about_project}>
          <div>test</div>
        </FrontPageBtnCard>
        <FrontPageBtnCard header={language.lang_code.word_search}>
          <div>test</div>
          <Link to="./search">Go search now</Link>
        </FrontPageBtnCard>
        {isAuthenticated ? (
          <FrontPageBtnCard header={`Welcome Back, ${user?.given_name}!`}>
            <p>test</p>
            <button className="btn" onClick={() => logout()}>
              Logout
            </button>
          </FrontPageBtnCard>
        ) : (
          <FrontPageBtnCard header={language.lang_code.word_account}>
            <div>{language.lang_code.account_description}</div>
            <div className="d-flex justify-content-around py-5">
              <button className="btn">
                {language.lang_code.account_create_account}
              </button>
              <button className="btn" onClick={() => loginWithRedirect()}>
                {language.lang_code.account_login}
              </button>
            </div>
          </FrontPageBtnCard>
        )}
      </div>
    </>
  );
};
