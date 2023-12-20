import { pool } from "../database/database.js";

export async function getAllUsers(req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    console.log(rows);
    return res.send(rows);
  } catch (error) {
    console.error(error);
  }
}
export async function getUser(req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      req.params.email,
    ]);
    console.log(rows);
    return res.send(rows);
  } catch (error) {
    console.error(error);
  }
}

//change role
//create user (connected to auth0?)
