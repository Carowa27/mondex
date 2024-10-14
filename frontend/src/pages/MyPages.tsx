import { FormEvent, useContext, useState } from "react";
import { BreadCrumbs } from "./layout/BreadCrumbs";
import { LoadingModule } from "../components/LoadingModule";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { Link, useNavigate } from "react-router-dom";
import { CollectionBanner } from "../components/CollectionBanner";
import { ContainerContext } from "../globals/containerContext";
import {
  getAmountOfCardsOwned,
  getMostValuableCardOwned,
  getValueOfCard,
  getValueOfCardsOwned,
} from "../functions/dataFunctions";
import { StandardButton } from "../components/Buttons";

export const MyPages = () => {
  const { container, clearContainer } = useContext(ContainerContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });

  const [showCollections, setShowCollections] = useState<boolean>(true);
  const [showMyAccount, setShowMyAccount] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showRemoveDataModal, setShowRemoveDataModal] =
    useState<boolean>(false);
  const [showExportDataModal, setShowExportDataModal] =
    useState<boolean>(false);
  const [exportAll, setExportAll] = useState<boolean>(false);
  const [exportCollections, setExportCollections] = useState<boolean>(false);

  const navigate = useNavigate();

  const language = container.language;
  const theme = container.theme;
  const user = container.user;
  const collections = container.user?.collections;
  const mostValuableOwnedCard = getMostValuableCardOwned(collections!);
  const removeAllData = () => {
    localStorage.removeItem("mondex"), clearContainer();
    navigate("/", { replace: true });
  };
  const exportData = () => {
    if (exportAll === true) {
      console.log("export all");
    } else {
      console.log("export collections only");
    }
    setShowExportDataModal(false);
  };
  return (
    <>
      {showRemoveDataModal ? (
        <div
          style={{
            backgroundColor: `rgba(${theme?.primaryColors.black.rgb}, 0.7)`,
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            position: "fixed",
            zIndex: 400,
          }}
          className="d-flex justify-content-center align-items-center"
          onClick={() => setShowRemoveDataModal(false)}
        >
          <div
            className={
              isDesktop ? "w-25 px-4 py-3 rounded" : "w-75 px-4 py-3 rounded"
            }
            style={{ backgroundColor: theme?.primaryColors.background.hex }}
          >
            <header className="d-flex justify-content-end mt-2">
              <i
                className="bi bi-x-lg"
                onClick={() => setShowRemoveDataModal(false)}
              ></i>
            </header>
            <div>
              <div className="mb-4">
                <h6>Are you sure you want to delete all your data? </h6>
              </div>

              <i>
                Are you sure you want to delete all your saved data? <br />
                It will be gone forever and you wont be able to retrieve it.
              </i>
              <div className="d-flex justify-content-around mt-3">
                <StandardButton
                  btnAction={() => setShowRemoveDataModal(false)}
                  disabled={false}
                  btnText={`${language?.lang_code.word_cancel}`}
                />
                <StandardButton
                  btnAction={() => removeAllData()}
                  disabled={false}
                  btnText={`${language?.lang_code.word_delete}`}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {showExportDataModal ? (
        <div
          style={{
            backgroundColor: `rgba(${theme?.primaryColors.black.rgb}, 0.7)`,
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            position: "fixed",
            zIndex: 400,
          }}
          className="d-flex justify-content-center align-items-center"
        >
          <div
            className={
              isDesktop ? "w-25 px-4 py-3 rounded" : "w-75 px-4 py-3 rounded"
            }
            style={{ backgroundColor: theme?.primaryColors.background.hex }}
          >
            <header className="d-flex justify-content-end mt-2">
              <i
                className="bi bi-x-lg"
                onClick={() => setShowExportDataModal(false)}
              ></i>
            </header>
            <div>
              <div className="mb-4">
                <h6>What do you want to export? </h6>
              </div>
              <form action="exportData">
                <label htmlFor="export-data-all">
                  <input
                    type="radio"
                    name="export-data"
                    id="export-data-all"
                    checked={exportAll === true}
                    onChange={() => (
                      setExportCollections(false), setExportAll(true)
                    )}
                  />{" "}
                  Export all saved data
                </label>
                <label htmlFor="export-data-collections">
                  <input
                    type="radio"
                    name="export-data"
                    id="export-data-collections"
                    checked={exportCollections === true}
                    onChange={() => (
                      setExportCollections(true), setExportAll(false)
                    )}
                  />{" "}
                  Export saved collections
                </label>
              </form>
              <div className="d-flex justify-content-around mt-3">
                <StandardButton
                  btnAction={() => setShowExportDataModal(false)}
                  disabled={false}
                  btnText={`${language?.lang_code.word_cancel}`}
                />
                <StandardButton
                  btnAction={() => exportData()}
                  disabled={false}
                  btnText={`Export data`}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
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
              onClick={() => (
                setShowCollections(true), setShowMyAccount(false)
              )}
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
              onClick={() => (
                setShowCollections(false), setShowMyAccount(true)
              )}
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
                        {collections
                          .slice(0, isDesktop ? 12 : 3)
                          .map((coll) => (
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
                  <StandardButton
                    btnText={"Remove all saved data"}
                    btnAction={() => setShowRemoveDataModal(true)}
                    disabled={false}
                  />{" "}
                  <StandardButton
                    btnText={"Export your saved data"}
                    btnAction={() => setShowExportDataModal(true)}
                    disabled={false}
                  />
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
    </>
  );
};
