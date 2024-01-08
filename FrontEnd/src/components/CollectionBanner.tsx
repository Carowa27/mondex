import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllOwnedCards } from "../services/cardServices";
import { useState, useEffect, useContext } from "react";
import { ICardFromDB } from "../interfaces/dataFromDB";
import { Link } from "react-router-dom";
import { LanguageContext } from "../globals/language/language";
import { ThemeContext } from "../globals/theme";

interface IProps {
  type?: string;
  collectionName: string;
}

export const CollectionBanner = (props: IProps) => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { user, isAuthenticated } = useAuth0();
  const [cards, setCards] = useState<ICardFromDB[]>([]);

  useEffect(() => {
    if (isAuthenticated && user) {
      const getData = async () => {
        await getAllOwnedCards({ user }).then((res) => {
          if (res) {
            const cardsInCollection = res.filter(
              (card: ICardFromDB) =>
                card.collection_name === props.collectionName
            );

            setCards(cardsInCollection);
          }
        });
      };
      getData();
    }
  }, [isAuthenticated]);

  const collectionName = props.collectionName.replace(/_/g, " ");
  return (
    <>
      {isAuthenticated && (
        <>
          <div
            // style={{ width: "100%" }}
            className={
              window.location.pathname === "/"
                ? "mb-2 border rounded p-1 w-100"
                : "py-2 my-3 col-5 border rounded w-100"
            }
          >
            <h6 className={"ms-2 mt-1 mb-0"}>
              <Link
                to={`/collection/${props.collectionName}`}
                className="text-decoration-none"
                style={{
                  color: theme.primaryColors.link.hex,
                }}
              >
                {collectionName}
              </Link>
            </h6>

            <div
              className={
                isDesktop ? "row d-flex justify-content-around px-3" : "px-3"
              }
            >
              {cards.length !== 0 ? (
                <div>
                  <ul
                    className={
                      isDesktop
                        ? "d-flex flex-wrap justify-content-around align-items-end"
                        : "d-flex flex-wrap justify-content-around"
                    }
                    style={{ listStyle: "none", padding: 0 }}
                  >
                    {isDesktop ? (
                      <>
                        {cards.slice(0, 4).map((card) => (
                          <li
                            key={card.id}
                            className="pt-2"
                            style={{ width: "min-content" }}
                          >
                            <p
                              style={{ margin: "0", width: "100%" }}
                              className="text-wrap"
                            >
                              {card.api_pkmn_name}
                            </p>
                            <div
                              style={{ aspectRatio: "3/4", height: "7.5rem" }}
                            >
                              <img
                                style={{ height: "100%" }}
                                src={card.api_card_img_src_small}
                                alt={card.api_pkmn_name}
                              />
                            </div>
                            <p
                              className="w-100 mx-auto"
                              style={{ margin: "0" }}
                            >
                              {card.api_card_id}
                            </p>
                          </li>
                        ))}
                      </>
                    ) : (
                      <>
                        {" "}
                        {cards.slice(0, 2).map((card) => (
                          <li key={card.id} className="pt-1">
                            <p style={{ margin: "0" }}>{card.api_pkmn_name}</p>
                            <div style={{ aspectRatio: "3/4", height: "8rem" }}>
                              <img
                                style={{ height: "100%" }}
                                src={card.api_card_img_src_small}
                                alt={card.api_pkmn_name}
                              />
                            </div>
                          </li>
                        ))}
                      </>
                    )}
                  </ul>
                  <div className="w-100 d-flex justify-content-end">
                    <Link
                      to={`/collection/${props.collectionName}`}
                      style={{
                        color: theme.primaryColors.link.hex,
                      }}
                    >
                      <i>{language.lang_code.see_all_cards}</i>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <p>no cards in collection yet </p>
                  <div className="w-100 d-flex justify-content-end">
                    <Link
                      to={`/collection/${props.collectionName}`}
                      style={{
                        color: theme.primaryColors.link.hex,
                      }}
                    >
                      <i>{language.lang_code.see_collection}</i>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
