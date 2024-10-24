export interface IDataExchange {
  language: "English" | "Svenska";
  theme: "light" | "dark";
  user: {
    username: string;
    collections: ICollectionDataExchange[];
  };
}

export interface ICollectionDataExchange {
  id: string;
  cards_in_collection: { id: string; amount: number }[];
  set_id?: string;
  character?: string;
  artist?: string;
}
