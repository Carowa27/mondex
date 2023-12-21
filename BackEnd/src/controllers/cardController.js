import { pool } from "../database/database.js";

export async function createCard(req, res) {
  try {
    const {
      user_id,
      user_auth0_id,
      amount,
      api_card_id,
      api_card_img_src_small,
      api_card_img_src_large,
      api_pkmn_name,
      collection_name,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO cards 
      (user_id, user_auth0_id, amount, api_card_id, api_card_img_src_small, api_card_img_src_large, api_pkmn_name, collection_name) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        user_auth0_id,
        amount,
        api_card_id,
        api_card_img_src_small,
        api_card_img_src_large,
        api_pkmn_name,
        collection_name,
      ]
    );

    console.log(result);
    return res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

//working
export async function getAllOwnedCards(req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM cards WHERE user_auth0_id = ?",
      [req.body.user_auth0_id]
    );
    console.log(rows);
    return res.send(rows);
  } catch (error) {
    console.error(error);
  }
}

//working
export async function getAllCards(req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM cards");
    console.log(rows);
    return res.send(rows);
  } catch (error) {
    console.error(error);
  }
}

//working
export async function getOwnedCardById(req, res) {
  try {
    const [rows, fields] = await pool.query(
      "SELECT * FROM cards WHERE user_id = ? AND id = ?",
      [req.params.userId, req.params.cardId]
    );
    console.log(rows);
    return res.send(rows);
  } catch (error) {
    console.error(error);
  }
}
