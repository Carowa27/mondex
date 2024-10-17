import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { getPkmnFromApi } from "../services/pkmnTcgApiServices";
import { IPkmnCard } from "../interfaces/dataFromApi";
import { LoadingModule } from "../components/LoadingModule";
import { BigPkmnCard } from "../components/BigPkmnCard";
import { ChooseCollectionPopUp } from "../components/ChooseCollectionPopUp";
import { Pagination } from "./layout/Pagination";
import { ContainerContext } from "../globals/containerContext";
import { ICard, ICollection } from "../interfaces/LSInterface";
import { SmallPkmnCardSearch } from "../components/SmallPkmnCardSearch";

export const Search = () => {
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const isTablet = useMediaQuery({ query: variables.breakpoints.tablet });
  const { container, updateContainer } = useContext(ContainerContext);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchParam, setSearchParam] = useState<string>("pkmn");
  const [pkmnList, setPkmnList] = useState<IPkmnCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noHits, setNoHits] = useState<boolean>(false);
  const [seeBigCard, setSeeBigCard] = useState<boolean>(false);
  const [infoPkmnCard, setInfoPkmnCard] = useState<IPkmnCard>();
  const [showChooseAddCardPopup, setShowChooseAddCardPopup] =
    useState<boolean>(false);
  const [pageInfo, setPageInfo] = useState<{
    page: number;
    pageSize: number;
    totalCount: number;
  }>();
  const [page, setPage] = useState<number>(1);
  const language = container.language;
  const theme = container.theme;

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setPkmnList([]);
  };
  const addCard = (cardToAdd: IPkmnCard, collectionName: string) => {
    const collectionIndex = container.user!.collections.findIndex(
      (col) => col.collection_name === collectionName
    );
    const collection = container.user!.collections.find(
      (col) => col.collection_name === collectionName
    );
    if (container.user) {
      const cardFound = collection?.cards_in_collection.find(
        (card) => card.card.id === cardToAdd.id
      );
      if (cardFound !== undefined) {
        const cardIndex = container.user.collections[
          collectionIndex
        ].cards_in_collection.findIndex(
          (c: ICard) => c.card.name === cardToAdd.name
        );
        const updatedCard = {
          ...container.user.collections[collectionIndex].cards_in_collection[
            cardIndex
          ],
          amount: cardFound!.amount + 1,
        };
        const updatedCollection = {
          ...container.user.collections[collectionIndex],
          cards_in_collection: [
            ...container.user.collections[
              collectionIndex
            ].cards_in_collection.slice(0, cardIndex),
            updatedCard,
            ...container.user.collections[
              collectionIndex
            ].cards_in_collection.slice(cardIndex + 1),
          ],
        };
        const updatedCollections = [
          ...container.user.collections.slice(0, collectionIndex),
          updatedCollection,
          ...container.user.collections.slice(collectionIndex + 1),
        ];
        updateContainer(
          {
            username: container.user!.username,
            collections: updatedCollections as ICollection[],
          },
          "user"
        );
      } else {
        const updatedCollection = {
          ...container.user.collections[collectionIndex],
          cards_in_collection: [
            ...container.user.collections[collectionIndex].cards_in_collection,
            { card: cardToAdd, amount: 1 },
          ],
        };
        const updatedCollections = [
          ...container.user.collections.slice(0, collectionIndex),
          updatedCollection,
          ...container.user.collections.slice(collectionIndex + 1),
        ];
        updateContainer(
          {
            username: container.user!.username,
            collections: updatedCollections as ICollection[],
          },
          "user"
        );
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
      const pageSize = !isDesktop && !isTablet ? 10 : 50;
      await getPkmnFromApi(searchString, page, pageSize).then((res) => {
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

  useEffect(() => {
    setPkmnList([]);
    setPage(1);
  }, [searchParam]);

  const changeShowPkmnInfo = () => {
    setSeeBigCard(false);
  };
  const changeToAddPopup = () => {
    setSeeBigCard(false);
    setShowChooseAddCardPopup(true);
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
      {showChooseAddCardPopup ? (
        <div
          style={{
            backgroundColor: `rgba(${theme?.primaryColors.black.rgb}, 0.7)`,
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
            addCard={addCard}
          ></ChooseCollectionPopUp>
        </div>
      ) : null}
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
            changeToAddPopup={changeToAddPopup}
          />
        </div>
      ) : null}
      <h2 id="search-header">{language?.lang_code.word_search}</h2>
      <form id="search-form" onSubmit={handleSubmit}>
        <div
          id="search-form-container"
          className={
            isDesktop || isTablet
              ? "d-flex justify-content-start"
              : "d-flex justify-content-around"
          }
        >
          <div>
            <div className="d-flex justify-content-around">
              <label htmlFor="search_text" className="pt-2 m-0">
                {language?.lang_code.search_word}:{" "}
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
              <label htmlFor="search_pkmn" className="m-0 me-2">
                {language?.lang_code.word_name}:{" "}
                <input
                  type="radio"
                  name="search_for"
                  id="search_pkmn"
                  value="search_pkmn"
                  checked={searchParam === "pkmn"}
                  onChange={() => setSearchParam("pkmn")}
                />
              </label>
              <label htmlFor="search_artist" className="m-0 me-2">
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
              <label htmlFor="search_set" className="m-0 me-2">
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
            value={language?.lang_code.word_search}
          />
        </div>
      </form>
      <div style={{ minHeight: "80vh" }} className="mt-3 py-2">
        {!isLoading ? (
          <>
            {noHits ? (
              <>
                <p> {language?.lang_code.error_search_no_hits}</p>
                <p>{language?.lang_code.error_search_new_set}</p>
              </>
            ) : (
              <>
                {pkmnList.length !== 0 ? (
                  <>
                    <ul
                      className={
                        isDesktop || isTablet
                          ? "d-flex flex-wrap justify-content-around p-0"
                          : "d-flex flex-wrap justify-content-between p-0"
                      }
                      style={
                        isDesktop
                          ? { listStyle: "none" }
                          : { listStyle: "none", gap: "0.5rem" }
                      }
                    >
                      {pkmnList.map((cardFromApi: IPkmnCard) => (
                        <li
                          key={cardFromApi.id}
                          className={
                            isDesktop
                              ? "pt-2 px-1 d-flex flex-column align-items-center"
                              : "pt-2 d-flex justify-content-center"
                          }
                          style={isDesktop || isTablet ? {} : { width: "48%" }}
                        >
                          {isDesktop ? (
                            <p className="fw-semibold ps-1 m-0 align-self-start">
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
                          ) : null}
                          <SmallPkmnCardSearch
                            cardFromApi={cardFromApi}
                            addCard={() => (
                              setShowChooseAddCardPopup(true),
                              setInfoPkmnCard(cardFromApi)
                            )}
                          />
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
                  <>{language?.lang_code.search_start}</>
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
