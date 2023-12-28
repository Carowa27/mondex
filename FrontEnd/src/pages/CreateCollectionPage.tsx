import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { useState } from "react";

export const CreateCollectionPage = () => {
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const handleSubmit = () => {
    console.log("submit");
  };
  const [isSetCollection, setIsSetCollection] = useState<boolean>(false);
  return (
    <>
      <h2>Create new collection</h2>
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
                  Collection Name
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Collection Name"
                  aria-label="Collection Name"
                  aria-describedby="collection_name"
                />
              </div>
              <div className="d-flex mb-2">
                Is it a set collection:
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
                    No
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
                    Yes
                  </label>
                </div>
              </div>
              {isSetCollection ? (
                <div className="input-group mb-3">
                  <span className="input-group-text" id="set-name">
                    SetName / SetID?
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Set Name"
                    aria-label="Set Name"
                    aria-describedby="set-name"
                  />
                </div>
              ) : null}
            </div>
          </div>
          <input
            className="btn btn-secondary mt-1 mx-2 mb-3"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </>
  );
};
