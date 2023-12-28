import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LoadingModule } from "../components/LoadingModule";
import { getAllOwnedCollections } from "../services/collectionServices";
import { ICollectionFromDB } from "../interfaces/dataFromDB";
import { Link } from "react-router-dom";

export const AllCollectionsListPage = () => {
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
      <div className="d-flex justify-content-between">
        <h2>All collections</h2>
        <h5
          className="me-5 mb-0 pt-3"
          onClick={() => (window.location.href = "/create-new-collection")}
        >
          Create New Collection
        </h5>
      </div>
      {!error && isLoading ? (
        <LoadingModule />
      ) : (
        <>
          {isAuthenticated ? (
            <>
              {collections && collections.length !== 0 ? (
                <>
                  {collections.map((coll: ICollectionFromDB) => (
                    <p key={coll.id}>
                      <Link to={`/collection/${coll.collection_name}`}>
                        {coll.collection_name.replace(/_/g, " ")}
                        {coll.api_set_id ? <>, {coll.api_set_id}</> : null}
                      </Link>
                    </p>
                  ))}
                </>
              ) : (
                <>Something went wrong</>
              )}
            </>
          ) : (
            <>Something went wrong</>
          )}
        </>
      )}
    </>
  );
};
