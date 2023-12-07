import { pool } from "../database/database.js";

export async function createCollection(req, res) {
  if (api_set_id) {
    await pool.query(
      `INSERT INTO collections (collection_name,user_id,api_set_id) VALUES (?,?,?)`,
      [req.params.collection_name, req.params.user_id, req.params.api_set_id]
    );
  } else {
    await pool.query(
      `INSERT INTO collections (collection_name,user_id) VALUES (?,?)`,
      [req.params.collection_name, req.params.user_id]
    );
  }
}

export async function getAllOwnedCollections(req, res) {
  try {
    const [rows, fields] = await pool.query(
      "SELECT * FROM collections WHERE user_id = ?",
      [req.params.userId]
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.error(error);
  }
}

export async function getOwnedCollectionById(req, res) {
  try {
    const [rows, fields] = await pool.query(
      "SELECT * FROM collections WHERE user_id = ? AND id = ?",
      [req.params.userId, req.params.collection_id]
    );
    console.log(rows[0]);
    return rows[0];
  } catch (error) {
    console.error(error);
  }
}
