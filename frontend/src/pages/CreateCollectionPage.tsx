import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { getCardsFromApi, getSetFromApi } from "../services/pkmnTcgApiServices";
import { Link } from "react-router-dom";
import { ContainerContext } from "../globals/containerContext";
import { getToday } from "../functions/dateFunctions";
import { ICollection } from "../interfaces/LSInterface";
import { updateMondexLs } from "../functions/LSFunctions";
import { IPkmnCard, IPkmnSet } from "../interfaces/dataFromApi";
import { InputButton, StandardButton } from "../components/Buttons";
import { LoadingModule } from "../components/LoadingModule";
import { SmallPkmnCard } from "../components/SmallPkmnCard";
import { SmallPkmnCardSearch } from "../components/SmallPkmnCardSearch";

export const CreateCollectionPage = () => {
  const { container, updateContainer } = useContext(ContainerContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const isTablet = useMediaQuery({ query: variables.breakpoints.tablet });

  const [collType, setCollType] = useState<"artist" | "set" | "char" | "none">(
    "none"
  );
  const [collName, setCollName] = useState<string>("");
  const [pkmnSetId, setPkmnSetId] = useState<string>("");
  const [charName, setCharName] = useState<string>("");
  const [artistName, setArtistName] = useState<string>("");
  const [foundCardsOnSearch, setFoundCardsOnSearch] = useState<IPkmnCard[]>([]);
  const [foundSetOnSearch, setFoundSetOnSearch] = useState<IPkmnSet>();
  const [notCorrectSetId, setNotCorrectSetId] = useState<boolean>(false);
  const [notCorrectArtist, setNotCorrectArtist] = useState<boolean>(false);
  const [notCorrectChar, setNotCorrectChar] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [createdCollection, setCreatedCollection] = useState<boolean>(false);
  const [nameExists, setNameExists] = useState<boolean>(false);

  const checkIfNameExists = () => {
    const foundCollName = container?.user?.collections.filter(
      (coll) => coll.collection_name === collName.replace(" ", "_")
    );
    return foundCollName;
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const exist = checkIfNameExists();
    if (exist === undefined || exist.length !== 0) {
      setCreatedCollection(false);
      setNameExists(true);
    } else {
      if (collName === "") {
        setCreatedCollection(false);
      } else {
        handleCollectionCreation();
        setNameExists(false);
      }
    }
  };

  const handleCollectionCreation = () => {
    if (collType === "set") {
      const newCollection = {
        id: collName.replace(/ /g, "_") + "-" + getToday(),
        collection_name: collName.replace(/ /g, "_"),
        set: foundSetOnSearch,
        cards_in_collection: [],
        created_date: getToday(),
      };
      const updatedCollections = [
        ...container.user!.collections,
        newCollection,
      ];

      updateContainer(
        {
          username: container.user!.username,
          collections: updatedCollections as ICollection[],
        },
        "user"
      );
      setCreatedCollection(true);
      clearAfterCreation();
    } else {
      if (collType === "char") {
        const newCollection = {
          id: collName.replace(/ /g, "_") + "-" + getToday(),
          collection_name: collName.replace(/ /g, "_"),
          character: charName,
          cards_in_collection: [],
          created_date: getToday(),
        };
        const updatedCollections = [
          ...container.user!.collections,
          newCollection,
        ];

        updateContainer(
          {
            username: container.user!.username,
            collections: updatedCollections as ICollection[],
          },
          "user"
        );
        setCreatedCollection(true);
        clearAfterCreation();
      } else {
        if (collType === "artist") {
          const newCollection = {
            id: collName.replace(/ /g, "_") + "-" + getToday(),
            collection_name: collName.replace(/ /g, "_"),
            artist: artistName,
            cards_in_collection: [],
            created_date: getToday(),
          };
          const updatedCollections = [
            ...container.user!.collections,
            newCollection,
          ];

          updateContainer(
            {
              username: container.user!.username,
              collections: updatedCollections as ICollection[],
            },
            "user"
          );
          setCreatedCollection(true);
          clearAfterCreation();
        } else {
          const newCollection = {
            id: collName.replace(/ /g, "_") + "-" + getToday(),
            collection_name: collName.replace(/ /g, "_"),
            cards_in_collection: [],
            created_date: getToday(),
          };
          const updatedCollections = [
            ...container.user!.collections,
            newCollection,
          ];

          updateContainer(
            {
              username: container.user!.username,
              collections: updatedCollections as ICollection[],
            },
            "user"
          );
          setCreatedCollection(true);
        }
      }
    }
  };

  const clearAfterCreation = () => {
    setCollName("");
    setCollType("none");
    setArtistName("");
    setCharName("");
    setPkmnSetId("");
    setNameExists(false);
    setIsLoading(false);
    setNotCorrectChar(false);
    setNotCorrectArtist(false);
    setNotCorrectSetId(false);
    setFoundSetOnSearch(undefined);
    setFoundCardsOnSearch([]);
  };

  const searchForSet = async (setId: string) => {
    setIsLoading(true);
    await getSetFromApi(setId.replace(/[.,]/g, "pt")).then((res) => {
      if (res === undefined) {
        setNotCorrectSetId(true);
      } else {
        setFoundSetOnSearch(res);
        searchForCards("set", setId);
      }
    });
  };
  const searchForCards = async (
    type: "artist" | "char" | "set",
    name: string
  ) => {
    setIsLoading(true);
    await getCardsFromApi(
      type === "artist"
        ? `?q=artist:"${name}"`
        : type === "char"
        ? `?q=name:"${name}"`
        : `?q=set.id:"${name.replace(/[.,]/g, "pt")}"`,
      250
    ).then((res) => {
      if (type === "artist") {
        if (res === undefined) {
          setNotCorrectArtist(true);
        } else {
          setFoundCardsOnSearch(res);
          setIsLoading(false);
        }
      } else {
        if (type === "char") {
          if (res === undefined) {
            setNotCorrectChar(true);
          } else {
            setFoundCardsOnSearch(res);
            setIsLoading(false);
          }
        } else {
          if (type === "set") {
            if (res === undefined) {
              setNotCorrectChar(true);
            } else {
              setFoundCardsOnSearch(res);
              setIsLoading(false);
            }
          }
        }
      }
    });
  };

  return (
    <>
      <form
        action="saveCollection"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor="collName">
          Collection name:{" "}
          <input
            type="text"
            id="collName"
            value={collName}
            onChange={(e) => setCollName(e.target.value)}
          />
        </label>
        <div>
          Set:{" "}
          <label htmlFor="collSetYes">
            <input
              type="radio"
              id="collSetYes"
              value="collSetYes"
              checked={collType === "set"}
              name="collTypeSet"
              onChange={() => (setCollType("set"), setFoundCardsOnSearch([]))}
            />{" "}
            Yes
          </label>
          <label htmlFor="collSetNo">
            <input
              type="radio"
              id="collSetNo"
              value="collSetNo"
              checked={collType !== "set"}
              name="collTypeSet"
              onChange={() => (setCollType("none"), setFoundCardsOnSearch([]))}
            />{" "}
            No
          </label>
        </div>
        {collType === "set" && (
          <>
            <label htmlFor="collSetName">
              Set Id{" "}
              <input
                type="text"
                id="collSetName"
                value={pkmnSetId}
                onChange={(e) => setPkmnSetId(e.target.value)}
              />
              <button
                disabled={pkmnSetId === ""}
                onClick={(e) => (
                  searchForSet(pkmnSetId),
                  e.preventDefault(),
                  setFoundCardsOnSearch([]),
                  setFoundSetOnSearch(undefined)
                )}
              >
                Search set
              </button>
            </label>
          </>
        )}
        <div>
          Artist:{" "}
          <label htmlFor="collArtistYes">
            <input
              type="radio"
              id="collArtistYes"
              value="collArtistYes"
              checked={collType === "artist"}
              name="collTypeArtist"
              onChange={() => (
                setCollType("artist"), setFoundCardsOnSearch([])
              )}
            />{" "}
            Yes
          </label>
          <label htmlFor="collSetNo">
            <input
              type="radio"
              id="collSetNo"
              value="collSetNo"
              checked={collType !== "artist"}
              name="collTypeArtist"
              onChange={() => (setCollType("none"), setFoundCardsOnSearch([]))}
            />{" "}
            No
          </label>
        </div>
        {collType === "artist" && (
          <>
            <label htmlFor="collArtistName">
              Artist Name{" "}
              <input
                type="text"
                id="collArtistName"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
              />
              <button
                disabled={artistName === ""}
                onClick={(e) => (
                  searchForCards("artist", artistName),
                  e.preventDefault(),
                  setFoundCardsOnSearch([])
                )}
              >
                Search artist
              </button>
            </label>
          </>
        )}
        <div>
          Character:{" "}
          <label htmlFor="collCharYes">
            <input
              type="radio"
              id="collCharYes"
              value="collCharYes"
              checked={collType === "char"}
              name="collTypeChar"
              onChange={() => (setCollType("char"), setFoundCardsOnSearch([]))}
            />{" "}
            Yes
          </label>
          <label htmlFor="collCharNo">
            <input
              type="radio"
              id="collCharNo"
              value="collCharNo"
              checked={collType !== "char"}
              name="collTypeChar"
              onChange={() => (setCollType("none"), setFoundCardsOnSearch([]))}
            />{" "}
            No
          </label>
        </div>
        {collType === "char" && (
          <>
            <label htmlFor="collCharName">
              Character Name{" "}
              <input
                type="text"
                id="collCharName"
                value={charName}
                onChange={(e) => setCharName(e.target.value)}
              />
              <button
                disabled={charName === ""}
                onClick={(e) => (
                  searchForCards("char", charName),
                  e.preventDefault(),
                  setFoundCardsOnSearch([])
                )}
              >
                Search character
              </button>
            </label>
          </>
        )}
        <button
          disabled={
            (!collName && collType === "none") ||
            (collType === "set" &&
              foundCardsOnSearch &&
              foundCardsOnSearch.length === 0) ||
            (collType === "char" &&
              foundCardsOnSearch &&
              foundCardsOnSearch.length === 0) ||
            (collType === "artist" &&
              foundCardsOnSearch &&
              foundCardsOnSearch.length === 0)
          }
        >
          Create
        </button>
      </form>

      {notCorrectArtist && (
        <>Nothing found with that artist, do you have a typo?</>
      )}
      {notCorrectChar && <>Nothing found with that name, do you have a typo?</>}
      {notCorrectSetId && <>Not correct set id, do you have a typo?</>}
      {foundCardsOnSearch !== undefined && (
        <>
          {collType === "set" && foundSetOnSearch && (
            <p>
              The set you searched for "{foundSetOnSearch.id.replace("pt", ".")}
              " is named: {foundSetOnSearch.name}
            </p>
          )}
          {(collType === "artist" || collType === "char") && (
            <p>
              There are {foundCardsOnSearch.length} cards found with{" "}
              {collType === "artist" ? (
                <>"{artistName}" as the artist</>
              ) : (
                <> "{charName}" in the name</>
              )}
            </p>
          )}
          {!isLoading && <p>Here is an example of cards found</p>}
          <div style={{ display: "flex" }}>
            {foundCardsOnSearch.slice(0, 10).map((pkmn) => (
              <div style={{ width: "10rem" }}>
                <img
                  className="rounded"
                  src={pkmn && pkmn.images.small}
                  alt={pkmn && pkmn.name}
                  style={{
                    width: "100%",
                    opacity: container.theme?.name === "dark" ? "0.8" : "1",
                  }}
                />
              </div>
            ))}
          </div>
        </>
      )}
      {isLoading && <LoadingModule />}
      {createdCollection ? (
        <Link
          className="text-decoration-none"
          to={
            collName.includes(" ")
              ? `/collection/${collName.replace(/ /g, "_")}`
              : `/collection/${collName}`
          }
          style={{
            color: container.theme?.primaryColors.link.hex,
          }}
        >
          <p>
            {container.language?.lang_code.collection_created}:{" "}
            <span className="text-decoration-underline fst-italic">
              {collName}
            </span>
          </p>
        </Link>
      ) : null}
      {nameExists && <p>Collection name already exists, try another one</p>}
    </>
  );
};
