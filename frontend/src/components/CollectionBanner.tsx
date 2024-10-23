import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ContainerContext } from "../globals/containerContext";
import { ICard, ICollection } from "../interfaces/LSInterface";
import { sortPkmnCards } from "../functions/cardFunctions";

interface IProps {
  type?: string;
  collectionName: string;
}

export const CollectionBanner = (props: IProps) => {
  const { container } = useContext(ContainerContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const isTablet = useMediaQuery({ query: variables.breakpoints.tablet });
  const [cards, setCards] = useState<ICard[] | undefined>();
  const language = container.language;
  const theme = container.theme;
  const coll = container.user?.collections.find(
    (col: ICollection) => col.collection_name === props.collectionName
  );
  useEffect(() => {
    if (coll) {
      setCards(coll.cards_in_collection);
    }
  }, []);

  const sortedCardsForBanner = cards && coll ? sortPkmnCards(cards, coll) : [];
  const collectionNameToShow = props.collectionName.replace(/_/g, " ");
  const characterNameToShow = coll?.character?.replace(/_/g, " ");
  const artistNameToShow = coll?.artist?.replace(/_/g, " ");
  return (
    <>
      {container.user && container.user.username !== "" && (
        <>
          <div
            className={
              isTablet && window.location.pathname === "/"
                ? "mb-2 rounded p-1 px-3"
                : window.location.pathname === "/"
                ? "mb-2 rounded p-1 w-100 px-3"
                : "py-2 col-5 rounded px-3"
            }
            style={{
              border: `1px solid ${theme?.primaryColors.text.hex}`,
              width: isDesktop ? "max-content" : isTablet ? "41%" : "100%",
              minWidth: "20%",
              display: "flex",
              flexDirection: "column",
              height: "max-content",
              minHeight: "13.4rem",
            }}
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
              {coll?.set?.id !== undefined && (
                <div>
                  <img
                    src={coll.set.images.symbol}
                    alt={`${coll.set.name} logo`}
                    style={{
                      maxHeight: "1.5rem",
                      marginRight: "1rem",
                      marginLeft: "1rem",
                    }}
                  />
                </div>
              )}
              {coll?.character !== undefined && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ fontSize: "small" }}>
                    {characterNameToShow}
                  </span>
                </div>
              )}
              {coll?.artist !== undefined && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ fontSize: "small" }}>{artistNameToShow}</span>
                </div>
              )}
            </h5>

            {cards && cards.length !== 0 ? (
              <div>
                <ul
                  className={
                    "d-flex flex-wrap justify-content-start align-items-end"
                  }
                  style={{ listStyle: "none", padding: 0, gap: "1rem" }}
                >
                  <>
                    {cards &&
                      sortedCardsForBanner
                        .slice(
                          0,
                          window.location.pathname !== "/" && isDesktop
                            ? 7
                            : isDesktop
                            ? 4
                            : 3
                        )
                        .map((card) => (
                          <li
                            key={card.card.id}
                            className={
                              isDesktop
                                ? cards.length > 2
                                  ? "pt-2"
                                  : "pt-2"
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
                <p className="align-self-center mt-auto">
                  {language?.lang_code.collection_with_no_cards}{" "}
                </p>
                <div className="w-100 d-flex justify-content-end mt-auto">
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
        </>
      )}
    </>
  );
};
