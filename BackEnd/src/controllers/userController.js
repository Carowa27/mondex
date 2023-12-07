import { pool } from "../database/database";

export async function getUser(req, res) {
  try {
    const [rows, fields] = await pool.query(
      "SELECT * FROM collections WHERE user_id = ?",
      [req.params.userId]
    );
    console.log(rows, fields);
  } catch (error) {
    console.error(error);
  }
}
