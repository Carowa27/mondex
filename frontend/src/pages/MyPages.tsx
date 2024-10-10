import { useContext, useState } from "react";
import { BreadCrumbs } from "./layout/BreadCrumbs";
import { LoadingModule } from "../components/LoadingModule";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { Link } from "react-router-dom";
import { CollectionBanner } from "../components/CollectionBanner";
import { ContainerContext } from "../globals/containerContext";
import {
  getAmountOfCardsOwned,
  getMostValuableCardOwned,
  getValueOfCard,
  getValueOfCardsOwned,
} from "../functions/dataFunctions";

export const MyPages = () => {
  const { container } = useContext(ContainerContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });

  const [showCollections, setShowCollections] = useState<boolean>(true);
  const [showMyAccount, setShowMyAccount] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const language = container.language;
  const theme = container.theme;
  const user = container.user;
  const collections = container.user?.collections;
  const mostValuableOwnedCard = getMostValuableCardOwned(collections!);
  return (
    <div style={{ height: "min-content", minHeight: "90vh" }}>
      <div className="d-flex justify-content-between align-items-start">
        <h1>
          {language?.lang_code.my_pages_my_pages} - {user?.username}
        </h1>
        <BreadCrumbs pageParam="userpage" />
      </div>
      <header className="d-flex justify-content-between align-items-center">
        <div>
          <span
            style={
              showCollections
                ? {
                    fontWeight: "600",
                    color: theme?.primaryColors.text.hex,
                    backgroundColor: `rgba(${theme?.typeColors.metal.rgb},0.3)`,
                  }
                : {
                    color: theme?.primaryColors.text.hex,
                    border: `1px solid rgba(${theme?.typeColors.metal.rgb},0.3)`,
                  }
            }
            className={"btn px-3 mb-2 py-1 me-1"}
            onClick={() => (setShowCollections(true), setShowMyAccount(false))}
          >
            <h5 className={showCollections ? "m-0" : "m-0 fw-normal"}>
              {language?.lang_code.my_pages_my_collections}
            </h5>
          </span>
          <span
            style={
              showMyAccount
                ? {
                    fontWeight: "600",
                    color: theme?.primaryColors.text.hex,
                    backgroundColor: `rgba(${theme?.typeColors.metal.rgb},0.3)`,
                  }
                : {
                    color: theme?.primaryColors.text.hex,
                    border: `1px solid rgba(${theme?.typeColors.metal.rgb},0.3)`,
                  }
            }
            className="btn px-3 mb-2 pt-1 me-1"
            onClick={() => (setShowCollections(false), setShowMyAccount(true))}
          >
            <h5 className={showMyAccount ? "m-0" : "m-0 fw-normal"}>
              {language?.lang_code.my_pages_my_profile}
            </h5>
          </span>
        </div>
        {isDesktop && showCollections ? (
          <div className={"mt-3 d-flex"}>
            <Link
              to="/create-new-collection"
              className="text-decoration-none me-5"
              style={{
                color: theme?.primaryColors.link.hex,
              }}
            >
              <h6 className={"m-0"}>
                {language?.lang_code.collection_create_new_collection}
              </h6>
            </Link>
            <Link
              className="fst-italic me-4"
              to="/all-collections"
              style={{
                color: theme?.primaryColors.link.hex,
              }}
            >
              <h6 className={"m-0"}>
                {language?.lang_code.my_pages_see_all_collections}
              </h6>
            </Link>
          </div>
        ) : null}
      </header>
      <main className="mt-1">
        {showCollections && (
          <>
            {!isDesktop ? (
              <div
                className={
                  isDesktop
                    ? "d-flex justify-content-end"
                    : "d-flex justify-content-between mt-3"
                }
              >
                <Link
                  to="/create-new-collection"
                  className="text-decoration-none"
                  style={{
                    color: theme?.primaryColors.link.hex,
                  }}
                >
                  <h6 className={isDesktop ? "me-5 mb-0 pt-3" : "m-0"}>
                    {language?.lang_code.collection_create_new_collection}
                  </h6>
                </Link>
                <Link
                  className="fst-italic"
                  to="/all-collections"
                  style={{
                    color: theme?.primaryColors.link.hex,
                  }}
                >
                  <h6 className={isDesktop ? "me-5 mb-0 pt-3" : "m-0"}>
                    {language?.lang_code.my_pages_see_all_collections}
                  </h6>
                </Link>
              </div>
            ) : null}
            <div
              className={
                isDesktop
                  ? "row w-100 d-flex justify-content-around"
                  : "col-12 mb-3"
              }
            >
              {isLoading ? (
                <LoadingModule />
              ) : (
                <>
                  {collections && collections.length !== 0 ? (
                    <div
                      style={
                        collections.length % 2 === 0
                          ? {
                              display: "flex",
                              flexDirection: "row",
                              flexWrap: "wrap",
                              justifyContent: "space-evenly",
                              gap: "2rem",
                              width: "85.5%",
                            }
                          : {
                              display: "flex",
                              flexDirection: "row",
                              flexWrap: "wrap",
                              justifyContent: "space-between",
                              gap: "2rem",
                              width: "85.5%",
                            }
                      }
                    >
                      {collections.slice(0, isDesktop ? 8 : 3).map((coll) => (
                        <CollectionBanner
                          key={coll.id}
                          collectionName={coll.collection_name}
                        />
                      ))}
                    </div>
                  ) : (
                    <>{language?.lang_code.error_something_went_wrong}</>
                  )}
                </>
              )}
            </div>
          </>
        )}
        {showMyAccount && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: isDesktop ? "70%" : "auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ width: isDesktop ? "40%" : "auto" }}>
                <h4>User</h4>
                <h5>User information</h5>
                <p style={{ marginLeft: "1rem" }}>
                  <b>Username: </b>
                  {container.user?.username}
                </p>
                <h5>Saved data information</h5>
                <p>removing all data</p>
                {/* TODO
                add functionality to remove all data */}
                <p>exporting data</p>
                {/* TODO
                add functionality to export all data */}
              </div>
              <div style={{ width: isDesktop ? "40%" : "auto" }}>
                <h4>Compilation of all collections</h4>
                <h5>Numbers</h5>
                <div style={{ marginLeft: "1rem" }}>
                  <p>
                    <b>Nr of collections: </b>
                    {collections?.length}
                  </p>
                  <p>
                    <b>Total nr of cards: </b>
                    {getAmountOfCardsOwned(collections!)}
                  </p>
                </div>
                <h5>Values</h5>
                <div style={{ marginLeft: "1rem" }}>
                  <div>
                    <b>Value of collections: </b>
                    <ul style={{ paddingLeft: "1.5rem" }}>
                      {collections?.map((coll) => {
                        return (
                          <li key={coll.id}>
                            {coll.collection_name.replace(/_/g, " ")} ~
                            {getValueOfCardsOwned([coll])}$
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <p>
                    <b>Total value of cards: </b>~
                    {getValueOfCardsOwned(collections!)}$
                  </p>

                  {/* TODO
                  add function to get most valuable card from collections */}
                </div>
                <div>
                  <h5>Most valuable card in collection: </h5>
                  <div style={{ marginLeft: "1rem" }}>
                    {mostValuableOwnedCard !== undefined && (
                      <div
                        className={
                          isDesktop
                            ? "d-flex flex-row w-100 flex-wrap"
                            : "d-flex flex-column w-25 align-items-center flex-fill ms-3"
                        }
                      >
                        <div
                          className={
                            isDesktop ? "" : "d-flex justify-content-center"
                          }
                          style={{ width: "12.5rem" }}
                        >
                          <img
                            className="rounded"
                            style={{ width: isDesktop ? "100%" : "40%" }}
                            src={mostValuableOwnedCard.card.images.small}
                            alt={mostValuableOwnedCard.card.name}
                          />
                        </div>
                        <p
                          className={
                            isDesktop
                              ? "m-0 w-50 ps-3 pt-3"
                              : "w-100 d-flex flex-column justify-content-evenly m-0"
                          }
                        >
                          <span>
                            <b>Card: </b>
                            {mostValuableOwnedCard.card.name}
                          </span>

                          <br />
                          <span>
                            <b>Artist: </b>
                            {mostValuableOwnedCard.card.artist}
                          </span>
                          <br />
                          <span>
                            <b>Set: </b>
                            {mostValuableOwnedCard.card.set.name}
                          </span>
                          <br />
                          <span>
                            <b>Release date: </b>
                            {mostValuableOwnedCard.card.set.releaseDate}
                          </span>
                          <br />
                          <span>
                            <b>Rarity: </b>
                            {mostValuableOwnedCard.card.rarity}
                          </span>
                          <br />
                          <span>
                            <b>Value: </b>
                            {getValueOfCard(mostValuableOwnedCard)}$
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
