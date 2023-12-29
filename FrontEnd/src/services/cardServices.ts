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
import { getOwnedCollectionByCollectionName } from "./collectionServices";

interface IGetAllOwnedCardsProps {
  user: User;
}
interface ICreateCardProps {
  user: User;
  cardFromApi: IPkmnCard;
  collectionName: string;
}
interface IGetOwnedCardByIdByIdProps {
  user: User;
  card: ICardFromDB;
}
interface IGetAllCardsFromCollectionByIdProps {
  collectionName: string;
  user: User;
}
interface IChangeAmountOnCardProps {
  user: User;
  card: ICardFromDB;
}

interface IDeleteOwnedCardByIdProps {
  user: User;
  card: ICardFromDB;
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
export const getOwnedCardById = async ({
  user,
  card,
}: IGetOwnedCardByIdByIdProps): Promise<ICardFromDB | undefined> => {
  const propData = {
    user_auth0_id: user.sub,
    cardId: card.id,
  };
  try {
    const result = await axios.post(
      `${import.meta.env.VITE_CONNECTION_DB}/api/v1/cards/getCard/`,
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
  cardFromApi,
  collectionName,
}: ICreateCardProps) => {
  const collection = await getOwnedCollectionByCollectionName({
    user,
    collectionName,
  });
  console.log(cardFromApi);
  const collectionId = collection!.id;
  const amount = 1;
  const userId = 1;
  const cardData = {
    user_id: userId,
    user_auth0_id: user.sub,
    amount: amount,
    api_card_id: cardFromApi.id,
    api_card_img_src_small: cardFromApi.images.small,
    api_card_img_src_large: cardFromApi.images.large,
    api_pkmn_name: cardFromApi.name,
    collection_id: collectionId,
    collection_name: collectionName,
  };
  try {
    const result = await axios.post(
      `${import.meta.env.VITE_CONNECTION_DB}/api/v1/cards/`,
      cardData,
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

export const addAmountOnCard = async ({
  user,
  card,
}: IChangeAmountOnCardProps) => {
  // const cardFromDb = await getOwnedCardById({ user, card });
  const newAmount = card.amount + 1;
  const updateData = {
    cardId: card.id,
    user_auth0_id: user.sub,
    amount: newAmount,
  };
  try {
    const result = await axios.post(
      `${import.meta.env.VITE_CONNECTION_DB}/api/v1/cards/updateCard/`,
      updateData,
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

export const subAmountOnCard = async ({
  user,
  card,
}: IChangeAmountOnCardProps) => {
  const newAmount = card.amount - 1;
  const updateData = {
    cardId: card.id,
    user_auth0_id: user.sub,
    amount: newAmount,
  };
  try {
    const result = await axios.post(
      `${import.meta.env.VITE_CONNECTION_DB}/api/v1/cards/updateCard/`,
      updateData,
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

export const deleteOwnedCardById = async ({
  user,
  card,
}: IDeleteOwnedCardByIdProps) => {
  const deleteData = {
    cardId: card.id,
    user_auth0_id: user.sub,
  };
  try {
    const result = await axios.post(
      `${import.meta.env.VITE_CONNECTION_DB}/api/v1/cards/deleteCard/`,
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
