import pool from "../database/database";

export const resetMockData = async () => {
  try {
    await pool
      .query(
        `DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS cards;
      DROP TABLE IF EXISTS collections;
      DROP TABLE IF EXISTS collection_cards;`
      )
      .then((res) => {
        console.log(res);
      });
  } catch (error) {
    console.error(error);
  }
};
