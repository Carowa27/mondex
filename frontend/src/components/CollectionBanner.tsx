import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllOwnedCards } from "../services/cardServices";
import { useState, useEffect, useContext } from "react";
import { ICardFromDB } from "../interfaces/dataFromDB";
import { Link } from "react-router-dom";
import { ContainerContext } from "../globals/containerContext";
import { ICard, ICollection } from "../interfaces/LSInterface";
import { getSetFromApi } from "../services/pkmnTcgApiServices";
import { IPkmnSet } from "../interfaces/dataFromApi";

interface IProps {
  type?: string;
  collectionName: string;
}

export const CollectionBanner = (props: IProps) => {
  const { container } = useContext(ContainerContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  // const { user, isAuthenticated } = useAuth0();
  const [cards, setCards] = useState<ICard[] | undefined>();
  const [pkmnSet, setPkmnSet] = useState<IPkmnSet | undefined>();
  const language = container.language;
  const theme = container.theme;
  const coll = container.user?.collections.find(
    (col: ICollection) => col.collection_name === props.collectionName
  );
  useEffect(() => {
    if (coll) {
      setCards(coll.cards_in_collection);
    }
    if (coll?.set_id !== undefined) {
      const getSet = async () => {
        await getSetFromApi(coll?.set_id!).then((res) => {
          if (res) {
            setPkmnSet(res);
          }
        });
      };
      getSet();
    }
  }, []);

  const collectionNameToShow = props.collectionName.replace(/_/g, " ");
  return (
    <>
      {container.user && (
        <>
          <div
            className={
              window.location.pathname === "/"
                ? "mb-2 rounded p-1 w-100"
                : "py-2 my-3 col-5 rounded w-100"
            }
            style={{ border: `1px solid ${theme?.primaryColors.text.hex}` }}
          >
            <h5
              className={isDesktop ? "ms-2 mt-1 mb-0" : "ms-2 mt-1 mb-2"}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Link
                to={`/collection/${props.collectionName}`}
                className="text-decoration-none"
                style={{
                  color: theme?.primaryColors.link.hex,
                }}
              >
                {collectionNameToShow}
              </Link>
              {coll?.set_id !== undefined && (
                <div>
                  <img
                    src={pkmnSet?.images.symbol}
                    alt={`${pkmnSet?.name} logo`}
                    style={{
                      maxHeight: "1.5rem",
                      marginRight: "1rem",
                    }}
                  />
                </div>
              )}
            </h5>

            <div
              className={
                isDesktop ? "row d-flex justify-content-around px-3" : "px-3"
              }
            >
              {cards && cards.length !== 0 ? (
                <div>
                  <ul
                    className={
                      isDesktop
                        ? cards && cards.length > 2
                          ? "d-flex flex-wrap justify-content-around align-items-end"
                          : "d-flex flex-wrap justify-content-start align-items-end"
                        : "d-flex flex-wrap justify-content-around"
                    }
                    style={{ listStyle: "none", padding: 0 }}
                  >
                    <>
                      {cards &&
                        cards
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
                              key={card.card.id}
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
                                  src={card.card.images.small}
                                  alt={card.card.name}
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
                        color: theme?.primaryColors.link.hex,
                      }}
                    >
                      <i>{language?.lang_code.see_all_cards}</i>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <p>{language?.lang_code.collection_with_no_cards} </p>
                  <div className="w-100 d-flex justify-content-end">
                    <Link
                      to={`/collection/${props.collectionName}`}
                      style={{
                        color: theme?.primaryColors.link.hex,
                      }}
                    >
                      <i>{language?.lang_code.see_collection}</i>
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
