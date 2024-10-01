import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../globals/language/language";
import { CollectionBanner } from "../components/CollectionBanner";
import { ThemeContext } from "../globals/theme";
import { LoadingModule } from "../components/LoadingModule";
import { getMostValuableCardFromApi } from "../services/pkmnTcgApiServices";
import { IPkmnCard } from "../interfaces/dataFromApi";
import { BigPkmnCard } from "../components/BigPkmnCard";
import {
  ICollection,
  ILSContainer,
  IValuableSavedCard,
  Lang,
  Theme,
} from "../interfaces/LSInterface";

export const Home = () => {
  // CHANGE: all LS should be wrapped up in ONE LS object
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { language } = useContext(LanguageContext);
  const { theme, changeColorMode } = useContext(ThemeContext);
  const [lsContainer, setLsContainer] = useState<ILSContainer>();
  const [user, setUser] = useState<string>("");
  const [collections, setCollections] = useState<ICollection[] | []>([]);
  const [valuableCard, setValuableCard] = useState<IValuableSavedCard>();
  const [lastOpenedCard, setLastOpenedCard] = useState<IPkmnCard>();
  const [seeBigCard, setSeeBigCard] = useState<boolean>(false);
  const [infoPkmnCard, setInfoPkmnCard] = useState<IPkmnCard>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changeShowPkmnInfo = () => {
    setSeeBigCard(false);
  };
  // CHANGE: should check if saved data in LS
  // IF YES: show data that is fetched from LS
  // IF NO: show text "no cards saved"
  const getData = () => {
    let LS = localStorage.getItem("mondex");
    let userData: ILSContainer | null = null;
    if (LS !== null) {
      userData = JSON.parse(LS);
    }
    if (userData !== null) {
      console.log("userData", userData);
      setLsContainer(userData);
      setLastOpenedCard(userData.lastOpenedCard);
      setValuableCard(userData.mostValuableCard);
      setUser(userData?.user?.username || "");
      setCollections(userData?.user?.collections || []);
      setIsLoading(false);
    } else {
      setUser("new user");
      setIsLoading(false);
    }
  };

  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const today = `${year}-${month}-${date}`;

  const getValuableCard = async () => {
    await getMostValuableCardFromApi(`normal`).then((res) => {
      if (res) {
        const newValue = {
          ...lsContainer,
          mostValuableCard: { card: res, savedOn: today },
          theme: lsContainer?.theme || Theme.LIGHT,
          user: lsContainer?.user || { username: "", collections: [] },
          lastOpenedCard: lsContainer?.lastOpenedCard || undefined,
          language: lsContainer?.language || Lang.EN,
        };
        setLsContainer(newValue);
        localStorage.setItem("mondex", JSON.stringify(newValue));
      }
      setIsLoading(false);
    });
  };
  useEffect(() => {
    if (collections && collections.length === 0) {
      setIsLoading(true);
      getData();
    }
  }, []);
  useEffect(() => {
    if (valuableCard === null) {
      setIsLoading(true);
      getValuableCard();
    } else {
      if (valuableCard?.savedOn !== today) {
        setIsLoading(true);
        getValuableCard();
      }
    }
    console.log("card", lsContainer?.mostValuableCard);
  }, []);
  useEffect(() => {
    setIsLoading(true);
    if (lsContainer !== undefined) {
      setLastOpenedCard(lsContainer.lastOpenedCard);
      setValuableCard(lsContainer.mostValuableCard);
      setUser(lsContainer?.user?.username || "");
      setCollections(lsContainer?.user?.collections || []);
      setIsLoading(false);
    }
  }, [lsContainer]);

  // INFO: theme should not be changed
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
            zIndex: 400,
          }}
          className="d-flex justify-content-center align-items-center"
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
        style={{ gap: "0.5rem" }}
        className={
          isDesktop
            ? "d-flex flex-row justify-content-around my-1 "
            : "my-1 d-flex flex-column"
        }
      >
        {/* search column */}
        <div
          className={
            isDesktop
              ? "rounded px-4 py-3 d-flex flex-column"
              : "w-100 rounded px-4 py-3 d-flex flex-column order-2"
          }
          style={
            isDesktop
              ? {
                  border: `2px solid  rgba(${theme.typeColors.fire.rgb},0.5)`,
                  backgroundColor: `rgba(${theme.typeColors.fire.rgb},0.1)`,
                  minHeight: "90vh",
                  height: "auto",
                  width: "27%",
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
          </Link>
          <span className={isDesktop ? "" : "mb-3"}>
            {language.lang_code.search_you_can_search_for}.{" "}
          </span>
          {isDesktop && (
            <span className="mb-2">
              {language.lang_code.search_new_sets_might_be_unavailable}.
            </span>
          )}
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
                  style={{ width: isDesktop ? "7rem" : "12.5rem" }}
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
                  style={{ width: isDesktop ? "7rem" : "12.5rem" }}
                  onClick={() => {
                    setSeeBigCard(true);
                    setInfoPkmnCard(valuableCard.card);
                  }}
                >
                  <img
                    className="rounded"
                    style={{ width: isDesktop ? "100%" : "40%" }}
                    src={valuableCard.card.images.small}
                    alt={valuableCard.card.name}
                  />
                </div>
                <p
                  className={
                    isDesktop
                      ? "m-0"
                      : "w-100 d-flex flex-column justify-content-evenly m-0"
                  }
                >
                  <span>{valuableCard.card.name}</span>
                  <span className={isDesktop ? "ms-2" : "align-self-end"}>
                    {valuableCard.card.tcgplayer?.prices.normal?.market}$
                  </span>
                </p>
                <span style={{ fontSize: "x-small" }}>
                  {language.lang_code.last_updated_at}:{" "}
                  {valuableCard.card.tcgplayer?.updatedAt}
                </span>
              </div>
            ) : null}
          </div>
        </div>
        {/* user column */}
        <div
          className={
            isDesktop
              ? //  isAuthenticated
                //   ? "rounded px-3 py-2 me-1 d-flex":
                "rounded px-3 py-2 me-1 d-flex h-auto"
              : "w-100 rounded px-4 py-3 my-2 d-flex flex-row"
          }
          style={
            // isAuthenticated
            //   ? {
            //       width: "40%",
            //       border: `2px solid  rgba(${theme.typeColors.grass.rgb},0.5)`,
            //       backgroundColor: `rgba(${theme.typeColors.grass.rgb},0.1)`,
            //     }:
            {
              width: "27%",
              border: `2px solid  rgba(${theme.typeColors.grass.rgb},0.5)`,
              backgroundColor: `rgba(${theme.typeColors.grass.rgb},0.1)`,
            }
          }
        >
          {isLoading ? (
            <LoadingModule />
          ) : (
            <>
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
                  <h4 id="main-card-account-header-user">
                    {/* {user
                      ? `${language.lang_code.word_welcome}, ${user?.given_name}!`: */}
                    {language.lang_code.word_welcome}!{/* } */}
                  </h4>
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
                  <>{language.lang_code.collection_no_collections_created}</>
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
            </>
          )}
        </div>
      </div>
    </>
  );
};
