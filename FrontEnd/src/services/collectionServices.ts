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
interface IDeleteCollectionByIdProps {
  user: User;
  collection: ICollectionFromDB;
}
interface ICreateCollectionProps {
  user: User;
  collection_name: string;
  api_set_id: string | null;
}

export const getAllOwnedCollections = async (
  props: IGetAllOwnedCollectionsProps
) => {
  const propData = {
    user_auth0_id: props.user.sub,
  };
  try {
    const result = await axios.post(
      `${import.meta.env.VITE_CONNECTION_DB}/api/v1/collections/collections/`,
      propData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
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

    return result.data;
  } catch (error) {
    console.error("An error has occurred: ", error);
  }
};

export const deleteCollectionById = async (
  props: IDeleteCollectionByIdProps
) => {
  const deleteData = {
    user_auth0_id: props.user.sub,
    collectionId: props.collection.id,
  };
  try {
    const result = await axios.post(
      `${
        import.meta.env.VITE_CONNECTION_DB
      }/api/v1/collections/deleteCollection/`,
      deleteData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result;
  } catch (error) {
    console.error("An error has occurred: ", error);
  }
};

export const createCollection = async ({
  user,
  collection_name,
  api_set_id,
}: ICreateCollectionProps) => {
  console.log(user.sub, collection_name, api_set_id);
  try {
    const createData = {
      collection_name: collection_name,
      user_auth0_id: user.sub,
      api_set_id: api_set_id,
    };

    const result = await axios.post(
      `${
        import.meta.env.VITE_CONNECTION_DB
      }/api/v1/collections/createCollection/`,
      createData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result;
  } catch (error) {
    console.error("An error has occurred: ", error);
  }
};
