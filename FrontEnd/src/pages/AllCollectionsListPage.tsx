import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LoadingModule } from "../components/LoadingModule";
import { getAllOwnedCollections } from "../services/collectionServices";
import { ICollectionFromDB } from "../interfaces/dataFromDB";

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
      <h2>All collections</h2>
      {!error && isLoading ? (
        <LoadingModule />
      ) : (
        <>
          {isAuthenticated ? (
            <>
              {collections && collections.length !== 0 ? (
                <>
                  {collections.map((coll: ICollectionFromDB) => (
                    <p>
                      {coll.collection_name}
                      {coll.api_set_id ? <>, {coll.api_set_id}</> : null}
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