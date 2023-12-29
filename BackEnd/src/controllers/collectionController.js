import { pool } from "../database/database.js";

export async function createCollection(req, res) {
  try {
    const [rows] = await pool.query(
      `INSERT INTO collections (collection_name,user_auth0_id,api_set_id) VALUES (?,?,?)`,
      [req.body.collection_name, req.body.user_auth0_id, req.body.api_set_id]
    );
    return res.send(rows);
  } catch (error) {
    console.error("An error has occurred: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getAllOwnedCollections(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM collections WHERE user_auth0_id = ?`,
      [req.body.user_auth0_id]
    );
    console.info("return: ", rows);
    return res.send(rows);
  } catch (error) {
    console.error("An error has occurred: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getOwnedCollectionByCollectionName(req, res) {
  try {
    const [rows, fields] = await pool.query(
      "SELECT * FROM collections WHERE user_auth0_id = ? AND collection_name = ?",
      [req.body.user_auth0_id, req.body.collection_name]
    );
    console.info("return: ", rows[0]);
    return res.send(rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteCollectionById(req, res) {
  console.log("body: ", req.body);
  try {
    const result = await pool.query(
      `DELETE FROM collections
  WHERE id = ? AND user_auth0_id = ?`,
      [req.body.collectionId, req.body.user_auth0_id]
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
