import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { LoadingModule } from "../components/LoadingModule";
import { useContext, useEffect, useState } from "react";
import { IPkmnCard } from "../interfaces/dataFromApi";
import { getPkmnFromApi } from "../services/pkmnTcgApiServices";
import { SmallPkmnCard } from "../components/SmallPkmnCard";
import { Pagination } from "./layout/Pagination";
import { BreadCrumbs } from "./layout/BreadCrumbs";
import { DeleteCardPopUp } from "../components/DeleteCardPopUp";
import { ContainerContext } from "../globals/containerContext";
import { ICard, ICollection } from "../interfaces/LSInterface";
import { getMondexLs } from "../functions/LSFunctions";

export const CollectionPage = () => {
  const { container } = useContext(ContainerContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cardList, setCardList] = useState<ICard[]>([]);
  const [cardsFromApiList, setCardsFromApiList] = useState<IPkmnCard[]>([]);
  const [collection, setCollection] = useState<ICollection>();

  const [pageInfo, setPageInfo] = useState<{
    page: number;
    pageSize: number;
    totalCount: number;
  }>();
  const [page, setPage] = useState<number>(1);
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(isDesktop ? 50 : 20);
  const [showDeleteCollection, setShowDeleteCollection] =
    useState<boolean>(false);
  const language = container.language;
  const collectionName = window.location.href.split("/")[4];
  const collectionNameToShow = collectionName.replace(/_/g, " ");
  const theme = container.theme;

  const getData = async () => {
    if (collectionName) {
      const lsContainer = getMondexLs();
      const collection = lsContainer.user!.collections.find(
        (col: ICollection) => col.collection_name === collectionName
      );
      setCardList(collection?.cards_in_collection as ICard[]);
      setCollection(collection);
    }
  };

  const updateSearch = (newPage: number) => {
    setPage(newPage);
    setCardsFromApiList([]);
    setIsLoading(true);
    if (collection?.set !== undefined) {
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
    getData();
    getPkmnToSet();
  }, []);
  useEffect(() => {
    getPkmnToSet();
  }, [collection]);

  useEffect(() => {
    getPkmnToSet();
  }, [page]);

  useEffect(() => {
    if (collection) {
      // setIsLoading(false);
      if (cardList.length !== 0 && collection.set === null) {
        setIsLoading(false);
      }
      if (cardsFromApiList.length !== 0 && collection.set !== null) {
        setIsLoading(false);
      }
    }
  }, [cardList, cardsFromApiList, collection]);

  const getPkmnToSet = async () => {
    if (collection && collection.set !== undefined) {
      await getPkmnFromApi(`?q=!set.id:%22${collection.set.id}%22`, page).then(
        (res) => {
          if (res) {
            setCardsFromApiList(res.data as IPkmnCard[]);
            setPageInfo({
              page: res.page,
              pageSize: res.pageSize,
              totalCount: res.totalCount,
            });
          }
        }
      );
    }
  };

  const changeShowDeleteCardPopUp = () => {
    setShowDeleteCollection(false);
  };

  const updateData = () => {
    setTimeout(() => {
      getData();
    }, 500);
  };
  return (
    <>
      {showDeleteCollection ? (
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
          onClick={changeShowDeleteCardPopUp}
        >
          <DeleteCardPopUp
            changeShowDeleteCardPopUp={changeShowDeleteCardPopUp}
            collection={collection}
            collectionName={collectionName}
            updateData={updateData}
          ></DeleteCardPopUp>
        </div>
      ) : null}
      <div className="d-flex justify-content-between">
        <h3 className="m-0 align-self-center">
          {collectionNameToShow}
          {collection?.set !== undefined && (
            <span style={{ fontSize: "16px", margin: "0 1rem" }}>
              Set id: {collection.set?.id.replace("pt", ".")}
            </span>
          )}
        </h3>
        {collection?.set !== undefined && (
          <div style={{ alignSelf: "center" }}>
            {isDesktop ? (
              <img
                src={collection?.set?.images.logo}
                alt={`${collection?.set?.name} logo`}
                style={{
                  maxHeight: "5rem",
                }}
              />
            ) : (
              <p>{collection.set?.name}</p>
            )}
          </div>
        )}
        <div className="d-flex flex-column align-items-end">
          <BreadCrumbs pageParam="collection" collectionName={collectionName} />
          {collection?.collection_name !== `Main_Collection` ? (
            <h5
              className="bi bi-trash3 pe-4 m-0"
              onClick={() => setShowDeleteCollection(true)}
            ></h5>
          ) : null}
        </div>
      </div>
      <div style={{ minHeight: "80vh" }} className="mt-2  d-flex flex-column">
        {!isLoading ? (
          <>
            {collection?.cards_in_collection.length === 0 ||
              (collection?.cards_in_collection.length === 0 &&
                collection?.set?.id !== undefined && (
                  <>{language?.lang_code.collection_with_no_cards_more_words}</>
                ))}
            {(cardList?.length !== 0 || collection?.set?.id !== null) && (
              <>
                {collection && collection?.set?.id === undefined ? (
                  <ul
                    className={
                      isDesktop
                        ? "d-flex flex-wrap justify-content-around p-0"
                        : "d-flex flex-wrap justify-content-between p-0"
                    }
                    style={{ listStyle: "none" }}
                  >
                    {cardList.slice(start, end).map((card: ICard) => (
                      <li
                        key={card.card.id}
                        className={
                          isDesktop
                            ? "pt-2 px-1"
                            : "pt-2 d-flex justify-content-center"
                        }
                      >
                        {isDesktop && (
                          <p className="fw-semibold ps-1 m-0">
                            {card.card.name}
                          </p>
                        )}
                        <SmallPkmnCard
                          card={card}
                          collectionName={collectionName}
                          cardList={cardList}
                          getData={getData}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul
                    className={
                      isDesktop
                        ? "d-flex flex-wrap justify-content-around p-0"
                        : "d-flex flex-wrap justify-content-between p-0"
                    }
                    style={{ listStyle: "none" }}
                  >
                    {cardsFromApiList.map((cardFromApi: IPkmnCard) => (
                      <li
                        key={cardFromApi.id}
                        className={
                          isDesktop
                            ? "pt-2 px-1"
                            : "pt-2 d-flex justify-content-center"
                        }
                      >
                        {isDesktop && (
                          <p className="fw-semibold ps-1 m-0">
                            {cardFromApi.name}
                          </p>
                        )}

                        <SmallPkmnCard
                          cardFromApi={cardFromApi}
                          collectionName={collectionName}
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
            )}
          </>
        ) : (
          <LoadingModule />
        )}
      </div>
    </>
  );
};
