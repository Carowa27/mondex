import axios from "axios";
import {
  ICardFromDB,
  ICollectionFromDB,
  IUserFromDB,
} from "../interfaces/dataFromDB";
import { getUser } from "./userServices";
import { User } from "@auth0/auth0-react";
import { IUserAuth } from "../interfaces/IUser";
import { IPkmnCard } from "../interfaces/dataFromApi";

interface IGetAllOwnedCardsProps {
  user: User;
}
interface ICreateCardProps {
  user: User;
  card: IPkmnCard;
}
interface IGetAllCardsFromCollectionByIdProps {
  collectionName: string;
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

export const getAllCardsFromCollectionById = async (
  props: IGetAllCardsFromCollectionByIdProps
): Promise<ICardFromDB[] | undefined> => {
  const propData = {
    user_auth0_id: props.user.sub,
    collection_name: props.collectionName,
  };
  try {
    const result = await axios.post(
      `${import.meta.env.VITE_CONNECTION_DB}/api/v1/cards/collections/`,
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

export const getAllOwnedCards = async (
  props: IGetAllOwnedCardsProps
): Promise<ICardFromDB[] | undefined> => {
  try {
    const user = { user_auth0_id: props.user.sub };
    const response = await axios.post(
      `${import.meta.env.VITE_CONNECTION_DB}/api/v1/cards/users/`,
      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("An error has occurred: ", error);
  }
};

export const createCard = async ({
  user,
  card,
}: ICreateCardProps): Promise<any> => {
  const amount = 1;
  const userId = 1;
  const collection = "MasterCollection";
  const cardData = {
    user_id: userId,
    user_auth0_id: user.sub,
    amount: amount,
    api_card_id: card.id,
    api_card_img_src_small: card.images.small,
    api_card_img_src_large: card.images.large,
    api_pkmn_name: card.name,
    collection_name: collection,
  };
  try {
    console.log(cardData);
    const result = await axios.post(
      `${import.meta.env.VITE_CONNECTION_DB}/api/v1/cards/`,
      cardData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(result);
    return result;
  } catch (error) {
    console.error("An error has occurred: ", error);
  }
};
