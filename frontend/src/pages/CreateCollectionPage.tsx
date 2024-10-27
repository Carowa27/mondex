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
import {
  CreateButton,
  InputButton,
  StandardButton,
} from "../components/Buttons";
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
  const [foundCardsOnSearch, setFoundCardsOnSearch] = useState<
    IPkmnCard[] | undefined
  >(undefined);
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
    setFoundCardsOnSearch(undefined);
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

  useState(() => {
    if (collType === "none") {
      setArtistName("");
      setCharName("");
      setPkmnSetId("");
    } else {
      if (collType === "artist") {
        setCharName("");
        setPkmnSetId("");
      } else {
        if (collType === "char") {
          setArtistName("");
          setPkmnSetId("");
        } else {
          if (collType === "set") {
            setArtistName("");
            setCharName("");
          }
        }
      }
    }
  }, [collType]);
  return (
    <div style={{ minHeight: "90vh" }}>
      <form
        action="saveCollection"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginBottom: "1rem",
        }}
        onChange={() => setCreatedCollection(false)}
      >
        <label htmlFor="collName">
          Collection name:{" "}
          <input
            type="text"
            id="collName"
            value={collName}
            onChange={(e) => (
              setCollName(e.target.value), setNameExists(false)
            )}
          />
        </label>
        <div className="form-radio-row">
          <div className="form-radio-type">Set: </div>
          <label htmlFor="collSetYes">
            <input
              type="radio"
              id="collSetYes"
              value="collSetYes"
              checked={collType === "set"}
              name="collTypeSet"
              onChange={() => (
                setCollType("set"),
                setFoundCardsOnSearch(undefined),
                setArtistName(""),
                setCharName("")
              )}
            />{" "}
            Yes
          </label>
          <label htmlFor="collSetNo" className="form-radio-no">
            <input
              type="radio"
              id="collSetNo"
              value="collSetNo"
              checked={collType !== "set"}
              name="collTypeSet"
              onChange={() => (
                setCollType("none"),
                setFoundCardsOnSearch(undefined),
                setCharName(""),
                setArtistName(""),
                setPkmnSetId("")
              )}
            />{" "}
            No
          </label>
          {collType === "set" && (
            <>
              <label htmlFor="collSetName" className="form-specific-search">
                Id{" "}
                <input
                  type="text"
                  id="collSetName"
                  className="form-specific-input"
                  value={pkmnSetId}
                  onChange={(e) => (
                    setPkmnSetId(e.target.value),
                    setFoundCardsOnSearch(undefined)
                  )}
                />
                <InputButton
                  disabled={pkmnSetId === ""}
                  btnAction={(e) => (
                    searchForSet(pkmnSetId),
                    e.preventDefault(),
                    setFoundCardsOnSearch(undefined),
                    setFoundSetOnSearch(undefined)
                  )}
                  btnText={"Search"}
                />
              </label>
            </>
          )}
        </div>

        <div className="form-radio-row">
          <div className="form-radio-type"> Artist: </div>
          <label htmlFor="collArtistYes">
            <input
              type="radio"
              id="collArtistYes"
              value="collArtistYes"
              checked={collType === "artist"}
              name="collTypeArtist"
              onChange={() => (
                setCollType("artist"),
                setFoundCardsOnSearch(undefined),
                setCharName(""),
                setPkmnSetId("")
              )}
            />{" "}
            Yes
          </label>
          <label htmlFor="collSetNo" className="form-radio-no">
            <input
              type="radio"
              id="collSetNo"
              value="collSetNo"
              checked={collType !== "artist"}
              name="collTypeArtist"
              onChange={() => (
                setCollType("none"),
                setFoundCardsOnSearch(undefined),
                setCharName(""),
                setArtistName(""),
                setPkmnSetId("")
              )}
            />{" "}
            No
          </label>
          {collType === "artist" && (
            <>
              <label htmlFor="collArtistName" className="form-specific-search">
                Name{" "}
                <input
                  type="text"
                  id="collArtistName"
                  className="form-specific-input"
                  value={artistName}
                  onChange={(e) => (
                    setArtistName(e.target.value),
                    setFoundCardsOnSearch(undefined)
                  )}
                />
                <InputButton
                  disabled={artistName === ""}
                  btnAction={(e) => (
                    searchForCards("artist", artistName),
                    e.preventDefault(),
                    setFoundCardsOnSearch(undefined)
                  )}
                  btnText={"Search"}
                />
              </label>
            </>
          )}
        </div>

        <div className="form-radio-row">
          <div className="form-radio-type"> Character: </div>
          <label htmlFor="collCharYes">
            <input
              type="radio"
              id="collCharYes"
              value="collCharYes"
              checked={collType === "char"}
              name="collTypeChar"
              onChange={() => (
                setCollType("char"),
                setFoundCardsOnSearch(undefined),
                setArtistName(""),
                setPkmnSetId("")
              )}
            />{" "}
            Yes
          </label>
          <label htmlFor="collCharNo" className="form-radio-no">
            <input
              type="radio"
              id="collCharNo"
              value="collCharNo"
              checked={collType !== "char"}
              name="collTypeChar"
              onChange={() => (
                setCollType("none"),
                setFoundCardsOnSearch(undefined),
                setCharName(""),
                setArtistName(""),
                setPkmnSetId("")
              )}
            />{" "}
            No
          </label>{" "}
          {collType === "char" && (
            <>
              <label htmlFor="collCharName" className="form-specific-search">
                Name{" "}
                <input
                  type="text"
                  id="collCharName"
                  className="form-specific-input"
                  value={charName}
                  onChange={(e) => (
                    setCharName(e.target.value),
                    setFoundCardsOnSearch(undefined)
                  )}
                />
                <InputButton
                  disabled={charName === ""}
                  btnAction={(e) => (
                    searchForCards("char", charName),
                    e.preventDefault(),
                    setFoundCardsOnSearch([])
                  )}
                  btnText={"Search"}
                />
              </label>
            </>
          )}
        </div>

        <CreateButton
          disabled={
            (collName === "" && collType === "none") ||
            (collName === "" &&
              collType !== "none" &&
              foundCardsOnSearch === undefined) ||
            (collName === "" &&
              collType !== "none" &&
              foundCardsOnSearch !== undefined &&
              foundCardsOnSearch.length === 0) ||
            (collType !== "none" && foundCardsOnSearch === undefined) ||
            (collType !== "none" &&
              foundCardsOnSearch !== undefined &&
              foundCardsOnSearch.length === 0)
          }
          btnAction={(e) => handleSubmit(e)}
          btnText={"Create"}
        />
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
          {!isLoading && foundCardsOnSearch.length !== 0 && (
            <p>Here is an example of cards found</p>
          )}
          <div
            style={{
              display: "flex",
              gap: isDesktop || isTablet ? "0.5rem" : "0.2rem",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                gap: isDesktop || isTablet ? "0.5rem" : "0.2rem",
              }}
            >
              {foundCardsOnSearch
                .slice(0, isDesktop ? 10 : isTablet ? 7 : 5)
                .map((pkmn) => (
                  <div style={{ width: "10rem" }} key={pkmn.id}>
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
            </div>{" "}
            <div
              style={{
                width: "100%",
                display: "flex",
                gap: isDesktop || isTablet ? "0.5rem" : "0.2rem",
              }}
            >
              {foundCardsOnSearch
                .slice(
                  isDesktop ? 10 : isTablet ? 7 : 5,
                  isDesktop ? 20 : isTablet ? 14 : 10
                )
                .map((pkmn) => (
                  <div style={{ width: "10rem" }} key={pkmn.id}>
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
            </div>{" "}
            <div
              style={{
                width: "100%",
                display: "flex",
                gap: isDesktop || isTablet ? "0.5rem" : "0.2rem",
              }}
            >
              {foundCardsOnSearch
                .slice(
                  isDesktop ? 20 : isTablet ? 14 : 10,
                  isDesktop ? 30 : isTablet ? 21 : 15
                )
                .map((pkmn) => (
                  <div style={{ width: "10rem" }} key={pkmn.id}>
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
            {!isDesktop && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  gap: isDesktop || isTablet ? "0.5rem" : "0.2rem",
                }}
              >
                {foundCardsOnSearch
                  .slice(
                    isDesktop ? 30 : isTablet ? 21 : 15,
                    isDesktop ? 40 : isTablet ? 28 : 20
                  )
                  .map((pkmn) => (
                    <div style={{ width: "10rem" }} key={pkmn.id}>
                      <img
                        className="rounded"
                        src={pkmn && pkmn.images.small}
                        alt={pkmn && pkmn.name}
                        style={{
                          width: "100%",
                          opacity:
                            container.theme?.name === "dark" ? "0.8" : "1",
                        }}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </>
      )}
      {isLoading && <LoadingModule />}
      {createdCollection ? (
        <Link
          className="text-decoration-none"
          to={`/collection/${
            container.user?.collections[container.user?.collections.length - 1]
              .collection_name
          }`}
          style={{
            color: container.theme?.primaryColors.link.hex,
          }}
        >
          <p>
            {container.language?.lang_code.collection_created}:{" "}
            <span className="text-decoration-underline fst-italic">
              {
                container.user?.collections[
                  container.user?.collections.length - 1
                ].collection_name
              }
            </span>
          </p>
        </Link>
      ) : null}
      {nameExists && <p>Collection name already exists, try another one</p>}
    </div>
  );
};
