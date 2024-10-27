import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { ContainerContext } from "../globals/containerContext";
import { StandardButton } from "../components/Buttons";
import { errorPageData } from "../services/errorPageData";

export const ErrorPage = () => {
  const { container } = useContext(ContainerContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const isTablet = useMediaQuery({ query: variables.breakpoints.tablet });
  const language = container.language;
  const theme = container.theme;
  const navigate = useNavigate();
  const errorCards = errorPageData;

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",

        backgroundColor: theme?.primaryColors.background.hex,
      }}
    >
      <div
        style={{
          height: "100vh",
          position: "relative",
          zIndex: 200,
          color: theme?.primaryColors.text.hex,
        }}
      >
        <div className=" d-flex justify-content-center align-items-center flex-column h-75 m-0">
          <h1>{language?.lang_code.error_oh_no}</h1>
          <h5>
            {language?.lang_code.error_something_went_wrong}
            {/* ,{" "} */}
            {/* {language?.lang_code.error_pkmn_fled}?! */}
          </h5>
          {/* <Link
      to="/"
      className="text-decoration-none ps-3 mt-4"
      style={{
        color: theme?.primaryColors.link.hex,
      }}
    > */}
          <div style={{ width: "min-content" }}>
            <StandardButton
              btnAction={() => navigate("/", { replace: true })}
              disabled={false}
              btnText={language?.name === "English" ? "Home" : "Startsida"}
            />
          </div>
          {/* </Link> */}
        </div>
      </div>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          maxWidth: "100vw",
          maxHeight: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          flexWrap: "wrap",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        {errorCards &&
          errorCards?.map((pkmn, i) => (
            <div
              key={pkmn.name + i}
              style={{ width: isDesktop ? "5%" : isTablet ? "10%" : "20%" }}
            >
              <img
                className="rounded"
                src={pkmn.images.small}
                alt={pkmn.name}
                style={{
                  width: "100%",
                  opacity: 0.3,
                }}
              />
            </div>
          ))}
        {/* {pokemonList &&
      pokemonList?.map((pkmn, i) => (
        <div key={i}>
          <img
            style={isDesktop ? inStyleDesktop(i) : inStyleMobile(i)}
            key={i}
            src={pkmn.sprites.other["official-artwork"].front_default}
            alt={pkmn.forms[0].name}
          />
        </div>
      ))} */}
      </div>{" "}
    </div>
  );
};
