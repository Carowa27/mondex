import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../globals/language/language";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginBtn } from "../components/LoginBtn";
import { CollectionBanner } from "../components/CollectionBanner";
import { ThemeContext } from "../globals/theme";
import { LoadingModule } from "../components/LoadingModule";
import {
  checkForMasterCollection,
  getAllOwnedCollections,
} from "../services/collectionServices";
import { ICollectionFromDB } from "../interfaces/dataFromDB";
import { getMostValuableCardFromApi } from "../services/pkmnTcgApiServices";
import { IPkmnCard } from "../interfaces/dataFromApi";
import { BigPkmnCard } from "../components/BigPkmnCard";

export const Home = () => {
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { language } = useContext(LanguageContext);
  const { theme, changeColorMode } = useContext(ThemeContext);
  const { isLoading, isAuthenticated, user, error } = useAuth0();
  const [collections, setCollections] = useState<ICollectionFromDB[]>([]);
  const [valuableCard, setValuableCard] = useState<IPkmnCard>();
  const [lastOpenedCard, setLastOpenedCard] = useState<IPkmnCard>();
  const [seeBigCard, setSeeBigCard] = useState<boolean>(false);
  const [infoPkmnCard, setInfoPkmnCard] = useState<IPkmnCard>();

  const changeShowPkmnInfo = () => {
    setSeeBigCard(false);
  };
  useEffect(() => {
    if (isAuthenticated && user) {
      const getData = async () => {
        await getAllOwnedCollections({ user }).then((res) => {
          setCollections(res as ICollectionFromDB[]);
        });
      };
      getData();
      checkForMasterCollection(user);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    const lastOpenedCard = localStorage.getItem("lastOpenedCard");
    lastOpenedCard && setLastOpenedCard(JSON.parse(lastOpenedCard).card);

    const savedValuableCard = localStorage.getItem("mostValuableCard");
    savedValuableCard && setValuableCard(JSON.parse(savedValuableCard).card);

    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const today = `${year}-${month}-${date}`;

    const getData = async () => {
      await getMostValuableCardFromApi(`normal`).then((res) => {
        if (res) {
          setValuableCard(res);
          localStorage.setItem(
            "mostValuableCard",
            JSON.stringify({ card: res, savedOn: today })
          );
        }
      });
    };
    if (savedValuableCard === null) {
      getData();
    } else {
      const savedCard = JSON.parse(savedValuableCard);

      if (savedCard.savedOn !== today) {
        getData();
      }
    }
  }, []);
  const getTheme = () => {
    const activeTheme = localStorage.getItem("activeTheme");

    if (activeTheme === undefined) {
      if (theme.name === "light") {
        localStorage.setItem("activeTheme", "light");
      } else {
        localStorage.setItem("activeTheme", "dark");
      }
    } else {
      if (activeTheme === "dark") {
        changeColorMode("dark");
      }
    }
  };
  useEffect(() => {
    getTheme();
  }, []);

  useEffect(() => {
    if (theme.name === "light") {
      localStorage.setItem("activeTheme", "light");
    } else {
      localStorage.setItem("activeTheme", "dark");
    }
  }, [theme.name]);

  // const valueHTML = (cardInfo: IPkmnCard) => (
  //   <>
  //     {cardInfo.tcgplayer?.prices["1stEdition"]?.market ? (
  //       <span>{cardInfo.tcgplayer?.prices["1stEdition"].market}$</span>
  //     ) : null}
  //     {cardInfo.tcgplayer?.prices["1stEditionHolofoil"]?.market ? (
  //       <span>{cardInfo.tcgplayer?.prices["1stEditionHolofoil"].market}$</span>
  //     ) : null}
  //     {cardInfo.tcgplayer?.prices["1stEditionNormal"]?.market ? (
  //       <span>{cardInfo.tcgplayer?.prices["1stEditionNormal"].market}$</span>
  //     ) : null}
  //     {cardInfo.tcgplayer?.prices.holofoil?.market ? (
  //       <span>{cardInfo.tcgplayer?.prices.holofoil.market}$</span>
  //     ) : null}
  //     {cardInfo.tcgplayer?.prices.normal?.market ? (
  //       <span>{cardInfo.tcgplayer?.prices.normal.market}$</span>
  //     ) : null}
  //     {cardInfo.tcgplayer?.prices.reverseHolofoil?.market ? (
  //       <span>{cardInfo.tcgplayer?.prices.reverseHolofoil.market}$</span>
  //     ) : null}
  //     {cardInfo.tcgplayer?.prices.unlimited?.market ? (
  //       <span>{cardInfo.tcgplayer?.prices.unlimited.market}$</span>
  //     ) : null}
  //     {cardInfo.tcgplayer?.prices.unlimitedHolofoil?.market ? (
  //       <span>{cardInfo.tcgplayer?.prices.unlimitedHolofoil.market}$</span>
  //     ) : null}
  //   </>
  // );
  return (
    <>
      {seeBigCard ? (
        <div
          style={{
            backgroundColor: `rgba(${theme.primaryColors.black.rgb}, 0.7)`,
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            position: "fixed",
          }}
          className="d-flex justify-content-center"
          onClick={changeShowPkmnInfo}
        >
          <BigPkmnCard
            card={undefined}
            pkmnCard={infoPkmnCard}
            changeShowPkmnInfo={changeShowPkmnInfo}
          />
        </div>
      ) : null}
      <div
        id="homepage-container"
        className={
          isDesktop
            ? "row my-1 d-flex justify-content-around"
            : "my-1 d-flex flex-column"
        }
      >
        {/* about column */}
        <div
          className={
            isDesktop
              ? isAuthenticated
                ? "rounded px-3 py-2 mx-2 d-flex flex-column flex-fill"
                : "rounded px-3 py-2 my-2 d-flex flex-column"
              : "w-100 rounded px-4 py-3 my-2 d-flex flex-column order-3"
          }
          style={
            isDesktop
              ? isAuthenticated
                ? {
                    width: "25%",
                    border: `2px solid rgba(${theme.typeColors.water.rgb},0.5)`,
                    backgroundColor: `rgba(${theme.typeColors.water.rgb},0.1)`,
                    minHeight: "85vh",
                    height: "auto",
                  }
                : {
                    width: "40%",
                    border: `2px solid rgba(${theme.typeColors.water.rgb},0.5)`,
                    backgroundColor: `rgba(${theme.typeColors.water.rgb},0.1)`,
                    minHeight: "85vh",
                    height: "auto",
                  }
              : {
                  border: `2px solid  rgba(${theme.typeColors.water.rgb},0.5)`,
                  backgroundColor: `rgba(${theme.typeColors.water.rgb},0.1)`,
                }
          }
        >
          <Link
            to="/about"
            className="text-decoration-none"
            style={{
              color: theme.primaryColors.link.hex,
            }}
          >
            <h4 id="main-card-about-header">
              {language.lang_code.about_about_project}
            </h4>
          </Link>
          <p className={isDesktop ? "" : "m-0"}>
            {language.lang_code.about_description_exam}
          </p>
          {isDesktop && (
            <>
              <h5>{language.lang_code.word_purpose}</h5>
              <p>{language.lang_code.about_description_purpose}</p>
              {!isAuthenticated ? (
                <>
                  <h5>{language.lang_code.word_goal}</h5>
                  <p className="m-0">
                    {language.lang_code.about_description_goal}
                  </p>{" "}
                </>
              ) : null}
            </>
          )}

          <Link
            to="./about"
            className="mt-auto align-self-end"
            style={{
              color: theme.primaryColors.link.hex,
            }}
          >
            <i>{language.lang_code.read_more}</i>
          </Link>
        </div>
        {/* search column */}
        <div
          className={
            isDesktop
              ? "w-25 rounded px-4 py-3 mx-2 d-flex flex-column"
              : "w-100 rounded px-4 py-3 my-2 d-flex flex-column order-2"
          }
          style={
            isDesktop
              ? {
                  border: `2px solid  rgba(${theme.typeColors.fire.rgb},0.5)`,
                  backgroundColor: `rgba(${theme.typeColors.fire.rgb},0.1)`,
                  minHeight: "85vh",
                  height: "auto",
                }
              : {
                  height: "auto",
                  border: `2px solid  rgba(${theme.typeColors.fire.rgb},0.5)`,
                  backgroundColor: `rgba(${theme.typeColors.fire.rgb},0.1)`,
                }
          }
        >
          <Link
            to="/search"
            className={"text-decoration-none mb-2"}
            style={{
              color: theme.primaryColors.link.hex,
            }}
          >
            <h4 id="main-card-search-header">
              {language.lang_code.word_search}
            </h4>
            <span>{language.lang_code.search_you_can_search_for}. </span>
            {isDesktop && (
              <span>
                {language.lang_code.search_new_sets_might_be_unavailable}.
              </span>
            )}
          </Link>
          <div className={isDesktop ? "" : "d-flex "}>
            {lastOpenedCard ? (
              <div
                className={
                  isDesktop
                    ? "d-flex flex-column w-100"
                    : "d-flex flex-column w-25 align-items-center flex-fill"
                }
              >
                <h6 className={isDesktop ? "align-self-start" : "text-center"}>
                  {language.lang_code.your_last_searched}
                </h6>
                <div
                  className={isDesktop ? "" : "d-flex justify-content-center"}
                  style={{ width: isDesktop ? "5.5rem" : "12.5rem" }}
                  onClick={() => {
                    setSeeBigCard(true);
                    setInfoPkmnCard(lastOpenedCard);
                  }}
                >
                  <img
                    className="rounded"
                    style={{ width: isDesktop ? "100%" : "40%" }}
                    src={lastOpenedCard.images.small}
                    alt={lastOpenedCard.name}
                  />
                </div>
                <p
                  className={
                    isDesktop
                      ? "m-0"
                      : "w-100 d-flex justify-content-evenly m-0"
                  }
                >
                  <span>{lastOpenedCard.name}</span>
                </p>
                <span style={{ fontSize: "x-small" }}>
                  {language.lang_code.last_opened}:{" "}
                  {lastOpenedCard.tcgplayer?.updatedAt}
                </span>
              </div>
            ) : null}
            {valuableCard ? (
              <div
                className={
                  isDesktop
                    ? "d-flex flex-column w-100"
                    : "d-flex flex-column w-25 align-items-center flex-fill ms-3"
                }
              >
                {isDesktop ? (
                  <h6 className="align-self-start mt-3">
                    {language.lang_code.most_valuable} <i>normal</i>{" "}
                    {language.lang_code.word_card.toLowerCase()}
                  </h6>
                ) : (
                  <h6 className="text-center">
                    {language.lang_code.todays_valuable_card}
                  </h6>
                )}

                <div
                  className={isDesktop ? "" : "d-flex justify-content-center"}
                  style={{ width: isDesktop ? "5.5rem" : "12.5rem" }}
                  onClick={() => {
                    setSeeBigCard(true);
                    setInfoPkmnCard(valuableCard);
                  }}
                >
                  <img
                    className="rounded"
                    style={{ width: isDesktop ? "100%" : "40%" }}
                    src={valuableCard.images.small}
                    alt={valuableCard.name}
                  />
                </div>
                <p
                  className={
                    isDesktop
                      ? "m-0"
                      : "w-100 d-flex justify-content-evenly m-0"
                  }
                >
                  <span>{valuableCard.name}</span>
                  <span className={isDesktop ? "ms-2" : ""}>
                    {valuableCard.tcgplayer?.prices.normal?.market}$
                  </span>
                </p>
                <span style={{ fontSize: "x-small" }}>
                  {language.lang_code.last_updated_at}:{" "}
                  {valuableCard.tcgplayer?.updatedAt}
                </span>
              </div>
            ) : null}
          </div>
        </div>
        {/* user column */}
        <div
          className={
            isDesktop
              ? isAuthenticated
                ? "rounded px-4 py-3 mx-2 d-flex "
                : "rounded px-4 py-3 mx-2 d-flex h-auto"
              : "w-100 rounded px-4 py-3 my-2 d-flex flex-row"
          }
          style={
            isAuthenticated
              ? {
                  width: "40%",
                  border: `2px solid  rgba(${theme.typeColors.grass.rgb},0.5)`,
                  backgroundColor: `rgba(${theme.typeColors.grass.rgb},0.1)`,
                }
              : {
                  width: "25%",
                  border: `2px solid  rgba(${theme.typeColors.grass.rgb},0.5)`,
                  backgroundColor: `rgba(${theme.typeColors.grass.rgb},0.1)`,
                }
          }
        >
          {error && <p>Error with authentication</p>}
          {!error && isLoading ? (
            <LoadingModule />
          ) : (
            <>
              {isAuthenticated ? (
                <div
                  className={
                    isDesktop
                      ? "d-flex flex-column h-100 w-100"
                      : "d-flex flex-column w-100"
                  }
                >
                  <Link
                    to="/userpage"
                    className="text-decoration-none"
                    style={{
                      color: theme.primaryColors.link.hex,
                    }}
                  >
                    <h4 id="main-card-account-header-user">{`${language.lang_code.word_welcome}, ${user?.given_name}!`}</h4>
                  </Link>

                  {collections && collections.length !== 0 ? (
                    <>
                      {collections.slice(0, 2).map((coll) => (
                        <CollectionBanner
                          key={coll.id}
                          collectionName={coll.collection_name}
                        />
                      ))}
                    </>
                  ) : (
                    <>{language.lang_code.error_something_went_wrong}</>
                  )}
                  <Link
                    className={
                      isDesktop
                        ? "mt-auto align-self-end mb-2 me-2"
                        : "align-self-end mb-2 me-2"
                    }
                    to="/all-collections"
                    style={{
                      color: theme.primaryColors.link.hex,
                    }}
                  >
                    <i> {language.lang_code.my_pages_see_all_collections}</i>
                  </Link>
                </div>
              ) : (
                <div className="">
                  <h4 id="main-card-account-header">
                    {language.lang_code.word_account}
                  </h4>
                  <p>{language.lang_code.account_description}</p>
                  <LoginBtn />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
