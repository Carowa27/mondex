import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { useAuth0 } from "@auth0/auth0-react";
import { LoadingModule } from "../components/LoadingModule";
import { useEffect, useState } from "react";
// import { LanguageContext } from "../globals/language/language";
// import { ThemeContext } from "../globals/theme";
import {
  deleteOwnedCardById,
  getAllCardsFromCollectionById,
} from "../services/cardServices";
import { ICardFromDB, ICollectionFromDB } from "../interfaces/dataFromDB";
import {
  deleteCollectionById,
  getOwnedCollectionByCollectionName,
} from "../services/collectionServices";
import { IPkmnCard } from "../interfaces/dataFromApi";
import { getPkmnFromApi } from "../services/pkmnApiServices";
import { SmallPkmnCard } from "../components/SmallPkmnCard";
import { Pagination } from "./layout/Pagination";
import { BreadCrumbs } from "./layout/BreadCrumbs";

export const CollectionPage = () => {
  // const { theme } = useContext(ThemeContext);
  // const { language } = useContext(LanguageContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { isAuthenticated, user } = useAuth0();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cardList, setCardList] = useState<ICardFromDB[]>([]);
  const [cardsFromApiList, setCardsFromApiList] = useState<IPkmnCard[]>([]);
  const [collection, setCollection] = useState<ICollectionFromDB>();
  const [showWarningCard, setShowWarningCard] = useState<boolean>(false);
  const [showWarningCollection, setShowWarningCollection] =
    useState<boolean>(false);
  const [cardToDelete, setCardToDelete] = useState<ICardFromDB>();
  const [pageInfo, setPageInfo] = useState<{
    page: number;
    pageSize: number;
    totalCount: number;
  }>();
  const [page, setPage] = useState<number>(1);
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(isDesktop ? 50 : 20);

  const collectionName = window.location.href.split("/")[4];
  const collectionNameToShow = collectionName.replace(/_/g, " ");

  const getData = async () => {
    if (isAuthenticated && user && collectionName) {
      await getAllCardsFromCollectionById({ collectionName, user }).then(
        (res) => {
          if (res && res.length === 0) {
            setIsLoading(false);
          } else {
            setCardList(res as ICardFromDB[]);
          }
        }
      );
      await getOwnedCollectionByCollectionName({ collectionName, user }).then(
        (res) => {
          const result = res as ICollectionFromDB;

          setCollection(result);
        }
      );
    }
  };
  useEffect(() => {
    getData();
  }, [isAuthenticated, user]);

  const updateSearch = (newPage: number) => {
    setPage(newPage);
    setCardsFromApiList([]);
    setIsLoading(true);
    if (collection?.api_set_id !== undefined) {
      if (isDesktop) {
        if (newPage === 1) {
          setStart(0);
          setEnd(50);
        } else {
          setStart(50 * newPage - 50);
          setEnd(50 * newPage);
        }
      } else {
        if (newPage === 1) {
          setStart(0);
          setEnd(20);
        } else {
          setStart(20 * newPage - 20);
          setEnd(20 * newPage);
        }
      }
    }
  };
  useEffect(() => {
    getSetFromApi();
  }, [page]);

  useEffect(() => {
    if (collection) {
      if (cardList.length !== 0 && collection.api_set_id === null) {
        setIsLoading(false);
      }
      if (cardsFromApiList.length !== 0 && collection.api_set_id !== null) {
        setIsLoading(false);
      }
    }
  }, [cardList, cardsFromApiList, collection]);

  const getSetFromApi = async () => {
    if (collection && collection?.api_set_id !== null) {
      await getPkmnFromApi(
        `?q=!set.id:%22${collection.api_set_id}%22`,
        page
      ).then((res) => {
        if (res) {
          setCardsFromApiList(res.data as IPkmnCard[]);
          setPageInfo({
            page: res.page,
            pageSize: res.pageSize,
            totalCount: res.totalCount,
          });
        }
      });
    }
  };
  useEffect(() => {
    getSetFromApi();
  }, [collection]);

  // useEffect(() => {
  //   if (showWarningCard) {
  //     const warningDelete = window.confirm(
  //       "Are you sure you want to delete this card?"
  //     );
  //     if (warningDelete && user && cardToDelete) {
  //       const card = cardToDelete;
  //       deleteOwnedCardById({ user, card }).then(() => {
  //         setShowWarningCard(false);
  //       });
  //     } else {
  //       setShowWarningCard(false);
  //     }
  //   }
  // }, [showWarningCard, cardToDelete]);

  useEffect(() => {
    if (showWarningCollection) {
      const warningDelete = window.confirm(
        "Are you sure you want to delete this colelction? It will be gone forever."
      );
      if (warningDelete && user && collection) {
        deleteCollectionById({ user, collection });
        window.location.href = "/all-collections";
      } else {
        setShowWarningCollection(false);
      }
    }
  }, [showWarningCollection]);

  const changeShowWarning = () => {
    setShowWarningCard(true);
  };
  // const changeCardToDelete = (card: ICardFromDB) => {
  //   setCardToDelete(card);
  // };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h2 className="m-0">{collectionNameToShow}</h2>
        <div className="d-flex flex-column align-items-end">
          <BreadCrumbs pageParam="collection" collectionName={collectionName} />
          {collection?.collection_name !== `Master_Collection` ? (
            <h5
              className="bi bi-trash3 pe-4 m-0"
              onClick={() => setShowWarningCollection(true)}
            ></h5>
          ) : null}
        </div>
      </div>
      <div
        style={{ minHeight: "80vh", outline: "1px solid black" }}
        className="mt-2 p-2 d-flex flex-column"
      >
        {!isLoading ? (
          <>
            {cardList.length !== 0 || collection?.api_set_id !== null ? (
              <>
                {collection && collection?.api_set_id === null ? (
                  <ul
                    className="d-flex flex-wrap justify-content-around"
                    style={{ listStyle: "none", padding: 0 }}
                  >
                    {cardList.slice(start, end).map((card: ICardFromDB) => (
                      <li key={card.api_card_id} className="pt-2 px-1">
                        <p className="fw-semibold ps-1 m-0">
                          {card.api_pkmn_name}
                        </p>
                        <SmallPkmnCard
                          card={card}
                          collectionName={collectionName}
                          changeShowWarning={changeShowWarning}
                          cardList={cardList}
                          getData={getData}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul
                    className="d-flex flex-wrap justify-content-around"
                    style={{ listStyle: "none", padding: 0 }}
                  >
                    {cardsFromApiList.map((cardFromApi: IPkmnCard) => (
                      <li key={cardFromApi.id} className="pt-2 px-1">
                        <p className="fw-semibold ps-1 m-0">
                          {cardFromApi.name}
                        </p>

                        <SmallPkmnCard
                          cardFromApi={cardFromApi}
                          collectionName={collectionName}
                          changeShowWarning={changeShowWarning}
                          getData={getData}
                          cardList={cardList}
                        />
                      </li>
                    ))}
                  </ul>
                )}
                {pageInfo ? (
                  <div className="d-flex justify-content-center mt-auto">
                    <Pagination
                      page={pageInfo.page}
                      pageSize={pageInfo.pageSize}
                      totalCount={pageInfo.totalCount}
                      updateSearch={updateSearch}
                    />
                  </div>
                ) : (
                  <div className="d-flex justify-content-center mt-auto">
                    <Pagination
                      page={page}
                      pageSize={isDesktop ? 50 : 20}
                      totalCount={cardList.length}
                      updateSearch={updateSearch}
                    />
                  </div>
                )}
              </>
            ) : (
              <>Doesn't appear to be any cards in this collection</>
            )}
          </>
        ) : (
          <LoadingModule />
        )}
      </div>
    </>
  );
};
