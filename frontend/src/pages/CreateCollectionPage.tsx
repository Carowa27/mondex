import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { createCollection } from "../services/collectionServices";
import { User, useAuth0 } from "@auth0/auth0-react";
import { getSetFromApi } from "../services/pkmnTcgApiServices";
import { Link } from "react-router-dom";
import { ThemeContext } from "../globals/theme";
import { ContainerContext } from "../globals/containerContext";

export const CreateCollectionPage = () => {
  const { isAuthenticated, user } = useAuth0();
  const { container } = useContext(ContainerContext);
  const { theme } = useContext(ThemeContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const [collectionName, setCollectionName] = useState<string>("");
  const [isSetCollection, setIsSetCollection] = useState<boolean>(false);
  const [setId, setSetId] = useState<string>("");
  const [setInputValue, setSetInputValue] = useState<string>("");
  const [notCorrectSetId, setNotCorrectSetId] = useState<boolean>(false);
  const [createdCollection, setCreatedCollection] = useState<boolean>(false);
  const [savedCollectionName, setSavedCollectionName] = useState<string>("");
  const language = container.language;

  useEffect(() => {
    if (setInputValue.includes(".") || setInputValue.includes(",")) {
      setSetId(setInputValue.replace(/[.,]/g, "pt"));
    } else {
      setSetId(setInputValue);
    }
  }, [setInputValue]);

  useEffect(() => {
    if (setInputValue === "") {
      setCreatedCollection(false);
    }
  }, [setInputValue]);

  const handleSubmit = async (event: FormEvent) => {
    setNotCorrectSetId(false);
    setCreatedCollection(false);
    event.preventDefault();
    const collection_name = collectionName.replace(/ /g, "_");
    let api_set_id: string | null = setId;
    if (user && isAuthenticated) {
      if (isSetCollection === true) {
        await getSetFromApi(api_set_id).then((res) => {
          if (res === undefined) {
            setNotCorrectSetId(true);
          } else {
            getData(user, collection_name, api_set_id);
          }
        });
      } else {
        api_set_id = null;
        getData(user, collection_name, api_set_id);
      }
    }
  };
  const getData = async (
    user: User,
    collection_name: string,
    api_set_id: string | null
  ) => {
    await createCollection({ user, collection_name, api_set_id }).then(
      (res) => {
        if (res?.status === 200) {
          setCreatedCollection(true);
          setSavedCollectionName(collectionName);
        }
      }
    );
  };
  const handleCollectionNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCollectionName(event.target.value);
  };
  const handleSetIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSetInputValue(event.target.value);
  };

  return (
    <div style={{ minHeight: "90vh" }}>
      <h2>{language.lang_code.collection_create_new_collection}</h2>
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
              <div className="input-group mb-3">
                <span className="input-group-text" id="collection_name">
                  {language.lang_code.collection_name}:
                </span>
                <input
                  type="text"
                  value={collectionName}
                  onChange={handleCollectionNameChange}
                  className="form-control"
                  placeholder={language.lang_code.collection_name}
                  aria-label="Collection Name"
                  aria-describedby="collection_name"
                />
              </div>
              <div>
                <div className="input-group mb-3 d-flex align-items-center rounded">
                  <span className="input-group-text" id="is-set">
                    {language.lang_code.collection_is_set_collection}:
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
                      {language.lang_code.word_no}
                    </label>
                  </div>
                  <div className="form-check ms-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="is-set"
                      id="is-set-yes"
                      checked={isSetCollection === true}
                      onChange={() => setIsSetCollection(true)}
                    />
                    <label className="form-check-label" htmlFor="is-set-yes">
                      {language.lang_code.word_yes}
                    </label>
                  </div>
                </div>
              </div>
              {isSetCollection ? (
                <div className="input-group mb-3">
                  <span className="input-group-text" id="set-name">
                    {language.lang_code.collection_set_id}
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    value={setInputValue}
                    onChange={handleSetIdChange}
                    placeholder={language.lang_code.collection_set_id}
                    aria-label="Set Name"
                    aria-describedby="set-name"
                  />
                </div>
              ) : null}
            </div>
          </div>
          <input
            className={
              isDesktop
                ? "btn btn-secondary mt-5 mx-2 mb-3 h-25"
                : "btn btn-secondary mt-2 mx-2 mb-3"
            }
            type="submit"
            value={language.lang_code.word_create}
          />
        </div>
      </form>
      {notCorrectSetId ? (
        <>{language.lang_code.collection_not_correct_set_id}</>
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
            color: theme.primaryColors.link.hex,
          }}
        >
          <p>
            {language.lang_code.collection_created}:{" "}
            <span className="text-decoration-underline fst-italic">
              {savedCollectionName}
            </span>
          </p>
        </Link>
      ) : null}
    </div>
  );
};
