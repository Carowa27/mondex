import { ICard } from "../interfaces/LSInterface";

export const addCardToCollection = (card: ICard) => {
  if (card.amount === 1) {
    // add amount
  } else {
    // add card
  }
};
export const removeCardToCollection = (card: ICard) => {
  if (card.amount === 1) {
    // remove card
  } else {
    // sub amount
  }
};
