import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { LanguageContext } from "../globals/language/language";
import { createCollection } from "../services/collectionServices";
import { useAuth0 } from "@auth0/auth0-react";
import { getSetFromApi } from "../services/pkmnApiServices";

export const CreateCollectionPage = () => {
  const { isAuthenticated, user } = useAuth0();
  const { language } = useContext(LanguageContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const [collectionName, setCollectionName] = useState<string>("");
  const [isSetCollection, setIsSetCollection] = useState<boolean>(false);
  const [setId, setSetId] = useState<string>("");
  const [notCorrectSetId, setNotCorrectSetId] = useState<boolean>(false);
  const [createdCollection, setCreatedCollection] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent) => {
    setNotCorrectSetId(false);
    setCreatedCollection(false);
    event.preventDefault();
    console.log("clicked");
    const collection_name = collectionName.replace(/ /g, "_");
    let api_set_id: string | null = setId;
    if (user && isAuthenticated) {
      if (isSetCollection === true) {
        await getSetFromApi(api_set_id).then((res) => {
          if (res === undefined) {
            console.log("have you written the correct set id?");
            setNotCorrectSetId(true);
          } else {
            setCreatedCollection(true);
          }
        });
      } else {
        api_set_id = null;
        setCreatedCollection(true);
      }
      if (createdCollection === true) {
        await createCollection({ user, collection_name, api_set_id }).then(
          (res) => console.log(res)
        );
      }
    }
  };
  const handleCollectionNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCollectionName(event.target.value);
  };
  const handleSetIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSetId(event.target.value);
  };
  return (
    <>
      <h2>{language.lang_code.collection_create_new_collection}</h2>
      <form id="search-form" onSubmit={handleSubmit}>
        <div
          id="search-form-container"
          className={
            isDesktop
              ? "d-flex justify-content-start"
              : "d-flex justify-content-around"
          }
        >
          <div className="w-25">
            <div id="search_type" className="d-flex flex-column  mt-1">
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
                    value={setId}
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
            className="btn btn-secondary mt-5 mx-2 mb-3 h-25"
            type="submit"
            value={language.lang_code.word_submit}
          />
        </div>
      </form>
      {notCorrectSetId ? <>have you written the correct set id?</> : null}
      {createdCollection ? <>Collection created: {collectionName}</> : null}
    </>
  );
};
