import { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { LoadingModule } from "../components/LoadingModule";
import { Link } from "react-router-dom";
import { Pagination } from "./layout/Pagination";
import { BreadCrumbs } from "./layout/BreadCrumbs";
import { ContainerContext } from "../globals/containerContext";
import { ICollection } from "../interfaces/LSInterface";
import { ListCollBanner } from "../components/ListCollBanner";

export const AllCollectionsListPage = () => {
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { container } = useContext(ContainerContext);
  const [page, setPage] = useState<number>(1);
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(isDesktop ? 21 : 13);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const language = container.language;
  const theme = container.theme;
  const collections = container.user?.collections;

  const updateSearch = (newPage: number) => {
    setPage(newPage);
    if (isDesktop) {
      if (newPage === 1) {
        setStart(0);
        setEnd(21);
      } else {
        setStart(21 * newPage - 21);
        setEnd(21 * newPage);
      }
    } else {
      if (newPage === 1) {
        setStart(0);
        setEnd(13);
      } else {
        setStart(13 * newPage - 13);
        setEnd(13 * newPage);
      }
    }
  };

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
    <>
      {isLoading ? (
        <LoadingModule />
      ) : (
        <>
          {container.user ? (
            <>
              <div className="d-flex justify-content-between">
                <h2>{language?.lang_code.collection_all_collections}</h2>
                <div className="d-flex flex-column align-items-end">
                  <BreadCrumbs pageParam="allCollections" />
                  <Link
                    to="/create-new-collection"
                    style={{
                      color: theme?.primaryColors.link.hex,
                    }}
                  >
                    <h6 className="me-2 mb-0">
                      {language?.lang_code.collection_create_new_collection}
                    </h6>
                  </Link>
                </div>
              </div>
              <div
                // className="w-100 d-flex justify-content-center"
                style={{
                  height: "80vh",
                }}
              >
                {collections && collections.length !== 0 ? (
                  <div
                    style={{ gap: "1.5rem" }}
                    className={
                      isDesktop
                        ? "w-100 rounded d-flex mx-3 mt-2 pt-3 flex-wrap justify-content-center"
                        : "w-100 rounded d-flex mx-3 mt-2 py-4 flex-column"
                    }
                  >
                    {collections.slice(start, end).map((coll: ICollection) => (
                      <ListCollBanner collection={coll} key={coll.id} />
                    ))}
                  </div>
                ) : (
                  <>{language?.lang_code.error_something_went_wrong}</>
                )}
              </div>
              {collections && (
                <Pagination
                  pageSize={isDesktop ? 21 : 13}
                  totalCount={collections.length}
                  page={page}
                  updateSearch={updateSearch}
                ></Pagination>
              )}
            </>
          ) : (
            <>{language?.lang_code.error_something_went_wrong}</>
          )}
        </>
      )}
    </>
  );
};
