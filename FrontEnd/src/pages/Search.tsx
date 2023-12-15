import { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { LanguageContext } from "../globals/language/language";

export const Search = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchParam, setSearchParam] = useState<string>("pkmn");
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { language } = useContext(LanguageContext);
  const handleSearchChange = (event: ChangeEvent) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    console.log("search for: ", searchValue);
    event.preventDefault();
    // searchWithApi(searchParam, searchValue);
  };
  return (
    <>
      <h2 id="search-header">{language.lang_code.word_search}</h2>
      <form id="search-form" onSubmit={handleSubmit}>
        <div
          id="search-form-container"
          className={
            isDesktop
              ? "d-flex justify-content-start"
              : "d-flex justify-content-around"
          }
        >
          <div>
            <div className="d-flex justify-content-around">
              <label htmlFor="search_text" className="pt-2 m-0">
                Name:{" "}
                <input
                  type="text"
                  id="search_text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  className="btn" //"input-group-text"
                />
              </label>
            </div>
            <div
              id="search_type"
              className="d-flex justify-content-around align-items-center mt-1"
            >
              <label htmlFor="pkmn" className="m-0">
                Pokémon:{" "}
                <input
                  type="radio"
                  name="search_for"
                  id="search_pkmn"
                  value="search_pkmn"
                  checked={searchParam === "pkmn"}
                  onChange={() => setSearchParam("pkmn")}
                />
              </label>
              <label htmlFor="artist" className="m-0">
                Artist:{" "}
                <input
                  type="radio"
                  name="search_for"
                  id="search_artist"
                  value="search_artist"
                  checked={searchParam === "artist"}
                  onChange={() => setSearchParam("artist")}
                />
              </label>
              <label htmlFor="set" className="m-0">
                Set:{" "}
                <input
                  type="radio"
                  name="search_for"
                  id="search_set"
                  value="search_set"
                  checked={searchParam === "set"}
                  onChange={() => setSearchParam("set")}
                />
              </label>
            </div>
          </div>
          <input className="btn m-2" type="submit" value="Submit" />
        </div>
      </form>
      <div
        style={{ minHeight: "80vh", outline: "1px solid black" }}
        className="mt-3 p-2"
      >
        search result box
      </div>
    </>
  );
};
