import {
  ICollectionDataExchange,
  IDataExchange,
} from "../interfaces/dataExchangeInterfaces";
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
            set_id: coll.set ? coll.set.id : "",
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
    // try {
    //   const headersArray = [
    //     "firstname",
    //     "lastname",
    //     "email",
    //     "country code",
    //     "phonenumber",
    //   ];
    //   const dataRow = `"${Object.values(jsonInputObject)
    //     .toString()
    //     .replaceAll(",", `","`)}"`;

    //   const headerRow = `"${headersArray.toString().replaceAll(",", `","`)}"`;
    //   const csvData = [headerRow, dataRow].join("\n");
    //   return csvData;
    // } catch (error) {
    //   console.error("Error converting JSON to CSV:", error);
    //   throw error;
    // }
  } else {
    if (whatToExport === "collections") {
      const objToConvert: ICollectionDataExchange[] =
        exportedObject.user.collections;
      try {
        const isArray = Array.isArray(objToConvert);
        const headerRow = Object.keys(objToConvert[0]).map((key) => `"${key}"`);
        let csvRows: string[] = [];
        if (isArray) {
          csvRows = objToConvert.map((item) => {
            let cardsRow = "";
            if (
              item.cards_in_collection &&
              Array.isArray(item.cards_in_collection) &&
              item.cards_in_collection.length > 0
            ) {
              const cardValues = item.cards_in_collection.map(
                (card) => `"${card.id}, ${card.amount}"`
              );
              cardsRow = cardValues.join(",");
            }
            return `"${item.id}",${item.set_id},${item.character},${item.artist},"${cardsRow}"`;
          });
        } else {
          console.error("Error converting JSON to CSV");
        }

        const csvData = [
          headerRow.join(","),
          ...csvRows.map((row) => row.replace(/"/g, "")),
        ].join("\n");

        generateCSV(csvData);
      } catch (error) {
        console.error("Error converting JSON to CSV:", error);
        throw error;
      }
    }
  }
};

const generateCSV = (csvData: string) => {
  const blob = new Blob([csvData], {
    type: "text/csv;charset=utf-8;",
  });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `testData.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
