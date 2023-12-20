import axios from "axios";
import { ICollectionFromDB, IUserFromDB } from "../interfaces/dataFromDB";
import { User } from "@auth0/auth0-react";
import { getUser } from "./userServices";

interface IGetAllOwnedCollectionsProps {
  user: User;
}

const get = async <T>(url: string) => {
  return await axios.get<T>(url);
};

export const getAllOwnedCollections = async (
  props: IGetAllOwnedCollectionsProps
) => {
  const email = props.user.email as string;
  const user = await getUser({ email }).then((res) => {
    return res?.data[0] as IUserFromDB;
  });
  try {
    const result = await get<ICollectionFromDB[]>(
      `${import.meta.env.VITE_CONNECTION_DB}/api/v1/collections/users/${
        user.id
      }`
    );
    return result.data;
  } catch (error) {
    console.error("An error has occurred: ", error);
  }
};
