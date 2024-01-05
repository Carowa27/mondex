import { useEffect, useState } from "react";

interface IProps {
  pageParam: string;
  collectionName?: string;
}

export const BreadCrumbs = ({ pageParam, collectionName }: IProps) => {
  return (
    <>
      {pageParam === "about" ? <>home/about</> : null}
      {pageParam === "userpage" ? <>home/userpage</> : null}
      {pageParam === "allCollections" ? <>home/userpage/allColls</> : null}
      {pageParam === "collection" ? (
        <>
          home/userpage/allColls/
          {collectionName && collectionName.replace(/_/g, " ")}
        </>
      ) : null}
    </>
  );
};
