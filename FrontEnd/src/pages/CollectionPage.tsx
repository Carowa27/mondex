import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { useAuth0 } from "@auth0/auth0-react";
import { LoadingModule } from "../components/LoadingModule";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../globals/language/language";
import { ThemeContext } from "../globals/theme";
import {
  addAmountOnCard,
  getAllCardsFromCollectionById,
  getAllOwnedCards,
  subAmountOnCard,
} from "../services/cardServices";
import { ICardFromDB } from "../interfaces/dataFromDB";

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
  const [showCardAlternatives, setShowCardAlternatives] = useState<string>("");
  const [hoverPlusBtn, setHoverPlusBtn] = useState<boolean>(false);
  const [hoverMinusBtn, setHoverMinusBtn] = useState<boolean>(false);

  const collectionName = window.location.href.split("/")[4];
  const getData = async () => {
    if (isAuthenticated && user && collectionName) {
      await getAllCardsFromCollectionById({ collectionName, user }).then(
        (res) => {
          setCardList(res as ICardFromDB[]);
        }
      );
    }
  };
  useEffect(() => {
    getData();
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (cardList.length !== 0) {
      setIsLoading(false);
    }
  }, [cardList]);

  return (
    <>
      <h2>{collectionName}</h2>
      <div
        style={{ minHeight: "80vh", outline: "1px solid black" }}
        className="mt-3 p-2"
      >
        {!isLoading ? (
          <>
            {cardList.length !== 0 ? (
              <>
                <ul
                  className="d-flex flex-wrap justify-content-around"
                  style={{ listStyle: "none", padding: 0 }}
                >
                  {cardList.map((card: ICardFromDB) => (
                    <li
                      key={card.api_card_id}
                      className="pt-2 px-1"
                      onClick={() => {
                        console.log(card.api_card_img_src_large);
                      }}
                      onMouseEnter={() =>
                        setShowCardAlternatives(card.api_card_id)
                      }
                      onMouseLeave={() => setShowCardAlternatives("")}
                    >
                      <p className="fw-semibold ps-1 m-0">
                        {card.api_pkmn_name}
                      </p>
                      <div
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
                                onClick={() => (
                                  addAmountOnCard({ user, card }),
                                  setTimeout(() => {
                                    getData();
                                  }, 100)
                                )}
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
                                onClick={() => (
                                  subAmountOnCard({ user, card }),
                                  setTimeout(() => {
                                    getData();
                                  }, 100)
                                )}
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
                      </div>
                    </li>
                  ))}
                </ul>
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
