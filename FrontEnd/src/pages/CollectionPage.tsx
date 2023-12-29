import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { useAuth0 } from "@auth0/auth0-react";
import { LoadingModule } from "../components/LoadingModule";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../globals/language/language";
import { ThemeContext } from "../globals/theme";
import {
  addAmountOnCard,
  createCard,
  deleteOwnedCardById,
  getAllCardsFromCollectionById,
  getAllOwnedCards,
  subAmountOnCard,
} from "../services/cardServices";
import { ICardFromDB, ICollectionFromDB } from "../interfaces/dataFromDB";
import {
  deleteCollectionById,
  getOwnedCollectionByCollectionName,
  getOwnedCollectionById,
} from "../services/collectionServices";
import { IPkmnCard } from "../interfaces/dataFromApi";
import { getPkmnFromApi } from "../services/pkmnApiServices";
import { SmallPkmnCard } from "../components/SmallPkmnCard";

interface IProps {
  collection_id?: number;
}

export const CollectionPage = ({ collection_id }: IProps) => {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { isAuthenticated, user } = useAuth0();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cardList, setCardList] = useState<ICardFromDB[]>([]);
  const [cardsFromApiList, setCardsFromApiList] = useState<IPkmnCard[]>([]);
  const [collection, setCollection] = useState<ICollectionFromDB>();
  const [showCardAlternatives, setShowCardAlternatives] = useState<string>("");
  const [hoverPlusBtn, setHoverPlusBtn] = useState<boolean>(false);
  const [hoverMinusBtn, setHoverMinusBtn] = useState<boolean>(false);
  const [showWarningCard, setShowWarningCard] = useState<boolean>(false);
  const [showWarningCollection, setShowWarningCollection] =
    useState<boolean>(false);
  const [cardToDelete, setCardToDelete] = useState<ICardFromDB>();

  const collectionName = window.location.href.split("/")[4];
  const collectionNameToShow = collectionName.replace(/_/g, " ");
  const getData = async () => {
    if (isAuthenticated && user && collectionName) {
      await getAllCardsFromCollectionById({ collectionName, user }).then(
        (res) => {
          setCardList(res as ICardFromDB[]);
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

  useEffect(() => {
    if (collection) {
      if (cardList.length !== 0 && collection.api_set_id === null) {
        setIsLoading(false);
        console.log("cardlist: ", cardList);
      }
      if (cardsFromApiList.length !== 0 && collection.api_set_id !== null) {
        setIsLoading(false);
        console.log("cardlist & set: ", cardList, cardsFromApiList);
      }
    }
  }, [cardList, cardsFromApiList, collection]);
  useEffect(() => {
    const getSetFromApi = async () => {
      if (collection && collection?.api_set_id !== null) {
        await getPkmnFromApi(
          `https://api.pokemontcg.io/v2/cards?q=!set.id:%22${collection.api_set_id}%22&orderBy=number&pageSize=50&page=1`
        ).then((res) => {
          setCardsFromApiList(res as IPkmnCard[]);
        });
      }
    };
    getSetFromApi();
  }, [collection]);

  const subAmount = (cardFromApi?: IPkmnCard, card?: ICardFromDB) => {
    if (cardFromApi) {
      const card = cardList.find((card) => card.api_card_id === cardFromApi.id);
      if (card !== undefined && user) {
        if (card.amount !== 0) {
          if (card.amount === 1) {
            setShowWarningCard(true);
            setCardToDelete(card);
          } else {
            subAmountOnCard({ user, card });
          }
        }
      }
    } else {
      if (card !== undefined && user) {
        if (card.amount !== 0) {
          if (card.amount === 1) {
            console.log("delete");
            //kommer inte hit?
            setShowWarningCard(true);
            setCardToDelete(card);
          } else {
            subAmountOnCard({ user, card });
          }
        }
      }
    }
    setTimeout(() => {
      getData();
    }, 100);
  };
  const addAmount = (cardFromApi?: IPkmnCard, card?: ICardFromDB) => {
    if (cardFromApi) {
      const card = cardList.find((card) => card.api_card_id === cardFromApi.id);
      if (user) {
        if (card !== undefined) {
          addAmountOnCard({ user, card });
        } else {
          createCard({ user, cardFromApi, collectionName });
        }
      }
    }
    if (card && user) {
      addAmountOnCard({ user, card });
    }
    setTimeout(() => {
      getData();
    }, 100);
  };
  useEffect(() => {
    if (showWarningCard) {
      const warningDelete = window.confirm(
        "Are you sure you want to delete this card?"
      );
      if (warningDelete && user && cardToDelete) {
        const card = cardToDelete;
        console.log("if ", warningDelete);
        deleteOwnedCardById({ user, card });
      } else {
        console.log("else ", warningDelete);
        setShowWarningCard(false);
      }
    }
    console.log("showWarning useeffect", showWarningCard);
  }, [showWarningCard]);

  useEffect(() => {
    if (showWarningCollection) {
      const warningDelete = window.confirm(
        "Are you sure you want to delete this colelction? It will be gone forever."
      );
      if (warningDelete && user && collection) {
        // console.log("if ", collection);
        deleteCollectionById({ user, collection });
        window.location.href = "/all-collections";
      } else {
        console.log("else ", warningDelete);
        setShowWarningCollection(false);
      }
    }
    console.log("showWarning useeffect", showWarningCollection);
  }, [showWarningCollection]);

  const changeShowWarning = () => {
    setShowWarningCard(true);
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h2 className="m-0">{collectionNameToShow}</h2>
        {collection?.collection_name !== `Master_Collection` ? (
          <h5
            className="bi bi-trash3 pe-4 pt-3 m-0"
            onClick={() => setShowWarningCollection(true)}
          ></h5>
        ) : null}
      </div>
      <div
        style={{ minHeight: "80vh", outline: "1px solid black" }}
        className="mt-3 p-2"
      >
        {!isLoading ? (
          <>
            {cardList.length !== 0 ? (
              <>
                {collection && collection?.api_set_id === null ? (
                  <ul
                    className="d-flex flex-wrap justify-content-around"
                    style={{ listStyle: "none", padding: 0 }}
                  >
                    {cardList.map((card: ICardFromDB) => (
                      <li
                        key={card.api_card_id}
                        className="pt-2 px-1"
                        onClick={() => {
                          console.log(
                            "show bigCard",
                            card.api_pkmn_name,
                            card.api_card_img_src_large
                          );
                        }}
                        // onMouseEnter={() =>
                        //   setShowCardAlternatives(card.api_card_id)
                        // }
                        // onMouseLeave={() => setShowCardAlternatives("")}
                      >
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
                        {/* <div
                          style={{
                            aspectRatio: "3/4",
                            width: "12.5rem",
                          }}
                        >
                          {showCardAlternatives && isAuthenticated ? (
                            <div
                              className="px-2 py-3"
                              style={
                                showCardAlternatives === card.api_card_id
                                  ? {
                                      display: "flex",
                                      zIndex: 300,
                                      position: "absolute",
                                      color: `${theme.primaryColors.text.hex}`,
                                      aspectRatio: "3/4",
                                      width: "12.5rem",
                                      fontSize: "20pt",
                                      alignItems: "end",
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
                                    hoverPlusBtn
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
                                  onMouseEnter={() => setHoverPlusBtn(true)}
                                  onMouseLeave={() => setHoverPlusBtn(false)}
                                  onClick={() => addAmount(card)}
                                >
                                  <i className="bi bi-plus m-0 p-0"></i>
                                </span>
                                <span
                                  style={
                                    hoverMinusBtn
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
                                  onMouseEnter={() => setHoverMinusBtn(true)}
                                  onMouseLeave={() => setHoverMinusBtn(false)}
                                  onClick={() => subAmount(card)}
                                >
                                  <i className="bi bi-dash m-0 p-0"></i>
                                </span>
                              </div>
                            </div>
                          ) : null}
                          <div
                            style={{
                              display: "flex",
                              position: "absolute",
                              color: `${theme.primaryColors.text.hex}`,
                              aspectRatio: "auto",
                              width: "13.2rem",
                              height: "18.2rem",
                              fontSize: "16px",
                              alignItems: "end",
                              justifyContent: "end",
                            }}
                          >
                            <span
                              style={{
                                backgroundColor: `${theme.primaryColors.white.hex}`,
                                width: "40px",
                                height: "40px",
                              }}
                              className="rounded-circle d-flex align-items-center justify-content-center"
                            >
                              <i className="m-0 p-0">
                                <span
                                  style={{
                                    fontSize: "13px",
                                  }}
                                >
                                  &#x2717;
                                </span>{" "}
                                {card.amount}
                              </i>
                            </span>
                          </div>
                          <img
                            style={{ width: "100%" }}
                            src={card.api_card_img_src_small}
                            alt={card.api_pkmn_name}
                          />
                        </div> */}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul
                    className="d-flex flex-wrap justify-content-around"
                    style={{ listStyle: "none", padding: 0 }}
                  >
                    {cardsFromApiList.map((cardFromApi: IPkmnCard) => (
                      <li
                        key={cardFromApi.id}
                        className="pt-2 px-1"
                        onClick={() => {
                          console.log(
                            "show bigCard",
                            cardFromApi.name,
                            cardFromApi.images.small
                          );
                        }}
                      >
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
                <div className="d-flex justify-content-center">Paginering</div>
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
