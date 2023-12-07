export interface ICardFromDB {
  id: number;
  user_id: number;
  amount: number;
  api_card_id: string;
  api_card_img_src_small: string;
  api_card_img_src_large: string;
  api_pkmn_name: string;
  created_at: Date;
}
