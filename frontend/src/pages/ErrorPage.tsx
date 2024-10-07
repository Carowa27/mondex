import { CSSProperties, useContext, useEffect, useState } from "react";
import { getPokemonFromApi } from "../services/pokeApiService";
import { IPokeResponse } from "../interfaces/dataFromApi";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { ContainerContext } from "../globals/containerContext";

export const ErrorPage = () => {
  const { container } = useContext(ContainerContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const [pokemonList, setPokemonList] = useState<IPokeResponse[]>();
  const [numberList, setNumberList] = useState<string[]>();
  const language = container.language;
  const theme = container.theme;

  const getNumberArray = () => {
    const numbers: string[] = [];

    for (let i = 0; i < 6; i++) {
      if (numbers.length < 5) {
        const getNumber = Math.floor(Math.random() * 151) + 1;
        numbers.push(getNumber.toString());
      } else {
        setNumberList(numbers);
        // getPokemonArray();
      }
    }
  };
  const getPokemonArray = async () => {
    if (numberList) {
      const pokemonArray: IPokeResponse[] = [];
      for (let i = 0; i < numberList.length; i++) {
        if (!pokemonList || pokemonList.length < 5) {
          const pokemon = await getPokemonFromApi(numberList[i]);
          if (pokemon !== undefined) {
            pokemonArray.push(pokemon);
          }
        }
      }

      if (pokemonArray && pokemonArray.length === 5) {
        setPokemonList([...pokemonArray]);
      }
    }
  };

  useEffect(() => {
    getNumberArray();
  }, []);
  useEffect(() => {
    getPokemonArray();
  }, [numberList]);
  const inStyleDesktop = (i: number): CSSProperties => {
    if (i === 0)
      return { height: "30%", position: "absolute", top: 25, left: 100 };
    if (i === 1)
      return {
        height: "30%",
        position: "absolute",
        top: 200,
        right: 75,
      };
    if (i === 2)
      return { height: "30%", position: "absolute", top: 50, left: 520 };
    if (i === 3)
      return { height: "30%", position: "absolute", bottom: 150, right: 400 };
    if (i === 4)
      return { height: "30%", position: "absolute", bottom: 40, left: 30 };
    else {
      return { height: "30%" };
    }
  };
  const inStyleMobile = (i: number): CSSProperties => {
    if (i === 0)
      return { height: "30%", position: "absolute", top: 45, right: 0 };
    if (i === 1)
      return {
        height: "20%",
        position: "absolute",
        top: 45,
        left: 0,
        transform: "scaleX(-1)",
      };
    if (i === 2)
      return { height: "20%", position: "absolute", bottom: 0, right: 0 };
    if (i === 3)
      return {
        height: "30%",
        position: "absolute",
        bottom: 30,
        left: 0,
        transform: "scaleX(-1)",
      };
    if (i === 4)
      return { height: "30%", position: "absolute", right: 10, top: "45%" };
    else {
      return { height: "30%" };
    }
  };
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: theme?.primaryColors.background.hex,
        color: theme?.primaryColors.text.hex,
      }}
    >
      <div className=" d-flex justify-content-center flex-column h-75 ms-3">
        <h1>{language?.lang_code.error_oh_no}</h1>
        <h5>
          {language?.lang_code.error_something_went_wrong},{" "}
          {language?.lang_code.error_pkmn_fled}?!
        </h5>
        <Link
          to="/"
          className="text-decoration-none ps-3 mt-4"
          style={{
            color: theme?.primaryColors.link.hex,
          }}
        >
          <button
            className="btn"
            style={{
              border: `1px solid ${theme?.primaryColors.text.hex}`,
              color: theme?.primaryColors.text.hex,
            }}
          >
            Home
          </button>
        </Link>
      </div>
      <div>
        {pokemonList &&
          pokemonList?.map((pkmn, i) => (
            <div>
              <img
                style={isDesktop ? inStyleDesktop(i) : inStyleMobile(i)}
                key={i}
                src={pkmn.sprites.other["official-artwork"].front_default}
                alt={pkmn.forms[0].name}
              />
            </div>
          ))}
      </div>{" "}
    </div>
  );
};
