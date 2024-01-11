export interface ICardFromDB {
  id: number;
  user_id: number;
  amount: number;
  api_card_id: string;
  api_card_img_src_small: string;
  api_card_img_src_large: string;
  api_pkmn_name: string;
  collection_id: number;
  collection_name: string;
  created_at: Date;
}
export interface ICollectionFromDB {
  id: number;
  collection_name: string;
  user_id: number;
  user_auth0_id: string;
  api_set_id: string;
  created_at: Date;
}
