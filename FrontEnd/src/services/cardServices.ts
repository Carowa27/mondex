import axios from "axios";
import { ICardFromDB, IUserFromDB } from "../interfaces/dataFromDB";
import { getUser } from "./userServices";
import { User } from "@auth0/auth0-react";
import { IUserAuth } from "../interfaces/IUser";

interface IGetAllOwnedCardsProps {
  user: User;
}
const get = async <T>(url: string) => {
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
  const email = props.user.email as string;
  const user = await getUser({ email }).then((res) => {
    return res?.data[0] as IUserFromDB;
  });
  try {
    const result = await get<ICardFromDB[]>(
      `${import.meta.env.VITE_CONNECTION_DB}/api/v1/cards/users/${user.id}`
    );

    return result.data;
  } catch (error) {
    console.error("An error has occurred: ", error);
  }
};
