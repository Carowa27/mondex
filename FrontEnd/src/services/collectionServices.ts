import axios from "axios";
import { ICollectionFromDB } from "../interfaces/dataFromDB";

const get = async <T>(url: string) => {
  console.log(await axios.get<T>(url));
  return await axios.get<T>(url);
};

export const getAllOwnedCollections = async () => {
  const userId = 1;
  try {
    const result = await get<ICollectionFromDB[]>(
      `${import.meta.env.VITE_CONNECTION_DB}/api/v1/collections/user/${userId}`
    );

    console.log(await result);
    return result;
  } catch (error) {
    console.error("An error has occurred: ", error);
  }
};
