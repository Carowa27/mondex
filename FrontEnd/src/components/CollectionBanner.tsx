import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllOwnedCards } from "../services/cardServices";
import { useState, useEffect } from "react";
import { ICardFromDB } from "../interfaces/dataFromDB";

interface IProps {
  type?: string;
  collectionName: string;
}

export const CollectionBanner = (props: IProps) => {
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { user, isAuthenticated } = useAuth0();
  const [cards, setCards] = useState<ICardFromDB[]>([]);

  useEffect(() => {
    if (isAuthenticated && user) {
      getAllOwnedCards({ user }).then((res) => {
        console.log("res", res);
        const cardsInCollection = res.filter(
          (card) => card.collection_name === props.collectionName
        );
        console.log(cardsInCollection);
        setCards(cardsInCollection);
      });
    }
  }, [isAuthenticated]);
  console.log("cardState", cards);
  return (
    <>
      {/* {collections.length !== 0 ? (
        <div>
          <ul>
            {collections.map((collection) => (
              <li key={collection.id}>{collection.collection_name}</li>
            ))}
          </ul>
        </div>
      ) : null} */}
      {isAuthenticated && (
        <>
          {isDesktop ? (
            <div
              className={
                window.location.pathname === "/"
                  ? "py-2 my-3"
                  : "py-2 my-3 col-5"
              }
            >
              <h6>{props.collectionName}</h6>

              <div className="row d-flex justify-content-around px-3">
                {cards.length !== 0 ? (
                  <div>
                    <ul
                      className="d-flex flex-wrap justify-content-around"
                      style={{ listStyle: "none", padding: 0 }}
                    >
                      {cards.slice(0, 5).map((card) => (
                        <li key={card.id} className="pt-2">
                          <p style={{ margin: "0" }}>{card.api_pkmn_name}</p>
                          <div style={{ aspectRatio: "3/4", height: "7.5rem" }}>
                            <img
                              style={{ height: "100%" }}
                              src={card.api_card_img_src_small}
                              alt={card.api_pkmn_name}
                            />
                          </div>
                          <p className="w-100 mx-auto" style={{ margin: "0" }}>
                            {card.api_card_id}
                          </p>
                        </li>
                      ))}
                    </ul>
                    <div className="w-100 d-flex justify-content-end">
                      <i>See all cards</i>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <div
              style={{ outline: "2px blue solid", width: "100%" }}
              className="py-2 my-2"
            >
              <h6>{props.collectionName}</h6>

              <div className="px-3">
                {cards.length !== 0 ? (
                  <div>
                    <ul
                      className="d-flex flex-wrap justify-content-around"
                      style={{ listStyle: "none", padding: 0 }}
                    >
                      {cards.slice(0, 2).map((card) => (
                        <li key={card.id} className="pt-2">
                          <p style={{ margin: "0" }}>
                            {card.api_pkmn_name}, {card.api_card_id}
                          </p>
                          <div style={{ aspectRatio: "3/4", height: "8rem" }}>
                            <img
                              style={{ height: "100%" }}
                              src={card.api_card_img_src_small}
                              alt={card.api_pkmn_name}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="w-100 d-flex justify-content-end">
                      <i>See all cards</i>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
