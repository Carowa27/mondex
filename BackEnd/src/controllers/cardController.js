import { pool } from "../database/database.js";

export async function createCard(req, res) {
  await pool.query(
    `INSERT INTO cards 
  (user_id, amount, api_card_id, api_card_img_src_small, api_card_img_src_large, api_pkmn_name) VALUES(?,?,?,?,?,?)`,
    [
      req.params.user_id,
      req.params.amount,
      req.params.api_card_id,
      req.params.api_card_img_src_small,
      req.params.api_card_img_src_large,
      req.params.api_pkmn_name,
    ]
  );
}

export async function getAllOwnedCards(req, res) {
  try {
    const result = await pool.query("SELECT * FROM cards WHERE user_id = ?", [
      req.params.userId,
    ]);
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
export async function getAllCards() {
  try {
    const result = await pool.query("SELECT * FROM cards");
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
export async function getOwnedCardById(req, res) {
  try {
    const [rows, fields] = await pool.query(
      "SELECT * FROM cards WHERE user_id = ? AND id = ?",
      [req.params.userId, req.params.cardId]
    );
    console.log(rows[0]);
  } catch (error) {
    console.error(error);
  }
}
