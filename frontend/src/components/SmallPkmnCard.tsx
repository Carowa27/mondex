import { useContext, useState } from "react";
import { IPkmnCard } from "../interfaces/dataFromApi";
import { BigPkmnCard } from "./BigPkmnCard";
import { SwapCollectionPopUp } from "./SwapCollectionPopUp";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { DeleteCardPopUp } from "./DeleteCardPopUp";
import { ContainerContext } from "../globals/containerContext";
import { ICard, ICollection } from "../interfaces/LSInterface";

interface IProps {
  card?: ICard;
  cardFromApi?: IPkmnCard;
  collectionName: string;
  cardList: ICard[];
  getData: () => void;
}

export const SmallPkmnCard = ({
  card,
  cardFromApi,
  collectionName,
  getData,
  cardList,
}: IProps) => {
  const { container, updateContainer } = useContext(ContainerContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  // const { isAuthenticated, user } = useAuth0();
  const [showCardAlternatives, setShowCardAlternatives] = useState<string>("");
  const [hoverPlusBtn, setHoverPlusBtn] = useState<boolean>(false);
  const [hoverMinusBtn, setHoverMinusBtn] = useState<boolean>(false);
  const [hoverInfoBtn, setHoverInfoBtn] = useState<boolean>(false);
  const [hoverSwapBtn, setHoverSwapBtn] = useState<boolean>(false);
  const [showSwapCollection, setShowSwapCollection] = useState<boolean>(false);
  const [showDeleteCard, setShowDeleteCard] = useState<boolean>(false);
  const [seeBigCard, setSeeBigCard] = useState<boolean>(false);
  const [infoCard, setInfoCard] = useState<ICard>();
  const [infoPkmnCard, setInfoPkmnCard] = useState<IPkmnCard>();
  const [cardToSwap, setCardToSwap] = useState<ICard>();
  const [cardToDelete, setCardToDelete] = useState<ICard>();
  const theme = container.theme;

  const handleSwap = (
    card: ICard | undefined,
    cardFromApi: IPkmnCard | undefined
  ) => {
    console.log("toSwap", card, cardFromApi);
    // if (card !== undefined) {
    //   setCardToSwap(card);
    // }
    // if (cardFromApi !== undefined) {
    //   setCardToSwap(
    //     cardList.find((IPkmnCard) => card?.id === card.id)
    //   );
    // }
    // setShowSwapCollection(true);
  };
  const addCard = (
    card: ICard | undefined,
    cardFromApi: IPkmnCard | undefined
  ) => {
    const collectionIndex = container.user!.collections.findIndex(
      (col) => col.collection_name === collectionName
    );
    if (container.user) {
      if (cardFromApi) {
        const cardFound = cardList.find(
          (card) => card.card.id === cardFromApi.id
        );
        if (cardFound !== undefined) {
          // om kort hittas amount+1
          // addAmountOnCard({ user, card });
          const cardIndex = container.user.collections[
            collectionIndex
          ].cards_in_collection.findIndex(
            (c: ICard) => c.card.name === cardFromApi.name
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
          // om kort inte hittas add cart
          const updatedCollection = {
            ...container.user.collections[collectionIndex],
            cards_in_collection: [
              ...container.user.collections[collectionIndex]
                .cards_in_collection,
              { card: cardFromApi, amount: 1 },
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
          // createCard({ user, cardFromApi, collectionName });
        }
      }
      if (card) {
        // addAmountOnCard({ user, card });
        const cardIndex = container.user.collections[
          collectionIndex
        ].cards_in_collection.findIndex(
          (c: ICard) => c.card.name === card.card.name
        );
        const updatedCard = {
          ...container.user.collections[collectionIndex].cards_in_collection[
            cardIndex
          ],
          amount: card.amount + 1,
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
      }
    }
    setTimeout(() => {
      getData();
    }, 100);
  };

  const delCard = (
    card: ICard | undefined,
    cardFromApi: IPkmnCard | undefined
  ) => {
    const collectionIndex = container.user!.collections.findIndex(
      (col) => col.collection_name === collectionName
    );
    if (container.user) {
      if (cardFromApi) {
        const cardFound = cardList.find(
          (card) => card.card.id === cardFromApi.id
        );
        if (cardFound !== undefined) {
          if (cardFound.amount > 1) {
            // om kort hittas & amount===1 amount-1
            // addAmountOnCard({ user, card });
            const cardIndex = container.user.collections[
              collectionIndex
            ].cards_in_collection.findIndex(
              (c: ICard) => c.card.name === cardFromApi.name
            );
            const updatedCard = {
              ...container.user.collections[collectionIndex]
                .cards_in_collection[cardIndex],
              amount: cardFound!.amount - 1,
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
            const cardIndex = container.user.collections[
              collectionIndex
            ].cards_in_collection.findIndex(
              (c: ICard) => c.card.name === cardFromApi.name
            );
            const updatedCollection = {
              ...container.user.collections[collectionIndex],
              cards_in_collection: [
                ...container.user.collections[
                  collectionIndex
                ].cards_in_collection.filter((_, index) => index !== cardIndex),
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
      } else {
        if (card) {
          const cardIndex = container.user.collections[
            collectionIndex
          ].cards_in_collection.findIndex(
            (c: ICard) => c.card.name === card.card.name
          );
          const updatedCollection = {
            ...container.user.collections[collectionIndex],
            cards_in_collection: [
              ...container.user.collections[
                collectionIndex
              ].cards_in_collection.filter((_, index) => index !== cardIndex),
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
    }
    setTimeout(() => {
      getData();
    }, 100);
  };
  const subAmount = (cardFromApi?: IPkmnCard, card?: ICard) => {
    if (cardFromApi !== undefined) {
      const card = cardList.find((card) => card.card.id === cardFromApi.id);
      if (card !== undefined && container.user) {
        if (card.amount !== 0) {
          if (card.amount === 1) {
            setShowDeleteCard(true);
            setCardToDelete(card);
          } else {
            delCard(card, cardFromApi);
          }
        }
      }
    } else {
      if (card !== undefined && container.user) {
        if (card.amount !== 0) {
          if (card.amount === 1) {
            setShowDeleteCard(true);
            setCardToDelete(card);
          } else {
            delCard(card, cardFromApi);
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
    card: ICard | undefined,
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
            cardToDelete={cardToDelete}
            collectionName={collectionName}
            updateData={updateData}
            delCard={delCard}
          ></DeleteCardPopUp>
        </div>
      ) : null}
      {showSwapCollection ? (
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
            backgroundColor: `rgba(${theme?.primaryColors.black.rgb}, 0.7)`,
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
            card ? card.card.id : cardFromApi ? cardFromApi.id : ""
          )
        }
        onMouseLeave={() => setShowCardAlternatives("")}
      >
        {(showCardAlternatives && container.user) || !isDesktop ? (
          <div
            className="px-2 py-3"
            style={
              showCardAlternatives ===
                (card !== undefined
                  ? card.card.id
                  : cardFromApi
                  ? cardFromApi.id
                  : "") || !isDesktop
                ? {
                    display: "flex",
                    zIndex: 300,
                    position: "absolute",
                    color: `${theme?.primaryColors.text.hex}`,
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
                backgroundColor: `${theme?.primaryColors.buttonBackground.hex}`,
                padding: "0.3rem",
              }}
            >
              <span
                style={
                  hoverPlusBtn
                    ? {
                        backgroundColor: `rgba(${theme?.typeColors.grass.rgb},0.6)`,
                        width: "1.7rem",
                        height: "1.7rem",
                      }
                    : {
                        backgroundColor: `rgba(${theme?.typeColors.grass.rgb},0.4)`,
                        width: "1.7rem",
                        height: "1.7rem",
                      }
                }
                className="rounded-circle d-flex align-items-center justify-content-center"
                onMouseEnter={() => setHoverPlusBtn(true)}
                onMouseLeave={() => setHoverPlusBtn(false)}
                // onClick={() =>
                //   addCardToCollection({
                //     cardFromApi,
                //     card,
                //     cardList,
                //     collectionName,
                //   })
                // }
                onClick={() => addCard(card, cardFromApi)}
              >
                <i title="add amount" className="bi bi-plus m-0 p-0"></i>
              </span>
              <span
                style={
                  hoverMinusBtn
                    ? {
                        backgroundColor: `rgba(${theme?.typeColors.fire.rgb},0.6)`,
                        width: "1.7rem",
                        height: "1.7rem",
                      }
                    : {
                        backgroundColor: `rgba(${theme?.typeColors.fire.rgb},0.4)`,
                        width: "1.7rem",
                        height: "1.7rem",
                      }
                }
                className={
                  (cardFromApi &&
                    cardList.find(
                      (cardFromDb) => cardFromDb.card.id === cardFromApi.id
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
                        backgroundColor: `rgba(${theme?.typeColors.fighting.rgb},0.6)`,
                        width: "1.7rem",
                        height: "1.7rem",
                      }
                    : {
                        backgroundColor: `rgba(${theme?.typeColors.fighting.rgb},0.4)`,
                        width: "1.7rem",
                        height: "1.7rem",
                      }
                }
                className={
                  (cardFromApi &&
                    cardList.find(
                      (cardFromDb) => cardFromDb.card.id === cardFromApi.id
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
                        backgroundColor: `rgba(${theme?.typeColors.water.rgb},0.6)`,
                        width: "1.7rem",
                        height: "1.7rem",
                      }
                    : {
                        backgroundColor: `rgba(${theme?.typeColors.water.rgb},0.4)`,
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
            color: `${theme?.primaryColors.text.hex}`,
            aspectRatio: "auto",
            width: isDesktop ? "13.2rem" : "10rem",
            height: isDesktop ? "18.2rem" : "14.5rem",
            fontSize: "16px",
            alignItems: "end",
            justifyContent: "end",
          }}
        >
          {(cardFromApi &&
            cardList.find((cardFromDb) => cardFromDb.card.id === cardFromApi.id)
              ?.amount) ||
          (card && card.amount) ? (
            <span
              style={{
                backgroundColor: `${theme?.primaryColors.white.hex}`,
                width: isDesktop ? "40px" : "30px",
                height: isDesktop ? "40px" : "30px",
                border: "1px grey solid",
              }}
              className="rounded-circle d-flex align-items-center justify-content-center"
            >
              <i
                className="m-0 p-0"
                style={{ color: theme?.primaryColors.black.hex }}
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
                      (cardFromDb) => cardFromDb.card.id === cardFromApi.id
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
              ? cardList.find((card) => card.card.id === cardFromApi.id)
                ? { width: "100%", opacity: 1 }
                : {
                    width: "100%",
                    opacity: 0.6,
                    filter: "grayscale(100%)",
                  }
              : { width: "100%" }
          }
          src={
            (card && card.card.images.small) ||
            (cardFromApi && cardFromApi.images.small)
          }
          alt={card && card.card.name}
        />
      </div>
    </>
  );
};
