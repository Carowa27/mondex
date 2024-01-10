import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../globals/language/language";
import { ThemeContext } from "../globals/theme";
import { getPokemonFromApi } from "../services/pokeApiService";
import { IPokeResponse } from "../interfaces/dataFromApi";

export const ErrorPage = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const [pokemonList, setPokemonList] = useState<IPokeResponse[]>();
  const [numberList, setNumberList] = useState<string[]>();

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

  return (
    <div className="border" style={{ height: "100vh" }}>
      <h1>404</h1>
      {/* <img src={pokemon?.sprites.front_default} alt={pokemon?.forms[0].name} /> */}

      {pokemonList &&
        pokemonList?.map((pkmn, i) => (
          <img
            key={i}
            src={pkmn.sprites.front_default}
            alt={pkmn.forms[0].name}
          />
        ))}
    </div>
  );
};
