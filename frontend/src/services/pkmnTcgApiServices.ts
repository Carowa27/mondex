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

export const getPkmnFromApi = async (
  searchString: string,
  page: number,
  pageSize: number
) => {
  try {
    if (searchString.includes("artist") || searchString.includes("name")) {
      const result = await get<IPkmnResponse>(
        `https://api.pokemontcg.io/v2/cards/${searchString}&orderBy=set.releaseDate&pageSize=${pageSize}&page=${page}`
      )
        .then((res) => {
          return res.data as IPkmnResponse;
        })
        .catch((error) => {
          console.error(error);
        });
      return result;
    } else {
      const result = await get<IPkmnResponse>(
        `https://api.pokemontcg.io/v2/cards/${searchString}&orderBy=number&pageSize=${pageSize}&page=${page}`
      )
        .then((res) => {
          return res.data as IPkmnResponse;
        })
        .catch((error) => {
          console.error(error);
        });
      return result;
    }
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
export const getCardFromApi = async (
  searchString: string,
  pageSize: number
) => {
  try {
    const result = await get<ICardResponse>(
      `https://api.pokemontcg.io/v2/cards/${searchString}&pageSize=${pageSize}`
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

export const getMostValuableCardFromApi = async () => {
  try {
    const result = await get<IPkmnResponse>(
      `https://api.pokemontcg.io/v2/cards/?orderBy=-tcgplayer.prices`
    )
      .then((res) => {
        return res.data.data.slice(0, 6) as IPkmnCard[];
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  } catch (error) {
    console.error("An error has occurred: ", error);
  }
};
export const getCardsFromApi = async (
  searchString: string,
  pageSize: number
) => {
  try {
    const result = await get<IPkmnResponse>(
      `https://api.pokemontcg.io/v2/cards/${searchString}&pageSize=${pageSize}`
    )
      .then((res) => {
        return res.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  } catch (error) {
    console.error("An error has occurred: ", error);
  }
};
