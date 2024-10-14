import { ICard, ICollection } from "../interfaces/LSInterface";
import { IPkmnCard } from "../interfaces/dataFromApi";

export const addCardToCollection = (
  collectionName: string,
  collections: ICollection[],
  swap?: boolean,
  cardToAdd?: ICard,
  cardFromApi?: IPkmnCard
) => {
  const collection = collections.find(
    (col) => col.collection_name === collectionName
  );
  const collectionIndex = collections.findIndex(
    (col) => col.collection_name === collectionName
  );
  const cardIndex = collection?.cards_in_collection.findIndex(
    (cardToFind) =>
      cardToFind.card.id === (cardToAdd ? cardToAdd?.card.id : cardFromApi?.id)
  );
  const cardFound = collection?.cards_in_collection.find(
    (cardToFind) =>
      cardToFind.card.id === (cardToAdd ? cardToAdd?.card.id : cardFromApi?.id)
  );
  const updatedCollection =
    cardToAdd === undefined && cardIndex === -1
      ? {
          ...collections[collectionIndex],
          cards_in_collection: [
            ...collections[collectionIndex].cards_in_collection,
            { card: cardFromApi, amount: 1 },
          ],
        }
      : {
          ...collections[collectionIndex],
          cards_in_collection: [
            ...collections[collectionIndex].cards_in_collection.slice(
              0,
              cardIndex
            ),
            {
              ...collections[collectionIndex].cards_in_collection[cardIndex!],
              card: cardFound!.card,
              amount: cardFound!.amount + 1,
            },
            ...collections[collectionIndex].cards_in_collection.slice(
              cardIndex! + 1
            ),
          ],
        };

  const updatedCollections = [
    ...collections.slice(0, collectionIndex),
    updatedCollection,
    ...collections.slice(collectionIndex + 1),
  ];
  if (swap === true) {
    return updatedCollection;
  } else {
    return updatedCollections;
  }
};
export const removeCardFromCollection = (
  cardToSub: ICard,
  collectionName: string,
  collections: ICollection[],
  swap?: boolean
) => {
  const collection = collections.find(
    (col) => col.collection_name === collectionName
  );
  const collectionIndex = collections.findIndex(
    (col) => col.collection_name === collectionName
  );
  const cardIndex = collection?.cards_in_collection.findIndex(
    (cardToFind) => cardToFind.card.id === cardToSub?.card.id
  );

  const updatedCard = {
    ...collections[collectionIndex].cards_in_collection[cardIndex!],
    card: cardToSub.card,
    amount: cardToSub.amount - 1,
  };
  const updatedCollection =
    cardToSub.amount === 1
      ? {
          ...collections[collectionIndex],
          cards_in_collection: [
            ...collections[collectionIndex].cards_in_collection.filter(
              (_, index) => index !== cardIndex
            ),
          ],
        }
      : {
          ...collections[collectionIndex],
          cards_in_collection: [
            ...collections[collectionIndex].cards_in_collection.slice(
              0,
              cardIndex
            ),
            updatedCard,
            ...collections[collectionIndex].cards_in_collection.slice(
              cardIndex! + 1
            ),
          ],
        };

  const updatedCollections = [
    ...collections.slice(0, collectionIndex),
    updatedCollection,
    ...collections.slice(collectionIndex + 1),
  ];
  if (swap === true) {
    return updatedCollection;
  } else {
    return updatedCollections;
  }
};

export const swapCardToOtherCollection = (
  cardToSwap: ICard,
  newColl: string,
  oldColl: string,
  collections: ICollection[]
) => {
  const updatedCollOne = removeCardFromCollection(
    cardToSwap,
    oldColl,
    collections,
    true
  ) as ICollection;
  const collOneIndex = collections.findIndex(
    (coll) => coll.collection_name === updatedCollOne?.collection_name
  );
  const updatedCollTwo = addCardToCollection(
    newColl,
    collections,
    true,
    cardToSwap
  ) as ICollection;
  const collTwoIndex = collections.findIndex(
    (coll) => coll.collection_name === updatedCollTwo?.collection_name
  );
  const updatedStepOneCollections = [
    ...collections.slice(0, collOneIndex),
    updatedCollOne,
    ...collections.slice(collOneIndex + 1),
  ];
  const updatedStepTwoCollections = [
    ...updatedStepOneCollections.slice(0, collTwoIndex),
    updatedCollTwo,
    ...updatedStepOneCollections.slice(collTwoIndex + 1),
  ];
  return updatedStepTwoCollections;
};

export const sortPkmnCards = (cards: ICard[], coll: ICollection) => {
  if (coll?.set === undefined) {
    return cards.sort((a, b) => {
      const releaseDateA = new Date(a.card.set.releaseDate);
      const releaseDateB = new Date(b.card.set.releaseDate);

      if (isNaN(releaseDateA.getTime()) || isNaN(releaseDateB.getTime())) {
        throw new Error("Invalid release date");
      }

      if (releaseDateA < releaseDateB) return -1;
      if (releaseDateA > releaseDateB) return 1;

      const numberA = parseInt(a.card.number.replace(/[^0-9{}]/g, ""), 10);
      const numberB = parseInt(b.card.number.replace(/[^0-9{}]/g, ""), 10);

      if (isNaN(numberA) || isNaN(numberB)) {
        throw new Error("Invalid card number");
      }

      return numberA - numberB;
    });
  } else {
    return cards.sort((a, b) => {
      const numberA = parseInt(a.card.number.replace(/[^0-9{}]/g, ""), 10);
      const numberB = parseInt(b.card.number.replace(/[^0-9{}]/g, ""), 10);

      if (isNaN(numberA) || isNaN(numberB)) {
        throw new Error("Invalid card number");
      }

      return numberA - numberB;
    });
  }
};
export const sortArtistorCharCollRes = (cards: IPkmnCard[]) => {
  return cards.sort((a, b) => {
    const releaseDateA = new Date(a.set.releaseDate);
    const releaseDateB = new Date(b.set.releaseDate);

    if (isNaN(releaseDateA.getTime()) || isNaN(releaseDateB.getTime())) {
      throw new Error("Invalid release date");
    }

    if (releaseDateA < releaseDateB) return -1;
    if (releaseDateA > releaseDateB) return 1;

    const numberA = parseInt(a.number.replace(/[^0-9{}]/g, ""), 10);
    const numberB = parseInt(b.number.replace(/[^0-9{}]/g, ""), 10);

    if (isNaN(numberA) || isNaN(numberB)) {
      throw new Error("Invalid card number");
    }

    return numberA - numberB;
  });
};
