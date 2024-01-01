import axios from "axios";
import { IUserFromDB } from "../interfaces/dataFromDB";

interface IGetUserProps {
  email: string;
}
// interface userResponse {
//   data: IUserFromDB[];
//   status: number;
//   statusText: string;
// }
const get = async <T>(url: string) => {
  return await axios.get<T>(url);
};

export const getAllUsers = async () => {
  try {
    const result = await get<IUserFromDB[]>(
      `${import.meta.env.VITE_CONNECTION_DB}/api/v1/users/`
    );

    return result;
  } catch (error) {
    console.error("An error has occurred: ", error);
  }
};

export const getUser = async ({ email }: IGetUserProps) => {
  try {
    const result = await get<IUserFromDB[]>(
      `${import.meta.env.VITE_CONNECTION_DB}/api/v1/users/${email}`
    );

    return result;
  } catch (error) {
    console.error("An error has occurred: ", error);
  }
};
