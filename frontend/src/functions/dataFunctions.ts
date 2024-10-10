import { ICard, ICollection } from "../interfaces/LSInterface";

export const getAmountOfCardsOwned = (collections: ICollection[]) => {
  const totalCardAmount = collections.reduce(
    (acc, item) => acc + (item.cards_in_collection || []).length,
    0
  );
  return totalCardAmount;
};

export const getValueOfCardsOwned = (collections: ICollection[]) => {
  const allCards = collections
    .flat()
    .flatMap((collection) => collection.cards_in_collection);

  let totalCardValue = 0;

  allCards.forEach((card) => {
    const cardPrice = getValueOfCard(card);
    totalCardValue += cardPrice! * card.amount;
  });
  return Math.round(totalCardValue * 100) / 100;
};

export const getValueOfCard = (card: ICard) => {
  const tcgMarket = card.card.tcgplayer;
  if (!tcgMarket) return;

  const prices = tcgMarket.prices;
  if (!prices) return;

  let validPrice: number | undefined;

  const allowedTypes = [
    "normal",
    "unlimited",
    "unlimitedHolofoil",
    "holofoil",
    "reverseHolofoil",
    "1stEdition",
    "1stEditionNormal",
    "1stEditionHolofoil",
  ];

  const priceType =
    Object.keys(prices).find((key) => allowedTypes.includes(key)) || "normal";
  if (prices) {
    //@ts-ignore
    if (prices[priceType]?.market !== undefined) {
      //@ts-ignore
      validPrice = prices[priceType].market;
      //@ts-ignore
    } else if (prices[priceType]?.mid !== undefined) {
      //@ts-ignore
      validPrice = prices[priceType].mid;
      //@ts-ignore
    } else if (prices[priceType]?.low !== undefined) {
      //@ts-ignore
      validPrice = prices[priceType].low;
    } else {
      console.warn(`No valid price found for type: ${priceType}`);
      return;
    }
  }

  return Math.round(validPrice! * 100) / 100;
};
