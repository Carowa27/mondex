import { ICard, ICollection } from "../interfaces/LSInterface";
import { useContext } from "react";
import { ContainerContext } from "../globals/containerContext";
import { IPkmnCard } from "../interfaces/dataFromApi";

interface IAddCardProps {
  cardFromApi: IPkmnCard | undefined;
  card: ICard | undefined;
  collectionName: string;
  cardList: ICard[];
}

export const addCardToCollection = ({
  card,
  cardFromApi,
  collectionName,
  cardList,
}: IAddCardProps) => {
  console.log("in fn", card, cardFromApi);
  if (card?.amount === 1) {
    // add card
  } else {
    // create amount
  }
};
export const removeCardToCollection = (card: ICard) => {
  if (card.amount === 1) {
    // remove card
  } else {
    // sub amount
  }
};
