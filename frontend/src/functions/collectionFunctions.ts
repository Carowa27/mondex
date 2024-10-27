import { ICollection } from "../interfaces/LSInterface";

//export const addCollection = (newCollection: ICollection) => {
// const updatedCollections = [...container.user!.collections, newCollection];
// updateContainer(
//   {
//     username: container.user!.username,
//     collections: updatedCollections as ICollection[],
//   },
//   "user"
// );
//};
export const deleteCollection = (
  collection: ICollection,
  collections: ICollection[]
) => {
  const collectionIndex = collections.findIndex(
    (coll) => coll.id === collection.id
  );
  // delete collection
  const updatedCollections = [
    ...collections.filter((_, index) => index !== collectionIndex),
  ];
  return updatedCollections;
};
