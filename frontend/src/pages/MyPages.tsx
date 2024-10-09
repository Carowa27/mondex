import { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutBtn } from "../components/LogoutBtn";
import { BreadCrumbs } from "./layout/BreadCrumbs";
import { LoadingModule } from "../components/LoadingModule";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { ICollectionFromDB } from "../interfaces/dataFromDB";
import { getAllOwnedCollections } from "../services/collectionServices";
import { Link } from "react-router-dom";
import { CollectionBanner } from "../components/CollectionBanner";
import { ContainerContext } from "../globals/containerContext";

export const MyPages = () => {
  const { container } = useContext(ContainerContext);
  // const { isLoading, isAuthenticated, user, error } = useAuth0();
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });

  const [showCollections, setShowCollections] = useState<boolean>(true);
  const [showMyAccount, setShowMyAccount] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [collections, setCollections] = useState<ICollectionFromDB[]>([]);

  const language = container.language;
  const theme = container.theme;
  const user = container.user;
  const collections = container.user?.collections;
  // useEffect(() => {
  //   if (isAuthenticated && user) {
  //     const getData = async () => {
  //       await getAllOwnedCollections({ user }).then((res) => {
  //         setCollections(res as ICollectionFromDB[]);
  //       });
  //     };
  //     getData();
  //   }
  // }, [isAuthenticated, user]);

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
          <>
            <div
              className="px-5 pb-4 pt-5"
              style={{
                width: "fit-content",
              }}
            >
              <div
                className={isDesktop ? "d-flex flex-row" : "d-flex flex-column"}
                style={{
                  gap: isDesktop ? "2rem" : "",
                }}
              >
                {/* {user?.picture && (
                  <div
                    className="d-flex mb-3 mx-auto"
                    style={{
                      aspectRatio: 1,
                    }}
                  >
                    <img
                      className="rounded-circle"
                      style={{
                        minWidth: isDesktop ? "10rem" : "",
                      }}
                      src={user?.picture}
                      alt={`profile picture of ${user?.nickname}`}
                    />
                  </div>
                )} */}
                <div>
                  {/* <h6 className="mt-3">
                    {language?.lang_code.word_name}: {user?.given_name}{" "}
                    {user?.family_name}
                  </h6> */}
                  <p>
                    <span className="font-weight-bold">
                      {language?.lang_code.word_username}:
                    </span>{" "}
                    {user?.username}
                  </p>
                  {/* <p>
                    <span className="font-weight-bold">
                      {language?.lang_code.word_email}:
                    </span>{" "}
                    {user?.email}
                  </p> 
                  <LogoutBtn />*/}
                </div>
              </div>
              {/* TODO
              Add text about removing all data, amount of collections, amount of cards saved, total market value on collection */}
            </div>
          </>
        )}
      </main>
    </div>
  );
};
