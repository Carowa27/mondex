import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../globals/theme";
import { IPkmnCard } from "../interfaces/dataFromApi";
import { ICardFromDB } from "../interfaces/dataFromDB";
import { LanguageContext } from "../globals/language/language";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { useAuth0 } from "@auth0/auth0-react";
import {
  addAmountOnCard,
  createCard,
  deleteOwnedCardById,
  getAllCardsFromCollectionById,
  subAmountOnCard,
} from "../services/cardServices";

interface IProps {
  card?: ICardFromDB;
  cardFromApi?: IPkmnCard;
  collectionName: string;
  changeShowWarning: () => void;
  cardList: ICardFromDB[];
  getData: () => void;
  changeCardToDelete: (card: ICardFromDB) => void;
}

export const SmallPkmnCard = ({
  card,
  cardFromApi,
  collectionName,
  changeShowWarning,
  getData,
  cardList,
  changeCardToDelete,
}: IProps) => {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { isAuthenticated, user } = useAuth0();
  const [showCardAlternatives, setShowCardAlternatives] = useState<string>("");
  const [hoverPlusBtn, setHoverPlusBtn] = useState<boolean>(false);
  const [hoverMinusBtn, setHoverMinusBtn] = useState<boolean>(false);
  const [hoverInfoBtn, setHoverInfoBtn] = useState<boolean>(false);
  const [hoverSwapBtn, setHoverSwapBtn] = useState<boolean>(false);

  const subAmount = (cardFromApi?: IPkmnCard, card?: ICardFromDB) => {
    if (cardFromApi !== undefined) {
      const card = cardList.find((card) => card.api_card_id === cardFromApi.id);
      if (card !== undefined && user) {
        if (card.amount !== 0) {
          if (card.amount === 1) {
            changeShowWarning();
            changeCardToDelete(card);
          } else {
            subAmountOnCard({ user, card });
          }
        }
      }
    } else {
      if (card !== undefined && user) {
        if (card.amount !== 0) {
          if (card.amount === 1) {
            changeShowWarning();
            changeCardToDelete(card);
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

  return (
    <>
      {card !== undefined && cardFromApi === undefined ? (
        <div
          style={{
            aspectRatio: "3/4",
            width: "12.5rem",
          }}
          onMouseEnter={() => setShowCardAlternatives(card.api_card_id)}
          onMouseLeave={() => setShowCardAlternatives("")}
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
                  onMouseEnter={() => setHoverSwapBtn(true)}
                  onMouseLeave={() => setHoverSwapBtn(false)}
                  onClick={() => console.log("add swap collection fn")}
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
                  onMouseEnter={() => setHoverInfoBtn(true)}
                  onMouseLeave={() => setHoverInfoBtn(false)}
                  onClick={() => {
                    console.log(
                      "show bigCard dbcard",
                      card.api_pkmn_name,
                      card.api_card_img_src_large
                    );
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
                </span>
                {card.amount}
              </i>
            </span>
          </div>
          <img
            style={{ width: "100%" }}
            src={card.api_card_img_src_small}
            alt={card.api_pkmn_name}
          />
        </div>
      ) : null}
      {cardFromApi !== undefined && card === undefined ? (
        <div
          style={{
            aspectRatio: "3/4",
            width: "12.5rem",
          }}
          onMouseEnter={() => setShowCardAlternatives(cardFromApi.id)}
          onMouseLeave={() => setShowCardAlternatives("")}
        >
          {showCardAlternatives && isAuthenticated ? (
            <div
              className="px-2 py-3"
              style={
                showCardAlternatives === cardFromApi.id
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
                  onMouseEnter={() => setHoverPlusBtn(true)}
                  onMouseLeave={() => setHoverPlusBtn(false)}
                  onClick={() => addAmount(cardFromApi)}
                >
                  <i title="add amount" className="bi bi-plus m-0 p-0"></i>
                </span>
                <span
                  style={
                    hoverMinusBtn
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
                  onMouseEnter={() => setHoverMinusBtn(true)}
                  onMouseLeave={() => setHoverMinusBtn(false)}
                  onClick={() => subAmount(cardFromApi)}
                >
                  <i title="subtract amount" className="bi bi-dash m-0 p-0"></i>
                </span>
                <span
                  style={
                    hoverSwapBtn
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
                  onMouseEnter={() => setHoverSwapBtn(true)}
                  onMouseLeave={() => setHoverSwapBtn(false)}
                  onClick={() => console.log("add swap collection fn")}
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
                  onMouseEnter={() => setHoverInfoBtn(true)}
                  onMouseLeave={() => setHoverInfoBtn(false)}
                  onClick={() => {
                    console.log(
                      "show bigCard Api",
                      cardFromApi.name,
                      cardFromApi.images.large
                    );
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
              width: "13.2rem",
              height: "18.2rem",
              fontSize: "16px",
              alignItems: "end",
              justifyContent: "end",
            }}
          >
            {cardList.find(
              (cardFromDb) => cardFromDb.api_card_id === cardFromApi.id
            ) ? (
              <>
                <span
                  style={{
                    backgroundColor: `${theme.primaryColors.white.hex}`,
                    width: "40px",
                    height: "40px",
                    zIndex: 300,
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
                    </span>
                    {
                      cardList.find(
                        (cardFromDb) =>
                          cardFromDb.api_card_id === cardFromApi.id
                      )?.amount
                    }
                  </i>
                </span>
              </>
            ) : null}
          </div>
          <img
            style={
              cardList.find(
                (cardFromDb) => cardFromDb.api_card_id === cardFromApi.id
              )
                ? { width: "100%", opacity: 1 }
                : {
                    width: "100%",
                    opacity: 0.6,
                    filter: "grayscale(100%)",
                  }
            }
            src={cardFromApi.images.small}
            alt={cardFromApi.name}
          />
        </div>
      ) : null}
    </>
  );
};
