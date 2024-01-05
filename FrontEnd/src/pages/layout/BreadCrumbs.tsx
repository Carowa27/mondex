import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { variables } from "../../globals/variables";
import { Link } from "react-router-dom";

interface IProps {
  pageParam: string;
  collectionName?: string;
}

export const BreadCrumbs = ({ pageParam, collectionName }: IProps) => {
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  return (
    <>
      {isDesktop ? (
        <div className="d-flex align-items-start pb-2 pe-4 fw-light fs-6 fst-italic d-flex align-items-end text-secondary">
          {pageParam === "about" ? (
            <p className="m-0">
              <Link to="/" className="text-secondary text-decoration-none">
                <span>home</span>
              </Link>
              &nbsp;/&nbsp;
              <Link to="/about" className="text-secondary text-decoration-none">
                <span>about</span>
              </Link>
            </p>
          ) : null}
          {pageParam === "userpage" ? (
            <p className="m-0">
              <Link to="/" className="text-secondary text-decoration-none">
                <span>home</span>
              </Link>
              &nbsp;/&nbsp;
              <Link
                to="/userpage"
                className="text-secondary text-decoration-none"
              >
                <span>userpage</span>
              </Link>
            </p>
          ) : null}
          {/* {pageParam === "account" ? 
            <p className="m-0">
            <Link to="/" className="text-secondary text-decoration-none"><span>home</span></Link>
              &nbsp;/&nbsp;
              <Link to="/home" className="text-secondary text-decoration-none"><span>userpage</span></Link
              &nbsp;/&nbsp;
              <Link to="/home" className="text-secondary text-decoration-none"><span>account</span></Link>
            </p> : null} */}
          {pageParam === "allCollections" ? (
            <p className="m-0">
              <Link to="/" className="text-secondary text-decoration-none">
                <span>home</span>
              </Link>
              &nbsp;/&nbsp;
              <Link
                to="/userpage"
                className="text-secondary text-decoration-none"
              >
                <span>userpage</span>
              </Link>
              &nbsp;/&nbsp;
              <Link
                to="/all-collections"
                className="text-secondary text-decoration-none"
              >
                <span>allColls</span>
              </Link>
            </p>
          ) : null}
          {pageParam === "collection" ? (
            <p className="m-0">
              <Link to="/" className="text-secondary text-decoration-none">
                <span>home</span>
              </Link>
              &nbsp;/&nbsp;
              <Link
                to="/userpage"
                className="text-secondary text-decoration-none"
              >
                <span>userpage</span>
              </Link>
              &nbsp;/&nbsp;
              <Link
                to="/all-collections"
                className="text-secondary text-decoration-none"
              >
                <span>allColls</span>
              </Link>
              &nbsp;/&nbsp;
              <Link
                to={`/collection/${collectionName}`}
                className="text-secondary text-decoration-none"
              >
                {collectionName && collectionName.replace(/_/g, " ")}
              </Link>
            </p>
          ) : null}
        </div>
      ) : null}
    </>
  );
};
