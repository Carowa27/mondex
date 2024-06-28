import axios from "axios";
import { IPokeResponse } from "../interfaces/dataFromApi";

const get = async <T>(url: string) => {
  return await axios.get<T>(url);
};

export const getPokemonFromApi = async (dexNr: string) => {
  const searchString = `https://pokeapi.co/api/v2/pokemon/${dexNr}`;
  try {
    const result = await get<IPokeResponse>(searchString)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  } catch (error) {
    console.error("An error has occurred: ", error);
  }
};
