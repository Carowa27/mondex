import { useContext } from "react";
import { ICollection } from "../interfaces/LSInterface";
import { ContainerContext } from "../globals/containerContext";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { Link } from "react-router-dom";
import {
  getUniqueAmountOfCardsOwned,
  getValueOfCardsOwned,
} from "../functions/dataFunctions";

interface IListProps {
  collection: ICollection;
}

export const ListCollBanner = ({ collection }: IListProps) => {
  const { container } = useContext(ContainerContext);
  // const language = container.language;
  const theme = container.theme;
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const isTablet = useMediaQuery({ query: variables.breakpoints.tablet });

  const collectionNameToShow = collection.collection_name.replace(/_/g, " ");
  const characterNameToShow = collection.character?.replace(/_/g, " ");
  const artistNameToShow = collection.artist?.replace(/_/g, " ");
  return (
    <>
      <Link
        to={`/collection/${collection.collection_name}`}
        className={
          isDesktop
            ? "p-3 rounded text-decoration-none"
            : " py-2 rounded px-3 text-decoration-none"
        }
        style={{
          color: theme?.primaryColors.link.hex,
          border: `1px solid ${theme?.primaryColors.text.hex}`,
          width: isDesktop ? "max-content" : isTablet ? "45.5%" : "100%",
          minWidth: "20%",

          display: "flex",
          flexDirection: "column",
          height: "max-content",
          minHeight: "5rem",
          backgroundColor: `rgba(${theme?.typeColors.colorless.rgb}, 0.1)`,
        }}
      >
        <h5 style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="d-flex flex-wrap pe-2">
            {collectionNameToShow.length > 9 &&
            !isDesktop &&
            !isTablet &&
            collection?.set ? (
              <>
                {collectionNameToShow.slice(0, 9)} -
                <br />
                {collectionNameToShow.slice(10, collectionNameToShow.length)}
              </>
            ) : (
              collectionNameToShow
            )}
          </span>
          {collection.set?.id !== undefined && (
            <div>
              <img
                src={collection.set.images.symbol}
                alt={`${collection.set.name} logo`}
                style={{
                  maxHeight: "1.5rem",
                  marginRight: "0.5rem",
                }}
              />
            </div>
          )}
          {collection.character !== undefined && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: "small" }}>{characterNameToShow}</span>
            </div>
          )}
          {collection.artist !== undefined && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: "small" }}>{artistNameToShow}</span>
            </div>
          )}
          <div
            style={
              isDesktop || isTablet
                ? { display: "flex", alignItems: "center" }
                : { display: "flex", alignItems: "top", marginTop: "0.2rem" }
            }
          >
            <span style={{ fontSize: "small" }}>
              {container.language?.name === "English" ? <>Value</> : <>Värde</>}
              : ~{getValueOfCardsOwned([collection])}$
            </span>
          </div>
        </h5>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ margin: 0 }}>
            {collection.set ? (
              <>
                {container.language?.name === "English" ? (
                  <> Unique cards</>
                ) : (
                  <>Unika kort</>
                )}
                : {getUniqueAmountOfCardsOwned([collection])}/
                {collection.set.total}
              </>
            ) : (
              <>
                {" "}
                {container.language?.name === "English" ? (
                  <>Cards in collection</>
                ) : (
                  <>Kort i kollektion</>
                )}
                : {collection.cards_in_collection.length}
              </>
            )}
          </p>
        </div>
      </Link>
    </>
  );
};
