import axios from "axios";
import { IPkmnCard, IPkmnResponse } from "../interfaces/dataFromApi";

const get = async <T>(url: string) => {
  return await axios.get<T>(url);
};

export const getPkmnFromApi = async (searchString: string) => {
  try {
    const result = await get<IPkmnResponse>(`${searchString}`)
      .then((res) => {
        return res.data.data as IPkmnCard[];
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  } catch (error) {
    console.error("An error has occurred: ", error);
  }
};
