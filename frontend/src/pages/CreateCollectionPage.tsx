import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { getCardsFromApi, getSetFromApi } from "../services/pkmnTcgApiServices";
import { Link } from "react-router-dom";
import { ContainerContext } from "../globals/containerContext";
import { getToday } from "../functions/dateFunctions";
import { ICollection } from "../interfaces/LSInterface";
import { updateMondexLs } from "../functions/LSFunctions";
import { IPkmnSet } from "../interfaces/dataFromApi";
import { InputButton, StandardButton } from "../components/Buttons";
import { LoadingModule } from "../components/LoadingModule";

export const CreateCollectionPage = () => {
  const { container, updateContainer } = useContext(ContainerContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const [collectionName, setCollectionName] = useState<string>("");
  const [isSetCollection, setIsSetCollection] = useState<boolean>(false);
  const [setId, setSetId] = useState<string>("");
  const [setInputValue, setSetInputValue] = useState<string>("");
  const [pkmnSet, setPkmnSet] = useState<IPkmnSet | null>();
  const [notCorrectSetId, setNotCorrectSetId] = useState<boolean>(false);
  const [isCharCollection, setIsCharCollection] = useState<boolean>(false);
  const [charName, setCharName] = useState<string>("");
  const [charInputValue, setCharInputValue] = useState<string>("");
  const [charLength, setCharLength] = useState<number>();
  const [notCorrectCharName, setNotCorrectCharName] = useState<boolean>(false);
  const [isArtistCollection, setIsArtistCollection] = useState<boolean>(false);
  const [artistName, setArtistName] = useState<string>("");
  const [artistInputValue, setArtistInputValue] = useState<string>("");
  const [artistLength, setArtistLength] = useState<number>();
  const [notCorrectArtistName, setNotCorrectArtistName] =
    useState<boolean>(false);
  const [nameExists, setNameExists] = useState<boolean>(false);
  const [createdCollection, setCreatedCollection] = useState<boolean>(false);
  const [savedCollectionName, setSavedCollectionName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const language = container.language;
  const theme = container.theme;

  useEffect(() => {
    if (setInputValue.includes(".") || setInputValue.includes(",")) {
      setSetId(setInputValue.replace(/[.,]/g, "pt"));
    } else {
      setSetId(setInputValue);
    }
  }, [setInputValue]);
  useEffect(() => {
    setCharName(charInputValue);
  }, [charInputValue]);
  useEffect(() => {
    setArtistName(artistInputValue);
  }, [artistInputValue]);

  // useEffect(() => {
  //   if (setInputValue === "") {
  //     setCreatedCollection(false);
  //   }
  // }, [setInputValue, charInputValue]);

  const checkIfNameExists = () => {
    const foundCollName = container?.user?.collections.filter(
      (coll) => coll.collection_name === collectionName.replace(" ", "_")
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
      if (collectionName === "") {
        setCreatedCollection(false);
      } else {
        handleCollectionCreation();
        setNameExists(false);
      }
    }
  };

  const searchSet = async () => {
    await getSetFromApi(setId).then((res) => {
      if (res === undefined) {
        setNotCorrectSetId(true);
      } else {
        setPkmnSet(res);
        setIsLoading(false);
      }
    });
  };
  const searchChar = async () => {
    await getCardsFromApi(`?q=name:"*${charName}*"`).then((res) => {
      if (res === undefined) {
        setNotCorrectCharName(true);
      } else {
        setCharLength(res.length);
        setIsLoading(false);
      }
    });
  };
  const searchArtist = async () => {
    await getCardsFromApi(`?q=artist:"*${artistName}*"`).then((res) => {
      if (res === undefined) {
        setNotCorrectArtistName(true);
      } else {
        setArtistLength(res.length);
        setIsLoading(false);
      }
    });
  };
  const clearAfterCreation = () => {
    setCollectionName("");
    setIsSetCollection(false);
    setSetId("");
    setSetInputValue("");
    setPkmnSet(null);
    setNotCorrectSetId(false);
    setIsCharCollection(false);
    setCharName("");
    setCharInputValue("");
    setCharLength(undefined);
    setNotCorrectCharName(false);
    setIsArtistCollection(false);
    setArtistName("");
    setArtistInputValue("");
    setArtistLength(undefined);
    setNotCorrectArtistName(false);
    setNameExists(false);
  };
  const handleCollectionCreation = () => {
    if (isSetCollection) {
      const newCollection = {
        id: collectionName.replace(/ /g, "_") + "-" + getToday(),
        collection_name: collectionName.replace(/ /g, "_"),
        set: pkmnSet,
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
      setSavedCollectionName(collectionName);
      clearAfterCreation();
    } else {
      if (isCharCollection) {
        const newCollection = {
          id: collectionName.replace(/ /g, "_") + "-" + getToday(),
          collection_name: collectionName.replace(/ /g, "_"),
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
        setSavedCollectionName(collectionName);
        clearAfterCreation();
      } else {
        if (isArtistCollection) {
          const newCollection = {
            id: collectionName.replace(/ /g, "_") + "-" + getToday(),
            collection_name: collectionName.replace(/ /g, "_"),
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
          setSavedCollectionName(collectionName);
          clearAfterCreation();
        } else {
          const newCollection = {
            id: collectionName.replace(/ /g, "_") + "-" + getToday(),
            collection_name: collectionName.replace(/ /g, "_"),
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
          setSavedCollectionName(collectionName);
          // getData(user, collection_name, api_set_id);
        }
      }
    }
    // if (isSetCollection === true) {
    //   await getSetFromApi(api_set_id).then((res) => {
    //     if (res === undefined) {
    //       setNotCorrectSetId(true);
    //     } else {
    //       setPkmnSetInfo(res);
    //     }
    //   });
    // }
  };
  const handleCollectionNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCollectionName(event.target.value);
  };
  const handleSetIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSetInputValue(event.target.value);
  };
  const handleCharNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCharInputValue(event.target.value);
  };
  const handleArtistNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setArtistInputValue(event.target.value);
  };
  useEffect(() => {
    updateMondexLs(container);
  }, [container]);
  useEffect(() => {
    setCharInputValue(""), setArtistInputValue("");
  }, [isSetCollection]);
  useEffect(() => {
    setSetInputValue(""), setArtistInputValue("");
  }, [isCharCollection]);
  useEffect(() => {
    setSetInputValue(""), setCharInputValue("");
  }, [isArtistCollection]);

  return (
    <div style={{ minHeight: "90vh" }}>
      <h2>{language?.lang_code.collection_create_new_collection}</h2>
      <form id="search-form" onSubmit={handleSubmit}>
        <div
          id="search-form-container"
          className={
            isDesktop
              ? "d-flex justify-content-start"
              : "d-flex flex-column justify-content-around"
          }
        >
          <div className={isDesktop ? "w-50" : "w-100"}>
            <div id="search_type" className="d-flex flex-column mt-1">
              <div
                className={
                  !createdCollection && collectionName === ""
                    ? "input-group"
                    : "input-group mb-3"
                }
              >
                <span className="input-group-text" id="collection_name">
                  {language?.lang_code.collection_name}:*
                </span>
                <input
                  type="text"
                  value={collectionName}
                  onChange={handleCollectionNameChange}
                  className="form-control"
                  placeholder={language?.lang_code.collection_name}
                  aria-label="Collection Name"
                  aria-describedby="collection_name"
                />
              </div>
              {!createdCollection && collectionName === "" ? (
                <Link
                  className="text-decoration-none mb-3 mx-auto"
                  to={
                    savedCollectionName.includes(" ")
                      ? `/collection/${savedCollectionName.replace(/ /g, "_")}`
                      : `/collection/${savedCollectionName}`
                  }
                  style={{
                    color: theme?.primaryColors.link.hex,
                  }}
                >
                  <p style={{ margin: 0 }}>
                    You need to add a collection name to create a collection
                  </p>
                </Link>
              ) : null}
              <div className="d-flex" style={{ gap: "0.75rem" }}>
                <div className="input-group border w-50 mb-3 d-flex align-items-center rounded">
                  <span className="input-group-text" id="is-set">
                    {language?.lang_code.collection_is_set_collection}:
                  </span>
                  <div className="form-check ms-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="is-set"
                      id="is-set-no"
                      checked={isSetCollection === false}
                      onChange={() => setIsSetCollection(false)}
                    />
                    <label className="form-check-label" htmlFor="is-set-no">
                      {language?.lang_code.word_no}
                    </label>
                  </div>
                  <div className="form-check ms-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="is-set"
                      id="is-set-yes"
                      checked={isSetCollection === true}
                      onChange={() => (
                        setIsSetCollection(true),
                        setIsCharCollection(false),
                        setIsArtistCollection(false)
                      )}
                    />
                    <label className="form-check-label" htmlFor="is-set-yes">
                      {language?.lang_code.word_yes}
                    </label>
                  </div>
                </div>
                {isSetCollection ? (
                  <div className="input-group w-50 mb-3">
                    <span className="input-group-text" id="set-name">
                      {language?.lang_code.collection_set_id}:
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      value={setInputValue}
                      onChange={handleSetIdChange}
                      placeholder={language?.lang_code.collection_set_id}
                      aria-label="Set Name"
                      aria-describedby="set-name"
                    />
                    <InputButton
                      btnText="Search set id"
                      btnAction={(e) => (
                        e.preventDefault(), searchSet(), setIsLoading(true)
                      )}
                      disabled={isSetCollection && setId === ""}
                    ></InputButton>
                  </div>
                ) : null}
              </div>
              <div className="d-flex" style={{ gap: "0.75rem" }}>
                <div className="input-group border w-50 mb-3 d-flex align-items-center rounded">
                  <span className="input-group-text" id="is-char">
                    Is it a character collection:
                  </span>
                  <div className="form-check ms-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="is-char"
                      id="is-char-no"
                      checked={isCharCollection === false}
                      onChange={() => setIsCharCollection(false)}
                    />
                    <label className="form-check-label" htmlFor="is-char-no">
                      {language?.lang_code.word_no}
                    </label>
                  </div>
                  <div className="form-check ms-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="is-char"
                      id="is-char-yes"
                      checked={isCharCollection === true}
                      onChange={() => (
                        setIsSetCollection(false),
                        setIsCharCollection(true),
                        setIsArtistCollection(false)
                      )}
                    />
                    <label className="form-check-label" htmlFor="is-char-yes">
                      {language?.lang_code.word_yes}
                    </label>
                  </div>
                </div>
                {isCharCollection ? (
                  <div className="input-group w-50 mb-3">
                    <span className="input-group-text" id="char-name">
                      Character name:
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      value={charInputValue}
                      onChange={handleCharNameChange}
                      placeholder="Character"
                      aria-label="Character Name"
                      aria-describedby="char-name"
                    />
                    <InputButton
                      btnText="Search character"
                      btnAction={(e) => (
                        e.preventDefault(), searchChar(), setIsLoading(true)
                      )}
                      disabled={isCharCollection && charName === ""}
                    ></InputButton>
                  </div>
                ) : null}
              </div>
              <div className="d-flex" style={{ gap: "0.75rem" }}>
                <div className="input-group border w-50 mb-3 d-flex align-items-center rounded">
                  <span className="input-group-text" id="is-artist">
                    Is it a artist collection:
                  </span>
                  <div className="form-check ms-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="is-artist"
                      id="is-artist-no"
                      checked={isArtistCollection === false}
                      onChange={() => setIsArtistCollection(false)}
                    />
                    <label className="form-check-label" htmlFor="is-artist-no">
                      {language?.lang_code.word_no}
                    </label>
                  </div>
                  <div className="form-check ms-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="is-artist"
                      id="is-artist-yes"
                      checked={isArtistCollection === true}
                      onChange={() => (
                        setIsSetCollection(false),
                        setIsCharCollection(false),
                        setIsArtistCollection(true)
                      )}
                    />
                    <label className="form-check-label" htmlFor="is-artist-yes">
                      {language?.lang_code.word_yes}
                    </label>
                  </div>
                </div>
                {isArtistCollection ? (
                  <div className="input-group w-50 mb-3">
                    <span className="input-group-text" id="artist-name">
                      Artist name:
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      value={artistInputValue}
                      onChange={handleArtistNameChange}
                      placeholder="Artist"
                      aria-label="Artist Name"
                      aria-describedby="artist-name"
                    />
                    <InputButton
                      btnText="Search artist"
                      btnAction={(e: FormEvent) => (
                        e.preventDefault(), searchArtist(), setIsLoading(true)
                      )}
                      disabled={isArtistCollection && artistName === ""}
                    ></InputButton>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div
            style={isDesktop ? { height: "5rem", width: "5rem" } : {}}
            className={isDesktop ? "mx-2 mt-1" : "mt-2 mx-2 mb-3"}
          >
            <StandardButton
              btnAction={handleSubmit}
              disabled={
                (isSetCollection && !pkmnSet) ||
                (isCharCollection && charName === "") ||
                (isArtistCollection && artistName === "") ||
                !collectionName
              }
              btnText={`${language?.lang_code.word_create}`}
            />
          </div>
        </div>
      </form>{" "}
      {isLoading ? <LoadingModule /> : null}
      {notCorrectSetId ? (
        <>{language?.lang_code.collection_not_correct_set_id}</>
      ) : null}
      {pkmnSet && isSetCollection ? (
        <div style={{ marginLeft: "4.5rem" }}>
          {setInputValue} is {pkmnSet.name}
        </div>
      ) : null}
      {notCorrectCharName ? (
        <>There are no cards with "{charName}" in the name</>
      ) : null}
      {charLength && isCharCollection ? (
        <div style={{ marginLeft: "4.5rem" }}>
          There are {charLength} cards found with "{charName}" in the name
        </div>
      ) : null}
      {notCorrectArtistName ? (
        <>There are no cards with "{artistName}" as an artist</>
      ) : null}
      {artistLength && isArtistCollection ? (
        <div style={{ marginLeft: "4.5rem" }}>
          There are {artistLength} cards found with "{artistName}" as the artist
        </div>
      ) : null}
      {createdCollection ? (
        <Link
          className="text-decoration-none"
          to={
            savedCollectionName.includes(" ")
              ? `/collection/${savedCollectionName.replace(/ /g, "_")}`
              : `/collection/${savedCollectionName}`
          }
          style={{
            color: theme?.primaryColors.link.hex,
          }}
        >
          <p>
            {language?.lang_code.collection_created}:{" "}
            <span className="text-decoration-underline fst-italic">
              {savedCollectionName}
            </span>
          </p>
        </Link>
      ) : null}
      {nameExists && <p>Collection name already exists, try another one</p>}
    </div>
  );
};
