import axios from "axios";
import { ICardFromDB } from "../interfaces/dataFromDB";

const get = async <T>(url: string) => {
  return await axios.get<T>(url);
};

export const getAllCards = async () => {
  try {
    const result = get<ICardFromDB[]>(`http://localhost:4322/api/v1/cards/`);
    // const result = await axios.get<ICardFromDB[]>(
    //   `http://localhost:4322/api/v1/cards/`
    // );
    console.log(result);
    return result;
  } catch (error) {
    console.error("An error has occurred: ", error);
  }
};
