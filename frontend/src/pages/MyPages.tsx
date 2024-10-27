import { FormEvent, useContext, useEffect, useState } from "react";
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
import { Pagination } from "./layout/Pagination";
import {
  convertObjectToCsv,
  exportJsonObject,
} from "../functions/exportFunctions";

export const MyPages = () => {
  const { container, clearContainer } = useContext(ContainerContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const isTablet = useMediaQuery({ query: variables.breakpoints.tablet });

  const [showCollections, setShowCollections] = useState<boolean>(true);
  const [showMyAccount, setShowMyAccount] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showRemoveDataModal, setShowRemoveDataModal] =
    useState<boolean>(false);
  const [showExportDataModal, setShowExportDataModal] =
    useState<boolean>(false);
  const [exportAll, setExportAll] = useState<boolean>(false);
  const [exportCollections, setExportCollections] = useState<boolean>(false);
  const [exportCsv, setExportCsv] = useState<boolean>(false);
  const [exportJson, setExportJson] = useState<boolean>(false);
  const [amountOfBanners, setAmountOfBanners] = useState<number>(3);
  const [page, setPage] = useState<number>(1);
  const [startBanner, setStartBanner] = useState<number>(0);
  const [endBanner, setEndBanner] = useState<number>(3);
  const [isShowUserInfo, setIsShowUserInfo] = useState<boolean>(false);
  const [isShowValues, setIsShowValues] = useState<boolean>(false);
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
  const updatePage = (page: number) => {
    setPage(page);
    if (page === 1) {
      setStartBanner(0);
      setEndBanner(amountOfBanners);
    } else {
      setStartBanner(amountOfBanners * page - amountOfBanners);
      setEndBanner(amountOfBanners * page);
    }
  };
  const exportData = () => {
    if (exportCsv) {
      if (exportAll === true) {
        convertObjectToCsv("all", container);
        setExportAll(false);
        setExportCsv(false);
      } else {
        convertObjectToCsv("collections", container);
        setExportCollections(false);
        setExportCsv(false);
      }
    }
    if (exportJson) {
      if (exportAll === true) {
        exportJsonObject("all", container);
        setExportAll(false);
        setExportJson(false);
      } else {
        exportJsonObject("collections", container);
        setExportCollections(false);
        setExportJson(false);
      }
    }
    setShowExportDataModal(false);
  };
  useEffect(() => {
    isDesktop
      ? setAmountOfBanners(6)
      : isTablet
      ? setAmountOfBanners(4)
      : setAmountOfBanners(3);
    isDesktop ? setEndBanner(6) : isTablet ? setEndBanner(4) : setEndBanner(3);
  }, []);
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
              isDesktop
                ? "w-25 px-4 py-3 rounded"
                : isTablet
                ? "w-75 px-4 py-3 rounded"
                : "w-75 px-4 py-3 rounded"
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
              <form
                action="exportData"
                style={{
                  display: "flex",
                  flexDirection: isDesktop || isTablet ? "row" : "column",
                  gap: "1rem",
                  justifyContent: "space-evenly",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
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
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {/* <label htmlFor="export-type-csv">
                    <input
                      type="radio"
                      name="export-type"
                      id="export-type-csv"
                      checked={exportCsv === true}
                      onChange={() => (
                        setExportCsv(true), setExportJson(false)
                      )}
                    />{" "}
                    Export in CSV
                  </label> */}
                  <label htmlFor="export-type-json">
                    <input
                      type="radio"
                      name="export-type"
                      id="export-type-json"
                      checked={exportJson === true}
                      onChange={() => (
                        setExportCsv(false), setExportJson(true)
                      )}
                    />{" "}
                    Export in JSON
                  </label>
                </div>
              </form>
              <div className="d-flex justify-content-around mt-3">
                <StandardButton
                  btnAction={() => (
                    setShowExportDataModal(false),
                    setExportAll(false),
                    setExportCollections(false),
                    setExportJson(false),
                    setExportCsv(false)
                  )}
                  disabled={false}
                  btnText={`${language?.lang_code.word_cancel}`}
                />
                <StandardButton
                  btnAction={() => exportData()}
                  disabled={
                    (exportCsv !== true &&
                      exportJson !== true &&
                      exportCollections !== true &&
                      exportAll !== true) ||
                    (exportJson !== true &&
                      (exportAll !== true || exportCollections !== true)) ||
                    (exportAll !== true && exportCollections !== true)
                  }
                  btnText={`Export data`}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div
        style={{
          height: "min-content",
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="d-flex justify-content-between align-items-start">
          <h1>
            {language?.lang_code.my_pages_my_pages} - {user?.username}
          </h1>
          <BreadCrumbs pageParam="userpage" />
        </div>
        <header className="d-flex justify-content-between align-items-center mt-2">
          <div style={{ width: "100%", display: "flex", gap: "0.5rem" }}>
            <span
              style={
                showCollections
                  ? {
                      fontWeight: "600",
                      color: theme?.primaryColors.text.hex,
                      backgroundColor: `rgba(${theme?.typeColors.metal.rgb},0.1`,
                      borderRadius: "0.5rem 0.5rem 0 0",
                      cursor: "pointer",
                    }
                  : {
                      color: theme?.primaryColors.text.hex,
                      borderWidth: "2px",
                      borderStyle: "solid solid none solid",
                      borderColor: `rgba(${theme?.typeColors.metal.rgb},0.1)`,
                      borderRadius: "0.5rem 0.5rem 0 0",
                      cursor: "pointer",
                    }
              }
              className={isDesktop ? "px-3 py-2 me-1" : "px-3 py-1 w-50"}
              onClick={() => (
                setShowCollections(true), setShowMyAccount(false)
              )}
            >
              <h5
                className={
                  showCollections
                    ? "m-0 d-flex align-items-center justify-content-center h-100"
                    : "m-0 d-flex align-items-center justify-content-center h-100 fw-normal"
                }
              >
                {language?.lang_code.my_pages_my_collections}
              </h5>
            </span>
            <span
              style={
                showMyAccount
                  ? {
                      fontWeight: "600",
                      color: theme?.primaryColors.text.hex,
                      backgroundColor: `rgba(${theme?.typeColors.metal.rgb},0.1`,
                      borderRadius: "0.5rem 0.5rem 0 0",
                      cursor: "pointer",
                    }
                  : {
                      color: theme?.primaryColors.text.hex,
                      borderWidth: "2px",
                      borderStyle: "solid solid none solid",
                      borderColor: `rgba(${theme?.typeColors.metal.rgb},0.1)`,
                      borderRadius: "0.5rem 0.5rem 0 0",
                      cursor: "pointer",
                    }
              }
              className={isDesktop ? "px-3 py-1 me-1" : "px-3 py-1 w-50"}
              onClick={() => (
                setShowCollections(false), setShowMyAccount(true)
              )}
            >
              <h5
                className={
                  showMyAccount
                    ? "m-0 d-flex align-items-center justify-content-center h-100"
                    : "m-0 d-flex align-items-center justify-content-center h-100 fw-normal"
                }
              >
                {language?.lang_code.my_pages_my_profile}
              </h5>
            </span>
          </div>
        </header>
        <main
          className="py-4"
          style={{
            borderRadius:
              isDesktop || isTablet
                ? "0 0.5rem 0.5rem 0.5rem"
                : "0 0rem 0.5rem 0.5rem",
            backgroundColor: `rgba(${theme?.typeColors.metal.rgb},0.1`,
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {showCollections && (
            <>
              <div
                className={
                  isDesktop
                    ? "d-flex justify-content-end mb-3"
                    : "d-flex justify-content-between mx-4 mb-3"
                }
              >
                <div className={isDesktop || isTablet ? "me-5" : ""}>
                  <StandardButton
                    btnText={
                      language?.name === "English" ? "Create new" : "Skapa ny"
                    }
                    btnAction={() =>
                      navigate("/create-new-collection", { replace: true })
                    }
                    disabled={false}
                  />
                </div>
                <div className={isDesktop || isTablet ? "me-4" : ""}>
                  <StandardButton
                    btnText={
                      language?.name === "English"
                        ? "See all collections"
                        : "Se alla kollektioner"
                    }
                    btnAction={() =>
                      navigate("/all-collections", { replace: true })
                    }
                    disabled={false}
                  />
                </div>
              </div>
              <div
                className={
                  isDesktop
                    ? "row w-100 d-flex justify-content-around"
                    : "col-12 mb-3"
                }
              >
                {/* {isLoading ? (
                  <LoadingModule />
                ) : ( */}
                <>
                  {collections && collections.length !== 0 ? (
                    <div
                      style={{
                        display: "flex",
                        padding: isTablet ? "0 2rem" : "",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-evenly",
                        gap: "2rem",
                        width: isDesktop ? "85.5%" : "100%",
                      }}
                    >
                      {collections.slice(startBanner, endBanner).map((coll) => (
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
                {/* )} */}
              </div>
            </>
          )}
          {showMyAccount && (
            <div
              style={{
                display: "flex",
                justifyContent: isDesktop || isTablet ? "center" : "start",
                margin: !isTablet && !isDesktop ? "0 1rem" : "",
              }}
            >
              <div
                style={
                  isDesktop
                    ? {
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        margin: "0 2rem",
                      }
                    : isTablet
                    ? {
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }
                    : {
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                      }
                }
              >
                <div
                  style={{
                    width: isDesktop ? "25%" : isTablet ? "40%" : "auto",
                  }}
                >
                  <h4 onClick={() => setIsShowUserInfo(!isShowUserInfo)}>
                    {language?.name === "English" ? <>User</> : <>Användare</>}{" "}
                    {!isDesktop && !isTablet && (
                      <>
                        {isShowUserInfo ? (
                          <i className="bi bi-chevron-up ps-1"></i>
                        ) : (
                          <i className="bi bi-chevron-down ps-1"></i>
                        )}
                      </>
                    )}
                  </h4>
                  {(isShowUserInfo || isDesktop || isTablet) && (
                    <>
                      <h5>
                        {language?.name === "English" ? (
                          <>User information</>
                        ) : (
                          <>Användarinformation</>
                        )}
                      </h5>
                      <p style={{ marginLeft: "1rem" }}>
                        <b>
                          {language?.name === "English" ? (
                            <>Username</>
                          ) : (
                            <>Användarnman</>
                          )}
                          :{" "}
                        </b>
                        {container.user?.username}
                      </p>
                      <h5>
                        {language?.name === "English" ? (
                          <>Saved data information</>
                        ) : (
                          <>Information om sparad data</>
                        )}
                      </h5>
                      <div
                        style={{
                          width: "max-content",
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                        }}
                      >
                        <div style={{ marginLeft: "1rem" }}>
                          <h6>
                            {language?.name === "English" ? (
                              <>Export data</>
                            ) : (
                              <>Exportera data</>
                            )}
                          </h6>
                          <StandardButton
                            btnText={
                              language?.name === "English"
                                ? "Export your saved data"
                                : "Exportera din data"
                            }
                            btnAction={() => setShowExportDataModal(true)}
                            disabled={false}
                          />
                        </div>
                        <div style={{ marginLeft: "1rem" }}>
                          <h6>
                            {language?.name === "English" ? (
                              <>Delete data</>
                            ) : (
                              <>Radera data</>
                            )}
                          </h6>
                          <StandardButton
                            btnText={
                              language?.name === "English"
                                ? "Remove all saved data"
                                : "Radera all sparad data"
                            }
                            btnAction={() => setShowRemoveDataModal(true)}
                            disabled={false}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {!isDesktop && !isTablet && (
                  <hr className={!isShowUserInfo ? "mt-2 mb-3" : "mt-4 mb-3"} />
                )}
                <div
                  style={
                    isDesktop
                      ? {
                          width: "60%",
                          display: "flex",
                          flexDirection: "column",
                          flexWrap: "wrap",
                          height: "80%",
                        }
                      : isTablet
                      ? { width: "55%" }
                      : { width: "auto", marginTop: "0.5rem" }
                  }
                >
                  <h4>
                    {language?.name === "English" ? (
                      <>Compilation of all collections</>
                    ) : (
                      <>Sammanställning av alla samlingar</>
                    )}{" "}
                  </h4>
                  <div>
                    <h5>
                      {language?.name === "English" ? (
                        <>Numbers</>
                      ) : (
                        <>Nummer</>
                      )}
                    </h5>
                    <div style={{ marginLeft: "1rem" }}>
                      <p>
                        <b>
                          {language?.name === "English" ? (
                            <>Nr of collections</>
                          ) : (
                            <>Antal kollektioner</>
                          )}
                          :{" "}
                        </b>
                        {collections?.length}
                      </p>
                      <p>
                        <b>
                          {language?.name === "English" ? (
                            <>Total nr of cards</>
                          ) : (
                            <>Antal kort</>
                          )}
                          :{" "}
                        </b>
                        {getAmountOfCardsOwned(collections!)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h5 onClick={() => setIsShowValues(!isShowValues)}>
                      {language?.name === "English" ? <>Values</> : <>Värden</>}
                      {!isDesktop && !isTablet && (
                        <>
                          {isShowValues ? (
                            <i className="bi bi-chevron-up ps-1"></i>
                          ) : (
                            <i className="bi bi-chevron-down ps-1"></i>
                          )}
                        </>
                      )}
                    </h5>
                    {(isShowValues || isDesktop || isTablet) && (
                      <div style={{ marginLeft: "1rem" }}>
                        <div>
                          <b>
                            {language?.name === "English" ? (
                              <>Value of collections:</>
                            ) : (
                              <>Värde av kollektioner</>
                            )}{" "}
                          </b>
                          <ul
                            style={{
                              paddingLeft: "1.5rem",
                              // margin: ,
                            }}
                          >
                            {collections
                              ?.slice(0, isDesktop ? 10 : 5)
                              .map((coll) => {
                                return (
                                  <li key={coll.id}>
                                    {coll.collection_name.replace(/_/g, " ")} ~
                                    {getValueOfCardsOwned([coll])}$
                                  </li>
                                );
                              })}
                          </ul>
                          {collections && collections.length > 2 && (
                            <Link
                              to="/all-collections"
                              className={
                                isDesktop
                                  ? "fst-italic"
                                  : "fst-italic text-center"
                              }
                              style={{
                                color: theme?.primaryColors.link.hex,
                              }}
                            >
                              {language?.name === "English"
                                ? "See all collections"
                                : "Se alla kollektioner"}
                            </Link>
                          )}
                        </div>
                        <p className="my-3">
                          <b>
                            {language?.name === "English" ? (
                              <>Total value of cards:</>
                            ) : (
                              <>Totalt värde av alla kort</>
                            )}{" "}
                          </b>
                          ~{getValueOfCardsOwned(collections!)}$
                        </p>
                      </div>
                    )}
                  </div>
                  <div style={isDesktop ? { marginTop: "2.5rem" } : {}}>
                    <h5>
                      {language?.name === "English" ? (
                        <>Most valuable card in collection:</>
                      ) : (
                        <>Mest prisvärda kort i samlingen:</>
                      )}{" "}
                    </h5>
                    <div
                      style={{
                        marginLeft: isDesktop || isTablet ? "1rem" : "0",
                      }}
                    >
                      {mostValuableOwnedCard !== undefined && (
                        <div
                          className={
                            isDesktop || isTablet
                              ? "d-flex flex-row w-100 flex-wrap"
                              : "d-flex flex-row w-100 align-items-center flex-fill mt-3"
                          }
                        >
                          <div style={{ width: "12.5rem" }}>
                            <img
                              className="rounded"
                              style={{
                                width: isDesktop || isTablet ? "100%" : "100%",
                              }}
                              src={mostValuableOwnedCard.card.images.small}
                              alt={mostValuableOwnedCard.card.name}
                            />
                          </div>
                          <div
                            className={
                              isDesktop || isTablet
                                ? "m-0 w-50 ps-3 pt-3"
                                : "w-auto d-flex flex-column justify-content-evenly m-0 ms-3"
                            }
                            style={{
                              gap: isDesktop || isTablet ? "1rem" : "0.3rem",
                            }}
                          >
                            <p className={!isDesktop && !isTablet ? "m-0" : ""}>
                              <b>Card: </b>
                              {!isDesktop && !isTablet && <br />}
                              {mostValuableOwnedCard.card.name}
                            </p>
                            <p className={!isDesktop && !isTablet ? "m-0" : ""}>
                              <b>Artist: </b>
                              {!isDesktop && !isTablet && <br />}
                              {mostValuableOwnedCard.card.artist}
                            </p>
                            <p className={!isDesktop && !isTablet ? "m-0" : ""}>
                              <b>Set: </b>
                              {!isDesktop && !isTablet && <br />}
                              {mostValuableOwnedCard.card.set.name}
                            </p>
                            <p className={!isDesktop && !isTablet ? "m-0" : ""}>
                              <b>{language?.lang_code.word_release_date}: </b>
                              {!isDesktop && !isTablet && <br />}
                              {mostValuableOwnedCard.card.set.releaseDate}
                            </p>
                            <p className={!isDesktop && !isTablet ? "m-0" : ""}>
                              <b>Rarity: </b>
                              {!isDesktop && !isTablet && <br />}
                              {mostValuableOwnedCard.card.rarity}
                            </p>
                            <p className={!isDesktop && !isTablet ? "m-0" : ""}>
                              <b>
                                {language?.name === "English" ? (
                                  <>Value</>
                                ) : (
                                  <>Värde</>
                                )}
                                :{" "}
                              </b>
                              {getValueOfCard(mostValuableOwnedCard)}$
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showCollections &&
          collections &&
          collections?.length > amountOfBanners ? (
            <div className="d-flex justify-content-center mt-auto pt-3">
              <Pagination
                page={page}
                pageSize={amountOfBanners}
                totalCount={collections?.length ? collections?.length : 0}
                updateSearch={updatePage}
              />
            </div>
          ) : null}
        </main>
      </div>
    </>
  );
};
