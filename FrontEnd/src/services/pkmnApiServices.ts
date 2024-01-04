import axios from "axios";
import {
  ICardResponse,
  IPkmnCard,
  IPkmnResponse,
  IPkmnSet,
  ISetResponse,
} from "../interfaces/dataFromApi";

const get = async <T>(url: string) => {
  return await axios.get<T>(url);
};

export const getPkmnFromApi = async (searchString: string, page: number) => {
  try {
    const result = await get<IPkmnResponse>(
      `https://api.pokemontcg.io/v2/cards/${searchString}&orderBy=number&pageSize=50&page=${page}`
    )
      .then((res) => {
        return res.data as IPkmnResponse;
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  } catch (error) {
    console.error("An error has occurred: ", error);
  }
};
export const getSetFromApi = async (searchString: string) => {
  try {
    const result = await get<ISetResponse>(
      `https://api.pokemontcg.io/v2/sets/${searchString}`
    )
      .then((res) => {
        return res.data.data as IPkmnSet;
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  } catch (error) {
    console.error("An error has occurred: ", error);
  }
};
export const getCardFromApi = async (searchString: string) => {
  try {
    const result = await get<ICardResponse>(
      `https://api.pokemontcg.io/v2/cards/${searchString}`
    )
      .then((res) => {
        return res.data.data as IPkmnCard;
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  } catch (error) {
    console.error("An error has occurred: ", error);
  }
};
