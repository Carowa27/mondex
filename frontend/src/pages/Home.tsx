import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { Link } from "react-router-dom";
import { FormEvent, useContext, useEffect, useState } from "react";
import { CollectionBanner } from "../components/CollectionBanner";
import { LoadingModule } from "../components/LoadingModule";
import { getMostValuableCardFromApi } from "../services/pkmnTcgApiServices";
import { IPkmnCard } from "../interfaces/dataFromApi";
import { BigPkmnCard } from "../components/BigPkmnCard";
import { getMondexLs, updateMondexLs } from "../functions/LSFunctions";
import { ContainerContext } from "../globals/containerContext";
import { getToday } from "../functions/dateFunctions";
import { getValueOfCard } from "../functions/dataFunctions";
import { StandardButton } from "../components/Buttons";

export const Home = () => {
  const { container, updateContainer } = useContext(ContainerContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const isTablet = useMediaQuery({ query: variables.breakpoints.tablet });
  const [seeBigCard, setSeeBigCard] = useState<boolean>(false);
  const [infoPkmnCard, setInfoPkmnCard] = useState<IPkmnCard>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const language = container.language;
  const theme = container.theme;
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const today = `${year}-${month}-${date}`;
  const mostValuableCard = container.mostValuableCard?.cards[0];
  const nextValuableCard = container.mostValuableCard?.cards.slice(1, 6);

  const changeShowPkmnInfo = () => {
    setSeeBigCard(false);
  };

  const getLSData = () => {
    let userData = getMondexLs();
    if (userData !== undefined) {
      updateContainer(userData, "containerObject");
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
    if (userData?.mostValuableCard === undefined) {
      setIsLoading(true);
      getValuableCard();
    } else {
      if (userData?.mostValuableCard.savedOn !== today) {
        setIsLoading(true);
        getValuableCard();
      }
    }
  };

  const getValuableCard = async () => {
    await getMostValuableCardFromApi().then((res) => {
      if (res) {
        updateContainer({ cards: res, savedOn: today }, "valuableCard");
      }
      setIsLoading(false);
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUsername(value);
  };
  const saveUserName = (e: FormEvent) => {
    e.preventDefault();
    updateContainer(
      {
        username,
        collections: [
          {
            id: "Main_Collection" + getToday(),
            collection_name: "Main_Collection",
            cards_in_collection: [],
            created_date: getToday(),
          },
        ],
      },
      "user"
    );
  };
  useEffect(() => {
    setIsLoading(true);
    getLSData();
  }, []);

  useEffect(() => {
    updateMondexLs(container);
  }, [container]);

  return (
    <>
      {seeBigCard ? (
        <div
          style={{
            backgroundColor: `rgba(${theme?.primaryColors.black.rgb}, 0.7)`,
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
                  border: `2px solid  rgba(${theme?.typeColors.fire.rgb},0.5)`,
                  backgroundColor: `rgba(${theme?.typeColors.fire.rgb},0.1)`,
                  minHeight: "90vh",
                  height: "auto",
                  width: "27%",
                }
              : {
                  height: "auto",
                  border: `2px solid  rgba(${theme?.typeColors.fire.rgb},0.5)`,
                  backgroundColor: `rgba(${theme?.typeColors.fire.rgb},0.1)`,
                }
          }
        >
          <Link
            to="/search"
            className={"text-decoration-none mb-2"}
            style={{
              color: theme?.primaryColors.link.hex,
            }}
          >
            <h4 id="main-card-search-header">
              {language?.lang_code.word_search}
            </h4>
          </Link>
          <span className={isDesktop ? "" : "mb-3"}>
            {language?.lang_code.search_you_can_search_for}.{" "}
          </span>
          {isDesktop && (
            <span className="mb-2">
              {language?.lang_code.search_new_sets_might_be_unavailable}.
            </span>
          )}
          <div className={isDesktop ? "mt-auto" : "d-flex "}>
            {container.lastOpenedCard ? (
              <div
                className={
                  isDesktop
                    ? "d-flex flex-row w-100 flex-wrap"
                    : isTablet
                    ? "d-flex flex-column w-50 h-100 justify-content-center align-items-center"
                    : "d-flex flex-column w-50 align-items-center flex-fill"
                }
              >
                {isTablet && (
                  <h5 className={" d-flex justify-content-center mt-3 w-100"}>
                    {language?.lang_code.your_last_searched}
                  </h5>
                )}
                {!isDesktop && !isTablet && (
                  <h6
                    className={
                      isTablet || isDesktop
                        ? "align-self-start mt-3 w-100"
                        : "text-center"
                    }
                  >
                    Last opened card
                  </h6>
                )}
                {isDesktop && (
                  <div
                    className={
                      isDesktop
                        ? "m-0 w-50"
                        : "w-100 d-flex flex-column justify-content-evenly m-0"
                    }
                  >
                    <h6
                      className={
                        isDesktop ? "align-self-start w-100" : "text-center"
                      }
                    >
                      {language?.lang_code.your_last_searched}
                    </h6>
                    <>
                      <span>
                        <b>Card: </b>
                        {container.lastOpenedCard.name}
                      </span>

                      <br />
                      <span>
                        <b>Artist: </b>
                        {container.lastOpenedCard.artist}
                      </span>
                      <br />
                      <span>
                        <b>Set: </b>
                        {container.lastOpenedCard.set.name}
                      </span>
                      <br />
                      <span>
                        <b>Release date: </b>
                        {container.lastOpenedCard.set.releaseDate}
                      </span>
                      <br />
                      <span>
                        <b>Rarity: </b>
                        {container.lastOpenedCard.rarity}
                      </span>
                      <br />
                      <span>
                        <b>Value: </b>
                        {container.lastOpenedCard &&
                          getValueOfCard({
                            card: container.lastOpenedCard,
                            amount: 0,
                          })}
                        $
                      </span>
                    </>
                  </div>
                )}
                <div
                  className={isDesktop ? "" : "d-flex justify-content-center"}
                  style={{
                    width: isDesktop ? "10rem" : isTablet ? "12.5rem" : "80%",
                  }}
                  onClick={() => {
                    setSeeBigCard(true);
                    setInfoPkmnCard(container?.lastOpenedCard);
                  }}
                >
                  <img
                    className="rounded"
                    style={{ width: "100%" }}
                    src={container.lastOpenedCard.images.small}
                    alt={container.lastOpenedCard.name}
                  />
                </div>
                {!isDesktop && (
                  <>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        width: "100%",
                        margin: isTablet ? "0 1rem 0 1rem" : "",
                      }}
                    >
                      <span>{container.lastOpenedCard?.name}</span>
                      <span className={"align-self-end"}>
                        {container.lastOpenedCard &&
                          getValueOfCard({
                            card: container.lastOpenedCard,
                            amount: 1,
                          })}
                        $
                      </span>
                    </p>
                  </>
                )}
              </div>
            ) : null}
            {container.mostValuableCard ? (
              <div
                className={
                  isDesktop
                    ? "d-flex flex-row w-100 flex-wrap"
                    : isTablet && !container.lastOpenedCard
                    ? "d-flex flex-row w-100 flex-wrap"
                    : isTablet && container.lastOpenedCard
                    ? "d-flex flex-row w-50 flex-wrap"
                    : "d-flex flex-column w-50 align-items-center flex-fill"
                }
              >
                {(isTablet || isDesktop) && (
                  <h5
                    className={
                      isTablet || isDesktop
                        ? "align-self-start mt-3 w-100"
                        : "text-center"
                    }
                  >
                    {language?.lang_code.todays_valuable_card}
                  </h5>
                )}
                {!isDesktop && !isTablet && (
                  <h6
                    className={
                      isTablet || isDesktop
                        ? "align-self-start mt-3 w-100"
                        : "text-center"
                    }
                  >
                    {language?.lang_code.todays_valuable_card}
                  </h6>
                )}

                <div
                  className={isDesktop ? "" : "d-flex justify-content-center"}
                  style={{
                    width: isTablet || isDesktop ? "12.5rem" : "80%",
                  }}
                  onClick={() => {
                    setSeeBigCard(true);
                    setInfoPkmnCard(mostValuableCard);
                  }}
                >
                  <img
                    className="rounded"
                    style={{
                      width: isTablet || isDesktop ? "100%" : "100%",
                    }}
                    src={mostValuableCard?.images.small}
                    alt={mostValuableCard?.name}
                  />
                </div>
                <div
                  className={
                    isTablet || isDesktop
                      ? "m-0 ps-3 pt-3"
                      : "w-100 d-flex flex-column justify-content-evenly m-0"
                  }
                  style={{
                    width: isDesktop ? "50%" : isTablet ? "auto" : "auto",
                  }}
                >
                  {isTablet || isDesktop ? (
                    <p>
                      <span>
                        <b>Card: </b>
                        {mostValuableCard?.name}
                      </span>

                      <br />
                      <span>
                        <b>Artist: </b>
                        {mostValuableCard?.artist}
                      </span>
                      <br />
                      <span>
                        <b>Set: </b>
                        {mostValuableCard?.set.name}
                      </span>
                      <br />
                      <span>
                        <b>{language?.lang_code.word_release_date}: </b>
                        {mostValuableCard?.set.releaseDate}
                      </span>
                      <br />
                      <span>
                        <b>Rarity: </b>
                        {mostValuableCard?.rarity}
                      </span>
                      <br />
                      <span
                        style={{
                          fontSize: "48px",
                          display: "flex",
                          justifyContent: isDesktop ? "center" : "start",
                          alignItems: "center",
                          height: "53%",
                        }}
                      >
                        {mostValuableCard &&
                          getValueOfCard({
                            card: mostValuableCard,
                            amount: 1,
                          })}
                        $
                      </span>
                    </p>
                  ) : (
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <span>{mostValuableCard?.name}</span>
                      {!container.lastOpenedCard && (
                        <span>{mostValuableCard?.set.name}</span>
                      )}
                      <span className={"align-self-end"}>
                        {mostValuableCard &&
                          getValueOfCard({
                            card: mostValuableCard,
                            amount: 1,
                          })}
                        $
                      </span>
                    </p>
                  )}
                </div>
                {isTablet && !container.lastOpenedCard && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-evenly",
                      gap: "1rem",
                      width: "40%",
                      marginTop: "0.5rem",
                      marginLeft: "auto",
                    }}
                  >
                    {nextValuableCard?.map((card) => (
                      <img
                        key={card.id}
                        style={{
                          width: "6rem",
                          aspectRatio: "3/4",
                          // height: "auto",
                          // alignSelf: "end",
                        }}
                        src={card.images.small}
                        alt={`${card.name} card`}
                        onClick={() => {
                          setSeeBigCard(true);
                          setInfoPkmnCard(card);
                        }}
                      />
                    ))}
                  </div>
                )}
                <span style={{ fontSize: "x-small", width: "100%" }}>
                  {language?.lang_code.last_updated_at}:{" "}
                  {mostValuableCard?.tcgplayer?.updatedAt}
                </span>
                {isDesktop && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      width: "100%",
                      marginTop: "0.5rem",
                    }}
                  >
                    {nextValuableCard?.map((card) => (
                      <img
                        key={card.id}
                        style={{ width: "4rem" }}
                        src={card.images.small}
                        alt={`${card.name} card`}
                        onClick={() => {
                          setSeeBigCard(true);
                          setInfoPkmnCard(card);
                        }}
                      />
                    ))}
                  </div>
                )}
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
              border: `2px solid  rgba(${theme?.typeColors.grass.rgb},0.5)`,
              backgroundColor: `rgba(${theme?.typeColors.grass.rgb},0.1)`,
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
                    color: theme?.primaryColors.link.hex,
                  }}
                >
                  <h4 id="main-card-account-header-user">
                    {container.user && container.user.username !== ""
                      ? `${language?.lang_code.word_welcome}, ${container?.user?.username}!`
                      : `${language?.lang_code.word_welcome}!`}
                  </h4>
                </Link>
                {container.user?.username !== "" &&
                container?.user?.collections &&
                container.user.collections.length !== 0 ? (
                  <div
                    style={
                      isTablet
                        ? {
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "1rem",
                            justifyContent: "space-evenly",
                          }
                        : {}
                    }
                  >
                    {container.user.collections
                      .slice(0, isDesktop ? 3 : isTablet ? 4 : 2)
                      .map((coll) => (
                        <CollectionBanner
                          key={coll.id}
                          collectionName={coll.collection_name}
                        />
                      ))}
                    <Link
                      className={
                        isDesktop
                          ? "mt-auto align-self-end mb-2 me-2 w-100"
                          : "align-self-end mb-2 me-2 w-100"
                      }
                      to="/all-collections"
                      style={{
                        color: theme?.primaryColors.link.hex,
                      }}
                    >
                      <i> {language?.lang_code.my_pages_see_all_collections}</i>
                    </Link>
                  </div>
                ) : (
                  <>
                    {(!container.user || container.user.username === "") && (
                      <div>
                        {language?.name === "English" ? (
                          <>
                            To add cards and collections, please start by adding
                            your name or username
                          </>
                        ) : (
                          <>
                            För att lägga till kort och samlingar, börja med att
                            lägga till ditt namn eller användarnamn
                          </>
                        )}
                        <form
                          style={{
                            margin: "1rem",
                            display: "flex",
                            flexDirection: "column",
                          }}
                          onSubmit={(e) => saveUserName(e)}
                        >
                          <label
                            htmlFor="username"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "0.5rem",
                            }}
                          >
                            {language?.name === "English" ? (
                              <>Username:</>
                            ) : (
                              <>Användarnamn:</>
                            )}
                            <input
                              type="text"
                              id="username"
                              style={{ margin: "0" }}
                              onChange={handleChange}
                            />
                          </label>
                          <div
                            style={{
                              width: "max-content",
                              alignSelf: "end",
                              marginTop: "0.5rem",
                            }}
                          >
                            <StandardButton
                              btnAction={(e) => saveUserName(e)}
                              disabled={username === ""}
                              btnText="Save username"
                            />
                          </div>
                        </form>
                      </div>
                    )}
                    {/* {language?.lang_code.collection_no_collections_created} */}
                  </>
                )}
                {/* TODO add read more link */}
                <i
                  style={
                    container.user === undefined ||
                    container?.user.username === undefined ||
                    container.user.username === ""
                      ? { marginTop: "auto" }
                      : { marginTop: "auto" }
                  }
                >
                  {language?.name === "English" ? (
                    <>
                      Everything saved on this page is saved in your browser,
                      {isDesktop && <br />}
                      if you want to delete all data,{" "}
                      <Link
                        to={"./about"}
                        className="text-decoration-none"
                        style={{
                          color: theme?.primaryColors.link.hex,
                        }}
                      >
                        read more here
                      </Link>
                    </>
                  ) : (
                    <>
                      Allt som sparas på denna sida sparas i din webbläsare ,{" "}
                      {isDesktop && <br />}
                      om du vill radera all data
                      <Link
                        to={"./about"}
                        className="text-decoration-none"
                        style={{
                          color: theme?.primaryColors.link.hex,
                        }}
                      >
                        läs mer här
                      </Link>
                    </>
                  )}
                </i>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
