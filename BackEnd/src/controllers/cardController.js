import { pool } from "../database/database.js";

//working
export async function createCard(req, res) {
  try {
    const {
      user_auth0_id,
      amount,
      api_card_id,
      api_card_img_src_small,
      api_card_img_src_large,
      api_pkmn_name,
      collection_id,
      collection_name,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO cards 
      (user_auth0_id, amount, api_card_id, api_card_img_src_small, api_card_img_src_large, api_pkmn_name, collection_id, collection_name) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_auth0_id,
        amount,
        api_card_id,
        api_card_img_src_small,
        api_card_img_src_large,
        api_pkmn_name,
        collection_id,
        collection_name,
      ]
    );

    return res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong: ", error);
  }
}

//working
export async function getAllOwnedCards(req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM cards WHERE user_auth0_id = ?",
      [req.body.user_auth0_id]
    );

    console.info("return: ", rows);
    return res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong: ", error);
  }
}

//working
export async function getAllCards(req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM cards");

    console.info("return: ", rows);
    return res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong: ", error);
  }
}

//working
export async function getOwnedCardById(req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM cards WHERE user_auth0_id = ? AND id = ?",
      [req.body.user_auth0_id, req.body.cardId]
    );
    console.info("return: ", rows);
    return res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong: ", error);
  }
}

//working
export async function getAllCardsFromCollectionById(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT *
      FROM cards
      WHERE collection_name = ? AND user_auth0_id = ?`,
      [req.body.collection_name, req.body.user_auth0_id]
    );
    console.info("return: ", rows);
    return res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong: ", error);
  }
}

//working
export async function updateAmountOnCard(req, res) {
  try {
    const { cardId, user_auth0_id, amount } = req.body;

    const result = await pool.query(
      `UPDATE cards
      SET amount = ?
      WHERE id = ? AND user_auth0_id = ?`,
      [amount, cardId, user_auth0_id]
    );
    return res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong: ", error);
  }
}

//working
export async function deleteOwnedCardById(req, res) {
  try {
    const result = await pool.query(
      `DELETE FROM cards
    WHERE id = ? AND user_auth0_id = ?`,
      [req.body.cardId, req.body.user_auth0_id]
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong: ", error);
  }
}
