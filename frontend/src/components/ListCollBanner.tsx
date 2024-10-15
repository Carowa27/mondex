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
          width: isDesktop ? "max-content" : "90%",
          minWidth: "20%",

          display: "flex",
          flexDirection: "column",
          height: "max-content",
          minHeight: "5rem",
          backgroundColor: `rgba(${theme?.typeColors.colorless.rgb}, 0.1)`,
        }}
      >
        <h5 style={{ display: "flex", justifyContent: "space-between" }}>
          {collectionNameToShow}
          {collection.set?.id !== undefined && (
            <div>
              <img
                src={collection.set.images.symbol}
                alt={`${collection.set.name} logo`}
                style={{
                  maxHeight: "1.5rem",
                  marginRight: "1rem",
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
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "small" }}>
              Value: ~{getValueOfCardsOwned([collection])}$
            </span>
          </div>
        </h5>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ margin: 0 }}>
            {collection.set ? (
              <>
                Unique cards: {getUniqueAmountOfCardsOwned([collection])}/
                {collection.set.total}
              </>
            ) : (
              <>Cards in collection: {collection.cards_in_collection.length}</>
            )}
          </p>
        </div>
      </Link>
    </>
  );
};
