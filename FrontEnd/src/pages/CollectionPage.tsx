import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { useAuth0 } from "@auth0/auth0-react";
import { LoadingModule } from "../components/LoadingModule";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../globals/language/language";
import { ThemeContext } from "../globals/theme";
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

export const CollectionPage = () => {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
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
      }
      if (cardsFromApiList.length !== 0 && collection.api_set_id !== null) {
        setIsLoading(false);
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

  useEffect(() => {
    if (showWarningCard) {
      const warningDelete = window.confirm(
        "Are you sure you want to delete this card?"
      );
      if (warningDelete && user && cardToDelete) {
        const card = cardToDelete;
        deleteOwnedCardById({ user, card }).then(() => {
          setShowWarningCard(false);
        });
      } else {
        setShowWarningCard(false);
      }
    }
  }, [showWarningCard, cardToDelete]);

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
    console.log("changeShowWarning");
  };
  const changeCardToDelete = (card: ICardFromDB) => {
    setCardToDelete(card);
    console.log("changeCardToDelete");
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
            {cardList.length !== 0 || collection?.api_set_id !== null ? (
              <>
                {collection && collection?.api_set_id === null ? (
                  <ul
                    className="d-flex flex-wrap justify-content-around"
                    style={{ listStyle: "none", padding: 0 }}
                  >
                    {cardList.map((card: ICardFromDB) => (
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
                          changeCardToDelete={changeCardToDelete}
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
                          changeCardToDelete={changeCardToDelete}
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
