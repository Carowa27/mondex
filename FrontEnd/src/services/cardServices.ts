import axios from "axios";
import { ICardFromDB } from "../interfaces/dataFromDB";

interface IGetAllOwnedCardsProps {
  user: string[];
}
const get = async <T>(url: string) => {
  console.log(await axios.get<T>(url));
  return await axios.get<T>(url);
};

export const getAllCards = async () => {
  try {
    const result = await get<ICardFromDB[]>(
      `${import.meta.env.VITE_CONNECTION_DB}/api/v1/cards/`
    );

    return result;
  } catch (error) {
    console.error("An error has occurred: ", error);
  }
};

export const getAllOwnedCards = async (props: IGetAllOwnedCardsProps) => {
  const user = props.user;
  //get user from db
  //if auth0_id === user.sub
  //take user_id from user and save in variable
  try {
    const result = await get<ICardFromDB[]>(
      `${import.meta.env.VITE_CONNECTION_DB}/api/v1/cards/`
    );
    console.log(`${import.meta.env.VITE_CONNECTION_DB}/api/v1/cards/`);

    console.log(await result);
    return result;
  } catch (error) {
    console.error("An error has occurred: ", error);
  }
};
