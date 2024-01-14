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
            className={
              window.location.pathname === "/"
                ? "mb-2 rounded p-1 w-100"
                : "py-2 my-3 col-5 rounded w-100"
            }
            style={{ border: `1px solid ${theme.primaryColors.text.hex}` }}
          >
            <h6 className={isDesktop ? "ms-2 mt-1 mb-0" : "ms-2 mt-1 mb-2"}>
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
                        ? cards.length > 2
                          ? "d-flex flex-wrap justify-content-around align-items-end"
                          : "d-flex flex-wrap justify-content-start align-items-end"
                        : "d-flex flex-wrap justify-content-around"
                    }
                    style={{ listStyle: "none", padding: 0 }}
                  >
                    <>
                      {cards
                        .slice(
                          0,
                          isDesktop
                            ? window.location.pathname !== "/"
                              ? 7
                              : 3
                            : 2
                        )
                        .map((card) => (
                          <li
                            key={card.id}
                            className={
                              isDesktop
                                ? cards.length > 2
                                  ? "pt-2"
                                  : "pt-2 px-3"
                                : "pt-1"
                            }
                            style={isDesktop ? { width: "min-content" } : {}}
                          >
                            <div
                              style={
                                isDesktop
                                  ? { aspectRatio: "3/4", height: "7.5rem" }
                                  : { height: "8rem" }
                              }
                            >
                              <img
                                className="rounded"
                                style={{ height: "100%" }}
                                src={card.api_card_img_src_small}
                                alt={card.api_pkmn_name}
                              />
                            </div>
                          </li>
                        ))}
                    </>
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
                  <p>{language.lang_code.collection_with_no_cards} </p>
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
