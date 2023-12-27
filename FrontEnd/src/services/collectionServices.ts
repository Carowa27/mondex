import axios from "axios";
import { ICollectionFromDB, IUserFromDB } from "../interfaces/dataFromDB";
import { User } from "@auth0/auth0-react";
import { getUser } from "./userServices";

interface IGetAllOwnedCollectionsProps {
  user: User;
}
interface IGetOwnedCollectionByIdProps {
  user: User;
  collectionName: string;
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

export const getOwnedCollectionByCollectionName = async (
  props: IGetOwnedCollectionByIdProps
): Promise<ICollectionFromDB | undefined> => {
  const propData = {
    user_auth0_id: props.user.sub,
    collection_name: props.collectionName,
  };
  try {
    const result = await axios.post(
      `${import.meta.env.VITE_CONNECTION_DB}/api/v1/collections/collection/`,
      propData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.error("An error has occurred: ", error);
  }
};
