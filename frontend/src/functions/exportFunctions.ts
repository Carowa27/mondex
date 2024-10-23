import { IDataExchange } from "../interfaces/dataExchangeInterfaces";
import { ILSContainer } from "../interfaces/LSInterface";

export const convertObjectToCsv = (
  whatToExport: "all" | "collections",
  container: ILSContainer
) => {
  let exportedObject: IDataExchange = {
    language: container.language?.name === "English" ? "English" : "Svenska",
    theme: container.theme?.name === "light" ? "light" : "dark",
    user: {
      username: container.user?.username ? container.user.username : "",
      collections:
        container.user?.collections.map((coll) => {
          return {
            id: coll.id,
            setId: coll.set ? coll.set.id : "",
            character: coll.character ? coll.character : "",
            artist: coll.artist ? coll.artist : "",
            cards_in_collection: coll.cards_in_collection.map((card) => {
              return { id: card.card.id, amount: card.amount };
            }),
          };
        }) || [],
    },
  };
  if (whatToExport === "all") {
    console.log("export all", exportedObject);
  } else {
    if (whatToExport === "collections") {
      console.log("export colls", exportedObject.user.collections);
    }
  }
};
