import { useContext, useState } from "react";
import { ThemeContext } from "../globals/theme";
import { IPkmnCard } from "../interfaces/dataFromApi";
import { ICardFromDB } from "../interfaces/dataFromDB";
import { useAuth0 } from "@auth0/auth0-react";
import {
  addAmountOnCard,
  createCard,
  subAmountOnCard,
} from "../services/cardServices";
import { BigPkmnCard } from "./BigPkmnCard";
import { SwapCollectionPopUp } from "./SwapCollectionPopUp";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { DeleteCardPopUp } from "./DeleteCardPopUp";

interface IProps {
  card?: ICardFromDB;
  cardFromApi?: IPkmnCard;
  collectionName: string;
  cardList: ICardFromDB[];
  getData: () => void;
}

export const SmallPkmnCard = ({
  card,
  cardFromApi,
  collectionName,
  getData,
  cardList,
}: IProps) => {
  const { theme } = useContext(ThemeContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { isAuthenticated, user } = useAuth0();
  const [showCardAlternatives, setShowCardAlternatives] = useState<string>("");
  const [hoverPlusBtn, setHoverPlusBtn] = useState<boolean>(false);
  const [hoverMinusBtn, setHoverMinusBtn] = useState<boolean>(false);
  const [hoverInfoBtn, setHoverInfoBtn] = useState<boolean>(false);
  const [hoverSwapBtn, setHoverSwapBtn] = useState<boolean>(false);
  const [showSwapCollection, setShowSwapCollection] = useState<boolean>(false);
  const [showDeleteCard, setShowDeleteCard] = useState<boolean>(false);
  const [seeBigCard, setSeeBigCard] = useState<boolean>(false);
  const [infoCard, setInfoCard] = useState<ICardFromDB>();
  const [infoPkmnCard, setInfoPkmnCard] = useState<IPkmnCard>();
  const [cardToSwap, setCardToSwap] = useState<ICardFromDB>();
  const [cardToDelete, setCardToDelete] = useState<ICardFromDB>();

  const handleSwap = (
    card: ICardFromDB | undefined,
    cardFromApi: IPkmnCard | undefined
  ) => {
    if (card !== undefined) {
      setCardToSwap(card);
    }
    if (cardFromApi !== undefined) {
      setCardToSwap(
        cardList.find((cardFromDb) => cardFromDb.api_card_id === cardFromApi.id)
      );
    }
    setShowSwapCollection(true);
  };

  const subAmount = (cardFromApi?: IPkmnCard, card?: ICardFromDB) => {
    if (cardFromApi !== undefined) {
      const card = cardList.find((card) => card.api_card_id === cardFromApi.id);
      if (card !== undefined && user) {
        if (card.amount !== 0) {
          if (card.amount === 1) {
            setShowDeleteCard(true);
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
            setShowDeleteCard(true);
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

  const updateData = () => {
    setTimeout(() => {
      getData();
    }, 500);
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
  const changeShowPkmnInfo = () => {
    setSeeBigCard(false);
  };
  const changeShowSwapPopUp = () => {
    setShowSwapCollection(false);
  };
  const changeShowDeleteCardPopUp = () => {
    setShowDeleteCard(false);
  };
  const saveCardToGetInfoOn = (
    card: ICardFromDB | undefined,
    pkmnCard: IPkmnCard | undefined
  ) => {
    if (card !== undefined) {
      setInfoCard(card);
    }
    if (pkmnCard !== undefined) {
      setInfoPkmnCard(pkmnCard);
    }
  };

  return (
    <>
      {showDeleteCard ? (
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
          onClick={changeShowDeleteCardPopUp}
        >
          <DeleteCardPopUp
            changeShowDeleteCardPopUp={changeShowDeleteCardPopUp}
            cardToDelete={cardToDelete}
            collectionName={collectionName}
            updateData={updateData}
          ></DeleteCardPopUp>
        </div>
      ) : null}
      {showSwapCollection ? (
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
          onClick={changeShowPkmnInfo}
        >
          <SwapCollectionPopUp
            changeShowSwapPopUp={changeShowSwapPopUp}
            cardToSwap={cardToSwap}
            collectionName={collectionName}
            updateData={updateData}
          ></SwapCollectionPopUp>
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
            zIndex: "400",
          }}
          className="d-flex justify-content-center align-items-center"
          onClick={changeShowPkmnInfo}
        >
          <BigPkmnCard
            card={infoCard}
            pkmnCard={infoPkmnCard}
            changeShowPkmnInfo={changeShowPkmnInfo}
          />
        </div>
      ) : null}

      <div
        className={isDesktop ? "" : "mb-2"}
        style={{
          aspectRatio: "3/4",
          width: isDesktop ? "12.5rem" : "10rem",
        }}
        onMouseEnter={() =>
          setShowCardAlternatives(
            card ? card.api_card_id : cardFromApi ? cardFromApi.id : ""
          )
        }
        onMouseLeave={() => setShowCardAlternatives("")}
      >
        {(showCardAlternatives && isAuthenticated) || !isDesktop ? (
          <div
            className="px-2 py-3"
            style={
              showCardAlternatives ===
                (card !== undefined
                  ? card.api_card_id
                  : cardFromApi
                  ? cardFromApi.id
                  : "") || !isDesktop
                ? {
                    display: "flex",
                    zIndex: 300,
                    position: "absolute",
                    color: `${theme.primaryColors.text.hex}`,
                    aspectRatio: "3/4",
                    width: isDesktop ? "12.5rem" : "10rem",
                    fontSize: "20pt",
                    alignItems: "end",
                  }
                : { display: "none" }
            }
          >
            <div
              className="rounded-pill w-100 d-flex justify-content-around"
              style={{
                backgroundColor: `${theme.primaryColors.buttonBackground.hex}`,
                padding: "0.3rem",
              }}
            >
              <span
                style={
                  hoverPlusBtn
                    ? {
                        backgroundColor: `rgba(${theme.typeColors.grass.rgb},0.6)`,
                        width: "1.7rem",
                        height: "1.7rem",
                      }
                    : {
                        backgroundColor: `rgba(${theme.typeColors.grass.rgb},0.4)`,
                        width: "1.7rem",
                        height: "1.7rem",
                      }
                }
                className="rounded-circle d-flex align-items-center justify-content-center"
                onMouseEnter={() => setHoverPlusBtn(true)}
                onMouseLeave={() => setHoverPlusBtn(false)}
                onClick={() => addAmount(cardFromApi, card)}
              >
                <i title="add amount" className="bi bi-plus m-0 p-0"></i>
              </span>
              <span
                style={
                  hoverMinusBtn
                    ? {
                        backgroundColor: `rgba(${theme.typeColors.fire.rgb},0.6)`,
                        width: "1.7rem",
                        height: "1.7rem",
                      }
                    : {
                        backgroundColor: `rgba(${theme.typeColors.fire.rgb},0.4)`,
                        width: "1.7rem",
                        height: "1.7rem",
                      }
                }
                className={
                  (cardFromApi &&
                    cardList.find(
                      (cardFromDb) => cardFromDb.api_card_id === cardFromApi.id
                    )) ||
                  card
                    ? "rounded-circle d-flex align-items-center justify-content-center"
                    : "d-none"
                }
                onMouseEnter={() => setHoverMinusBtn(true)}
                onMouseLeave={() => setHoverMinusBtn(false)}
                onClick={() => subAmount(cardFromApi, card)}
              >
                <i title="subtract amount" className="bi bi-dash m-0 p-0"></i>
              </span>
              <span
                style={
                  hoverSwapBtn
                    ? {
                        backgroundColor: `rgba(${theme.typeColors.fighting.rgb},0.6)`,
                        width: "1.7rem",
                        height: "1.7rem",
                      }
                    : {
                        backgroundColor: `rgba(${theme.typeColors.fighting.rgb},0.4)`,
                        width: "1.7rem",
                        height: "1.7rem",
                      }
                }
                className={
                  (cardFromApi &&
                    cardList.find(
                      (cardFromDb) => cardFromDb.api_card_id === cardFromApi.id
                    )) ||
                  card
                    ? "rounded-circle d-flex align-items-center justify-content-center"
                    : "d-none"
                }
                onMouseEnter={() => setHoverSwapBtn(true)}
                onMouseLeave={() => setHoverSwapBtn(false)}
                onClick={() => handleSwap(card, cardFromApi)}
              >
                <i
                  title="swap collection"
                  className="bi bi-arrow-left-right fs-5"
                ></i>
              </span>
              <span
                style={
                  hoverInfoBtn
                    ? {
                        backgroundColor: `rgba(${theme.typeColors.water.rgb},0.6)`,
                        width: "1.7rem",
                        height: "1.7rem",
                      }
                    : {
                        backgroundColor: `rgba(${theme.typeColors.water.rgb},0.4)`,
                        width: "1.7rem",
                        height: "1.7rem",
                      }
                }
                className="rounded-circle d-flex align-items-center justify-content-center"
                onMouseEnter={() => setHoverInfoBtn(true)}
                onMouseLeave={() => setHoverInfoBtn(false)}
                onClick={() => {
                  setSeeBigCard(true);
                  saveCardToGetInfoOn(card, cardFromApi);
                }}
              >
                <span title="more info" className="fs-5 fw-medium">
                  i
                </span>
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
            width: isDesktop ? "13.2rem" : "10rem",
            height: isDesktop ? "18.2rem" : "14.5rem",
            fontSize: "16px",
            alignItems: "end",
            justifyContent: "end",
          }}
        >
          {(cardFromApi &&
            cardList.find(
              (cardFromDb) => cardFromDb.api_card_id === cardFromApi.id
            )?.amount) ||
          (card && card.amount) ? (
            <span
              style={{
                backgroundColor: `${theme.primaryColors.white.hex}`,
                width: isDesktop ? "40px" : "30px",
                height: isDesktop ? "40px" : "30px",
                border: "1px grey solid",
              }}
              className="rounded-circle d-flex align-items-center justify-content-center"
            >
              <i
                className="m-0 p-0"
                style={{ color: theme.primaryColors.black.hex }}
              >
                <span
                  style={{
                    fontSize: "13px",
                  }}
                >
                  &#x2717;
                </span>
                <span>
                  {cardFromApi &&
                    cardList.find(
                      (cardFromDb) => cardFromDb.api_card_id === cardFromApi.id
                    )?.amount}
                  {card && card.amount}
                </span>
              </i>
            </span>
          ) : null}
        </div>
        <img
          className="rounded"
          style={
            cardFromApi
              ? cardList.find(
                  (cardFromDb) => cardFromDb.api_card_id === cardFromApi.id
                )
                ? { width: "100%", opacity: 1 }
                : {
                    width: "100%",
                    opacity: 0.6,
                    filter: "grayscale(100%)",
                  }
              : { width: "100%" }
          }
          src={
            (card && card.api_card_img_src_small) ||
            (cardFromApi && cardFromApi.images.small)
          }
          alt={card && card.api_pkmn_name}
        />
      </div>
    </>
  );
};
