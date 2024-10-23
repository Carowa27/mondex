import { ICard, ICollection } from "../interfaces/LSInterface";

export const getUniqueAmountOfCardsOwned = (collections: ICollection[]) => {
  const totalCardAmount = collections.reduce(
    (acc, item) => acc + (item.cards_in_collection || []).length,
    0
  );
  return totalCardAmount;
};
export const getAmountOfCardsOwned = (collections: ICollection[]) => {
  const totalCardAmount = collections.reduce(
    (acc, item) =>
      acc +
      (item.cards_in_collection || []).reduce(
        (sum, card) => sum + card.amount,
        0
      ) *
        item.cards_in_collection.length,
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
  const tcgPlayer = card.card.tcgplayer;
  if (!tcgPlayer) return;

  const prices = tcgPlayer.prices;
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
    if (prices[priceType]?.mid !== undefined) {
      //@ts-ignore
      validPrice = prices[priceType].mid;
      //@ts-ignore
    } else if (prices[priceType]?.market !== undefined) {
      //@ts-ignore
      validPrice = prices[priceType].market;
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
export const getMostValuableCardOwned = (collections: ICollection[]) => {
  const allCards = collections
    .flat()
    .flatMap((collection) => collection.cards_in_collection);

  let highestMidPrice = 0;
  let highestMidCard: ICard | undefined;
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

  allCards.forEach((card) => {
    const tcgPlayer = card.card.tcgplayer;
    const prices = tcgPlayer?.prices;
    if (!prices) return;
    const priceType =
      Object.keys(prices).find((key) => allowedTypes.includes(key)) || "normal";

    if (
      !tcgPlayer ||
      !tcgPlayer.prices ||
      //@ts-ignore
      tcgPlayer.prices[priceType].mid === undefined
    ) {
      return; // Skip cards without valid mid price
    }
    //@ts-ignore
    const midPrice = tcgPlayer.prices[priceType].mid;

    if (midPrice > highestMidPrice) {
      highestMidPrice = midPrice;
      highestMidCard = card;
    }
  });
  return highestMidCard;
};

export const getValuesAndTypesOfCard = (
  card: ICard,
  market: "tcgplayer" | "cardmarket"
) => {
  const marketPlace = card.card[market];
  if (!marketPlace) return;

  const prices = marketPlace.prices;
  if (!prices) return;

  const allowedTypes = [
    "normal",
    "unlimited",
    "unlimitedHolofoil",
    "holofoil",
    "reverseHolofoil",
    "1stEdition",
    "1stEditionNormal",
    "1stEditionHolofoil",
    "averageSellPrice",
    "trendPrice",
  ];

  const priceTypes = Object.keys(prices);
  const priceByType: { type: string; value: number }[] = [];

  priceTypes.forEach((type) => {
    if (allowedTypes.includes(type)) {
      priceByType.push({ type: type, value: 0 });
    }
  });

  priceByType.forEach((obj) => {
    if (market === "tcgplayer") {
      if (prices) {
        //@ts-ignore
        if (prices[obj.value]?.mid !== null) {
          //@ts-ignore
          obj.value = Math.round(prices[obj.type].mid * 100) / 100;
          //@ts-ignore
        } else if (prices[obj.type]?.market !== null) {
          //@ts-ignore
          obj.value = Math.round(prices[obj.type].market * 100) / 100;
          //@ts-ignore
        } else {
          console.warn(`No valid price found for type: ${obj.type}`);
          return;
        }
      }
    }

    if (market === "cardmarket") {
      if (prices) {
        //@ts-ignore
        if (prices[obj.type] !== null) {
          //@ts-ignore
          obj.value = Math.round(prices[obj.type] * 100) / 100;
          //@ts-ignore
        } else {
          console.warn(`No valid price found for type: ${obj.type}`);
          return;
        }
      }
    }
  });

  return priceByType;
};
