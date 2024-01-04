import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { LanguageContext } from "../globals/language/language";
import { getPkmnFromApi } from "../services/pkmnApiServices";
import { IPkmnCard } from "../interfaces/dataFromApi";
import { LoadingModule } from "../components/LoadingModule";
import { User, useAuth0 } from "@auth0/auth0-react";
import { ThemeContext } from "../globals/theme";
import { createCard } from "../services/cardServices";
import { SmallPkmnCard } from "../components/SmallPkmnCard";
import { BigPkmnCard } from "../components/BigPkmnCard";
import { ChooseCollectionPopUp } from "../components/ChooseCollectionPopUp";

interface ICreateCardProps {
  user: User;
  cardFromApi: IPkmnCard;
  // collectionName: string;
}

export const Search = () => {
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated, user } = useAuth0();
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchParam, setSearchParam] = useState<string>("pkmn");
  const [pkmnList, setPkmnList] = useState<IPkmnCard[]>([]);
  // const [setList, setSetList] = useState<IPkmnSet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noHits, setNoHits] = useState<boolean>(false);
  const [showCardAlternatives, setShowCardAlternatives] = useState<string>("");
  const [hoverBtn, setHoverBtn] = useState<boolean>(false);
  const [hoverInfoBtn, setHoverInfoBtn] = useState<boolean>(false);
  const [seeBigCard, setSeeBigCard] = useState<boolean>(false);
  const [infoPkmnCard, setInfoPkmnCard] = useState<IPkmnCard>();
  const [showChooseAddCardPopup, setShowChooseAddCardPopup] =
    useState<boolean>(false);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setPkmnList([]);
  };
  const searchWithPkmnApi = async (
    searchParam: string,
    searchValue: string
  ) => {
    let searchString = `https://api.pokemontcg.io/v2/cards`;
    let searchTerm = searchValue;
    if (searchValue.includes(" ")) {
      searchTerm = searchValue.replace(/ /g, "%20");
    }

    if (searchParam !== "artist") {
      if (searchParam === "set") {
        searchString = `https://api.pokemontcg.io/v2/cards?q=!set.name:%22${searchTerm}%22&orderBy=number&pageSize=50&page=1`;
      }
      if (searchParam === "pkmn") {
        searchString = `https://api.pokemontcg.io/v2/cards?q=name:${searchTerm}&orderBy=number&pageSize=50&page=1`;
      }
    } else {
      searchString = `https://api.pokemontcg.io/v2/cards?q=artist:%22${searchTerm}%22&orderBy=number&pageSize=50&page=1`;
    }

    if (pkmnList.length === 0) {
      await getPkmnFromApi(searchString).then((res) => {
        if (!res || res.length === 0) {
          setNoHits(true);
          setIsLoading(false);
        }
        setPkmnList(res as IPkmnCard[]);
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
    }
  }, [searchValue]);

  const changeShowPkmnInfo = () => {
    setSeeBigCard(false);
  };

  const changeShowAddCardPopup = () => {
    setShowChooseAddCardPopup(false);
  };
  return (
    <>
      {showChooseAddCardPopup ? (
        <ChooseCollectionPopUp
          changeShowAddCardPopup={changeShowAddCardPopup}
          cardToAdd={infoPkmnCard!}
        ></ChooseCollectionPopUp>
      ) : null}
      {seeBigCard ? (
        <BigPkmnCard
          card={undefined}
          pkmnCard={infoPkmnCard}
          changeShowPkmnInfo={changeShowPkmnInfo}
        />
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
                Name:{" "}
                <input
                  type="text"
                  id="search_text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  className="rounded" //"input-group-text"
                />
              </label>
            </div>
            <div
              id="search_type"
              className="d-flex justify-content-around align-items-center mt-1"
            >
              <label htmlFor="pkmn" className="m-0">
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
              <label htmlFor="artist" className="m-0">
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
              <label htmlFor="set" className="m-0">
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
            value="Submit"
          />
        </div>
      </form>
      <div
        style={{ minHeight: "80vh", outline: "1px solid black" }}
        className="mt-3 p-2"
      >
        {!isLoading ? (
          <>
            {noHits ? (
              <>Got no hits, you have any type errors?</>
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
                            {(showCardAlternatives && isAuthenticated) ||
                            !isDesktop ? (
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
                                  <span
                                    style={
                                      hoverBtn
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
                                    onMouseEnter={() => setHoverBtn(true)}
                                    onMouseLeave={() => setHoverBtn(false)}
                                    title="add card"
                                    onClick={() => {
                                      setShowChooseAddCardPopup(true);
                                      setInfoPkmnCard(cardFromApi);
                                    }}
                                  >
                                    <i className="bi bi-plus m-0 p-0"></i>
                                  </span>
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
                    <div className="d-flex justify-content-center">
                      Paginering
                    </div>
                  </>
                ) : (
                  <>Go ahead and search</>
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
