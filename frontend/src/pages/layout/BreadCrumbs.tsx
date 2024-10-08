import { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { variables } from "../../globals/variables";
import { Link } from "react-router-dom";
import { ContainerContext } from "../../globals/containerContext";

interface IProps {
  pageParam: string;
  collectionName?: string;
}

export const BreadCrumbs = ({ pageParam, collectionName }: IProps) => {
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { container } = useContext(ContainerContext);
  const language = container.language;
  const theme = container.theme;
  return (
    <>
      {isDesktop && (
        <div className="d-flex align-items-start pb-2 pe-4 fw-light fs-6 fst-italic d-flex align-items-end">
          {pageParam === "about" ? (
            <p className="m-0">
              <Link
                to="/"
                className="text-decoration-none"
                style={{
                  color: theme?.primaryColors.breadcrumbText.hex,
                }}
              >
                <span>{language?.lang_code.word_home}&nbsp;/&nbsp;</span>
              </Link>

              <Link
                to="/about"
                className="text-decoration-none"
                style={{
                  color: theme?.primaryColors.breadcrumbText.hex,
                }}
              >
                <span>{language?.lang_code.word_about}</span>
              </Link>
            </p>
          ) : null}
          {/* {pageParam === "userpage" ? (
            <p className="m-0">
              <Link
                to="/"
                className="text-decoration-none"
                style={{
                  color: theme?.primaryColors.breadcrumbText.hex,
                }}
              >
                <span>{language?.lang_code.word_home}&nbsp;/&nbsp;</span>
              </Link>

              <Link
                to="/userpage"
                className="text-decoration-none"
                style={{
                  color: theme?.primaryColors.breadcrumbText.hex,
                }}
              >
                <span>{language?.lang_code.word_userpage}</span>
              </Link>
            </p>
          ) : null} */}
          {/* {pageParam === "account" ? 
            <p className="m-0">
            <Link to="/" className="text-decoration-none"><span>{language?.lang_code.word_home}</span></Link>
              &nbsp;/&nbsp;
              <Link to="/home" className="text-decoration-none"><span>{language?.lang_code.word_userpage}</span></Link
              &nbsp;/&nbsp;
              <Link to="/home" className="text-decoration-none"><span>account</span></Link>
            </p> : null} */}
          {pageParam === "allCollections" ? (
            <p className="m-0">
              <Link
                to="/"
                className="text-decoration-none"
                style={{
                  color: theme?.primaryColors.breadcrumbText.hex,
                }}
              >
                <span>{language?.lang_code.word_home}&nbsp;/&nbsp;</span>
              </Link>

              {/* <Link
                to="/userpage"
                className="text-decoration-none"
                style={{
                  color: theme?.primaryColors.breadcrumbText.hex,
                }}
              >
                <span>{language?.lang_code.word_userpage}&nbsp;/&nbsp;</span>
              </Link> */}

              <Link
                to="/all-collections"
                className="text-decoration-none"
                style={{
                  color: theme?.primaryColors.breadcrumbText.hex,
                }}
              >
                <span>{language?.lang_code.collection_all_collections}</span>
              </Link>
            </p>
          ) : null}
          {pageParam === "collection" ? (
            <p className="m-0">
              <Link
                to="/"
                className="text-decoration-none"
                style={{
                  color: theme?.primaryColors.breadcrumbText.hex,
                }}
              >
                <span>{language?.lang_code.word_home}&nbsp;/&nbsp;</span>
              </Link>

              {/* <Link
                to="/userpage"
                className="text-decoration-none"
                style={{
                  color: theme?.primaryColors.breadcrumbText.hex,
                }}
              >
                <span>{language?.lang_code.word_userpage}&nbsp;/&nbsp;</span>
              </Link> */}

              <Link
                to="/all-collections"
                className="text-decoration-none"
                style={{
                  color: theme?.primaryColors.breadcrumbText.hex,
                }}
              >
                <span>
                  {language?.lang_code.collection_all_collections}&nbsp;/&nbsp;
                </span>
              </Link>

              <Link
                to={`/collection/${collectionName}`}
                className="text-decoration-none"
                style={{
                  color: theme?.primaryColors.breadcrumbText.hex,
                }}
              >
                {collectionName && collectionName.replace(/_/g, " ")}
              </Link>
            </p>
          ) : null}
        </div>
      )}
    </>
  );
};
