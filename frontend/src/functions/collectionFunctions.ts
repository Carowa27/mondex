import { useContext } from "react";
import { ICollection } from "../interfaces/LSInterface";
import { ContainerContext } from "../globals/containerContext";

const { container, updateContainer } = useContext(ContainerContext);

export const addCollection = (newCollection: ICollection) => {
  const updatedCollections = [...container.user!.collections, newCollection];
  updateContainer(
    {
      username: container.user!.username,
      collections: updatedCollections as ICollection[],
    },
    "user"
  );
};
export const deleteCollection = (collection: ICollection) => {
  // delete collection
};
