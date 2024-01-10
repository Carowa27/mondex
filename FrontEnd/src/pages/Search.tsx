import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { LanguageContext } from "../globals/language/language";
import { getPkmnFromApi } from "../services/pkmnTcgApiServices";
import { IPkmnCard } from "../interfaces/dataFromApi";
import { LoadingModule } from "../components/LoadingModule";
import { User, useAuth0 } from "@auth0/auth0-react";
import { ThemeContext } from "../globals/theme";
import { createCard } from "../services/cardServices";
import { BigPkmnCard } from "../components/BigPkmnCard";
import { ChooseCollectionPopUp } from "../components/ChooseCollectionPopUp";
import { Pagination } from "./layout/Pagination";
import { getAllOwnedCollections } from "../services/collectionServices";

export const Search = () => {
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated, user } = useAuth0();
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchParam, setSearchParam] = useState<string>("pkmn");
  const [pkmnList, setPkmnList] = useState<IPkmnCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noHits, setNoHits] = useState<boolean>(false);
  const [showCardAlternatives, setShowCardAlternatives] = useState<string>("");
  const [hoverAddBtn, setHoverAddBtn] = useState<boolean>(false);
  const [hoverInfoBtn, setHoverInfoBtn] = useState<boolean>(false);
  const [seeBigCard, setSeeBigCard] = useState<boolean>(false);
  const [seeCreatedCard, setSeeCreatedCard] = useState<boolean>(false);
  const [infoPkmnCard, setInfoPkmnCard] = useState<IPkmnCard>();
  const [showChooseAddCardPopup, setShowChooseAddCardPopup] =
    useState<boolean>(false);
  const [pageInfo, setPageInfo] = useState<{
    page: number;
    pageSize: number;
    totalCount: number;
  }>();
  const [page, setPage] = useState<number>(1);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setPkmnList([]);
  };
  const handleAddCardToCollection = async (cardFromApi: IPkmnCard) => {
    if (user) {
      const collections = await getAllOwnedCollections({ user });
      if (collections.length > 1) {
        setShowChooseAddCardPopup(true);
      } else {
        if (cardFromApi) {
          createCard({
            user,
            collectionName: "Master_Collection",
            cardFromApi,
          }).then(() => {
            setSeeCreatedCard(true),
              setTimeout(() => setSeeCreatedCard(false), 800);
          });
        }
      }
    }
  };
  const searchWithPkmnApi = async (
    searchParam: string,
    searchValue: string
  ) => {
    let searchString = ``;
    let searchTerm = searchValue;
    if (searchValue.includes(" ")) {
      searchTerm = searchValue.replace(/ /g, "%20");
    }

    if (searchParam !== "artist") {
      if (searchParam === "set") {
        searchString = `?q=set.name:%22${searchTerm}%22`;
      }
      if (searchParam === "pkmn") {
        searchString = `?q=name:%22${searchTerm}%22`;
      }
    } else {
      searchString = `?q=artist:%22${searchTerm}%22`;
    }

    if (pkmnList.length === 0) {
      await getPkmnFromApi(searchString, page).then((res) => {
        if (!res || res.data.length === 0) {
          setNoHits(true);
          setIsLoading(false);
        }
        if (res) {
          setPkmnList(res.data as IPkmnCard[]);
          setPageInfo({
            page: res.page,
            pageSize: res.pageSize,
            totalCount: res.totalCount,
          });
        }
      });
    }
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    searchWithPkmnApi(searchParam, searchValue);
    setIsLoading(true);
  };

  useEffect(() => {
    if (pkmnList.length !== 0) {
      setIsLoading(false);
      setNoHits(false);
    }
  }, [pkmnList]);

  useEffect(() => {
    if (searchValue === "") {
      setPkmnList([]);
      setPage(1);
    }
  }, [searchValue]);

  const changeShowPkmnInfo = () => {
    setSeeBigCard(false);
  };

  const changeShowAddCardPopup = () => {
    setShowChooseAddCardPopup(false);
  };

  const updateSearch = (newPage: number) => {
    setPage(newPage);
    setPkmnList([]);
    setIsLoading(true);
  };
  useEffect(() => {
    if (pageInfo && page !== pageInfo.page && pageInfo.page !== undefined) {
      searchWithPkmnApi(searchParam, searchValue);
    }
  }, [page]);

  return (
    <>
      {seeCreatedCard ? (
        <div
          style={{
            backgroundColor: `rgba(${theme.primaryColors.black.rgb}, 0.3)`,
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            position: "fixed",
            zIndex: 400,
          }}
          className="d-flex justify-content-end align-items-end"
        >
          <div
            className="d-flex justify-content-center align-items-center py-2 px-3 my-3 mx-2 rounded"
            style={{
              backgroundColor: `rgba(${theme.primaryColors.white.rgb})`,
            }}
          >
            {language.lang_code.search_card_added}
          </div>
        </div>
      ) : null}
      {showChooseAddCardPopup ? (
        <div
          style={{
            backgroundColor: `rgba(${theme.primaryColors.black.rgb}, 0.7)`,
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            position: "fixed",
            zIndex: "400",
          }}
          className="d-flex justify-content-center align-items-center"
        >
          <ChooseCollectionPopUp
            changeShowAddCardPopup={changeShowAddCardPopup}
            cardToAdd={infoPkmnCard!}
          ></ChooseCollectionPopUp>
        </div>
      ) : null}
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
      <h2 id="search-header">{language.lang_code.word_search}</h2>
      <form id="search-form" onSubmit={handleSubmit}>
        <div
          id="search-form-container"
          className={
            isDesktop
              ? "d-flex justify-content-start"
              : "d-flex justify-content-around"
          }
        >
          <div>
            <div className="d-flex justify-content-around">
              <label htmlFor="search_text" className="pt-2 m-0">
                {language.lang_code.word_name}:{" "}
                <input
                  type="text"
                  id="search_text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  className="rounded"
                />
              </label>
            </div>
            <div
              id="search_type"
              className="d-flex justify-content-between align-items-center mt-1"
            >
              <label htmlFor="pkmn" className="m-0 me-2">
                Pokémon:{" "}
                <input
                  type="radio"
                  name="search_for"
                  id="search_pkmn"
                  value="search_pkmn"
                  checked={searchParam === "pkmn"}
                  onChange={() => setSearchParam("pkmn")}
                />
              </label>
              <label htmlFor="artist" className="m-0 me-2">
                Artist:{" "}
                <input
                  type="radio"
                  name="search_for"
                  id="search_artist"
                  value="search_artist"
                  checked={searchParam === "artist"}
                  onChange={() => setSearchParam("artist")}
                />
              </label>
              <label htmlFor="set" className="m-0 me-2">
                Set:{" "}
                <input
                  type="radio"
                  name="search_for"
                  id="search_set"
                  value="search_set"
                  checked={searchParam === "set"}
                  onChange={() => setSearchParam("set")}
                />
              </label>
            </div>
          </div>
          <input
            className="btn btn-secondary m-2"
            type="submit"
            value={language.lang_code.word_search}
          />
        </div>
      </form>
      <div style={{ minHeight: "80vh" }} className="mt-3 p-2">
        {!isLoading ? (
          <>
            {noHits ? (
              <>
                <p> {language.lang_code.error_search_no_hits}</p>
                <p>{language.lang_code.error_search_new_set}</p>
              </>
            ) : (
              <>
                {pkmnList.length !== 0 ? (
                  <>
                    <ul
                      className="d-flex flex-wrap justify-content-around"
                      style={{ listStyle: "none", padding: 0 }}
                    >
                      {pkmnList.map((cardFromApi: IPkmnCard) => (
                        <li
                          key={cardFromApi.id}
                          className="pt-2 px-1"
                          onMouseEnter={() =>
                            setShowCardAlternatives(cardFromApi.id)
                          }
                          onMouseLeave={() => setShowCardAlternatives("")}
                        >
                          <p className="fw-semibold ps-1 m-0">
                            {searchParam === "pkmn" ? (
                              <> {cardFromApi.set.name}</>
                            ) : null}
                            {searchParam === "artist" ? (
                              <>{cardFromApi.name}</>
                            ) : null}
                            {searchParam === "set" ? (
                              <>{cardFromApi.name}</>
                            ) : null}
                          </p>

                          <div
                            style={{
                              aspectRatio: "3/4",
                              width: "12.5rem",
                            }}
                          >
                            {showCardAlternatives || !isDesktop ? (
                              <div
                                style={
                                  showCardAlternatives === cardFromApi.id ||
                                  !isDesktop
                                    ? {
                                        display: "flex",
                                        position: "absolute",
                                        color: `${theme.primaryColors.text.hex}`,
                                        aspectRatio: "3/4",
                                        width: "12.5rem",
                                        fontSize: "20pt",
                                        alignItems: "end",
                                        padding: "0.5rem",
                                      }
                                    : { display: "none" }
                                }
                              >
                                <div
                                  className="rounded-pill w-100 d-flex justify-content-around"
                                  style={{
                                    backgroundColor: `${theme.primaryColors.background.hex}`,
                                    border: "grey 1px solid",
                                    padding: "0.3rem",
                                  }}
                                >
                                  {isAuthenticated ? (
                                    <span
                                      style={
                                        hoverAddBtn
                                          ? {
                                              backgroundColor: `${theme.primaryColors.cardBackground.hex}`,
                                              width: "25px",
                                              height: "25px",
                                            }
                                          : {
                                              backgroundColor: `${theme.primaryColors.border.hex}`,
                                              width: "25px",
                                              height: "25px",
                                            }
                                      }
                                      className="rounded-circle d-flex align-items-center justify-content-center"
                                      onMouseEnter={() => setHoverAddBtn(true)}
                                      onMouseLeave={() => setHoverAddBtn(false)}
                                      title="add card"
                                      onClick={() => {
                                        handleAddCardToCollection(cardFromApi),
                                          setInfoPkmnCard(cardFromApi);
                                      }}
                                    >
                                      <i className="bi bi-plus m-0 p-0"></i>
                                    </span>
                                  ) : null}
                                  <span
                                    style={
                                      hoverInfoBtn
                                        ? {
                                            backgroundColor: `${theme.primaryColors.cardBackground.hex}`,
                                            width: "1.7rem",
                                            height: "1.7rem",
                                          }
                                        : {
                                            backgroundColor: `${theme.primaryColors.border.hex}`,
                                            width: "1.7rem",
                                            height: "1.7rem",
                                          }
                                    }
                                    className="rounded-circle d-flex align-items-center justify-content-center"
                                    title="more info"
                                    onMouseEnter={() => setHoverInfoBtn(true)}
                                    onMouseLeave={() => setHoverInfoBtn(false)}
                                    onClick={() => {
                                      setSeeBigCard(true);
                                      setInfoPkmnCard(cardFromApi);
                                    }}
                                  >
                                    <span
                                      title="more info"
                                      className="fs-5 fw-medium"
                                    >
                                      i
                                    </span>
                                  </span>
                                </div>
                              </div>
                            ) : null}
                            <img
                              style={{ width: "100%" }}
                              src={cardFromApi.images.small}
                              alt={cardFromApi.name}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                    {pageInfo ? (
                      <div className="d-flex justify-content-center">
                        <Pagination
                          page={pageInfo.page}
                          pageSize={pageInfo.pageSize}
                          totalCount={pageInfo.totalCount}
                          updateSearch={updateSearch}
                        />
                      </div>
                    ) : null}
                  </>
                ) : (
                  <>{language.lang_code.search_start}</>
                )}
              </>
            )}
          </>
        ) : (
          <LoadingModule />
        )}
      </div>
    </>
  );
};
