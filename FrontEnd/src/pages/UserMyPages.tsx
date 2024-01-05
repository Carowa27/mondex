import { useAuth0 } from "@auth0/auth0-react";
import { LogoutBtn } from "../components/LogoutBtn";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../globals/language/language";
import { CollectionBanner } from "../components/CollectionBanner";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { Link } from "react-router-dom";
import { ICollectionFromDB } from "../interfaces/dataFromDB";
import { LoadingModule } from "../components/LoadingModule";
import { getAllOwnedCollections } from "../services/collectionServices";
import { BreadCrumbs } from "./layout/BreadCrumbs";

export const UserMyPages = () => {
  const { language } = useContext(LanguageContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const [seeAccount, setSeeAccount] = useState(false);
  const { isLoading, isAuthenticated, user, error } = useAuth0();
  const [collections, setCollections] = useState<ICollectionFromDB[]>([]);

  useEffect(() => {
    if (isAuthenticated && user) {
      const getData = async () => {
        await getAllOwnedCollections({ user }).then((res) => {
          setCollections(res as ICollectionFromDB[]);
        });
      };
      getData();
    }
  }, [isAuthenticated, user]);

  return (
    <>
      {isAuthenticated && (
        <>
          <div className="d-flex justify-content-between align-items-start">
            <h1>
              {language.lang_code.my_pages_my_pages} - {user?.given_name}
            </h1>
            <BreadCrumbs pageParam="userpage" />
          </div>
          <div
            className={
              isDesktop ? "column" : "d-flex flex-column align-items-center"
            }
          >
            {!seeAccount ? (
              <div onClick={() => setSeeAccount(true)}>
                {language.lang_code.my_pages_see_my_info}
              </div>
            ) : (
              <div
                style={{
                  outline: `1px blue solid`,
                  width: "fit-content",
                  padding: "2rem 3rem",
                }}
              >
                <div className="d-flex flex-column">
                  <div
                    className="align-self-end"
                    onClick={() => setSeeAccount(false)}
                  >
                    &#x2715;
                  </div>
                  <img
                    className="rounded-circle d-flex mb-3 mx-auto"
                    src={user?.picture}
                    alt={`profile picture of ${user?.nickname}`}
                  />
                  <p>
                    <span className="font-weight-bold">
                      {language.lang_code.word_username}:
                    </span>{" "}
                    {user?.nickname}
                  </p>
                  <p>
                    <span className="font-weight-bold">
                      {language.lang_code.word_email}:
                    </span>{" "}
                    {user?.email}
                  </p>
                  <LogoutBtn />
                </div>
              </div>
            )}
            <div
              className={
                isDesktop
                  ? "row w-100 d-flex justify-content-around"
                  : "col-12 mb-3"
              }
            >
              {/* map collections of user */}
              {/* max 5 */}{" "}
              {!error && isLoading ? (
                <LoadingModule />
              ) : (
                <>
                  {collections && collections.length !== 0 ? (
                    <>
                      {collections.slice(0, 4).map((coll) => (
                        <CollectionBanner
                          key={coll.id}
                          collectionName={coll.collection_name}
                        />
                      ))}
                    </>
                  ) : (
                    <>Something went wrong</>
                  )}
                </>
              )}
            </div>
            <Link className="fst-italic" to="/all-collections">
              {language.lang_code.my_pages_see_all_collections}
            </Link>
            <Link to="/create-new-collection" className="text-decoration-none">
              <h5 className="me-5 mb-0 pt-3">Create New Collection</h5>
            </Link>
          </div>
        </>
      )}
    </>
  );
};
