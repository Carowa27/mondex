import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { FrontPageBtnCard } from "../components/FrontPageBtnCard";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../globals/language/language";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginBtn } from "../components/LoginBtn";
import { CollectionBanner } from "../components/CollectionBanner";
import { ThemeContext } from "../globals/theme";
import { LoadingModule } from "../components/LoadingModule";

export const Home = () => {
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const { isLoading, isAuthenticated, user, error } = useAuth0();

  console.log("user home", user);
  return (
    <>
      <div
        className={
          isDesktop
            ? "row my-1" //d-flex flex-row justify-content-around
            : "row d-flex justify-content-center" //"d-flex flex-column justify-content-around align-items-center"
        }
      >
        <FrontPageBtnCard
          footer={
            <Link to="./about">
              <i>{language.lang_code.read_more}</i>
            </Link>
          }
          bkcolor={`${theme.primaryColors.charmanderEV.hex}`}
        >
          <Link to="/about">
            <h4>{language.lang_code.about_about_project}</h4>
          </Link>
          {isDesktop ? (
            <>
              <h5>{language.lang_code.about_exam}</h5>
              <p>{language.lang_code.about_description_exam}</p>
              <h5>{language.lang_code.word_purpose}</h5>
              <p>{language.lang_code.about_description_purpose}</p>
              <h5>{language.lang_code.word_goal}</h5>
              <p className="m-0">{language.lang_code.about_description_goal}</p>
            </>
          ) : (
            <>
              <h5>{language.lang_code.about_exam}</h5>
              <p className="m-0">{language.lang_code.about_description_exam}</p>
            </>
          )}
        </FrontPageBtnCard>
        <FrontPageBtnCard bkcolor={`${theme.primaryColors.charmanderEV.hex}`}>
          <Link to="/search">
            {" "}
            <h4>{language.lang_code.word_search}</h4>
          </Link>
          <div>test</div>
          <Link to="./search">Go search now</Link>
        </FrontPageBtnCard>
        {error && <p>Error with authentication</p>}

        <FrontPageBtnCard bkcolor={`${theme.primaryColors.charmanderEV.hex}`}>
          {!error && isLoading ? (
            <LoadingModule />
          ) : (
            <>
              {isAuthenticated ? (
                <Link to="/userpage">
                  <h4>{`Welcome Back, ${user?.given_name}!`}</h4>
                </Link>
              ) : (
                <>
                  <h4>{language.lang_code.word_account}</h4>
                  <p>{language.lang_code.account_description}</p>
                  <LoginBtn />
                </>
              )}
            </>
          )}
          <CollectionBanner />
        </FrontPageBtnCard>
      </div>
    </>
  );
};
