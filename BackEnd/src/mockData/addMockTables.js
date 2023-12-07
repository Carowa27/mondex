import pool from "../database/database";

export const addMockTables = async () => {
  try {
    await pool
      .query(
        `CREATE TABLE users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(255),
            email VARCHAR(255),
            role ENUM('USER', 'ADMIN'),
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
        
        CREATE TABLE cards (
            id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT,
            amount INT,
            api_card_id VARCHAR(255),
            api_card_img_src_small VARCHAR(255),
            api_card_img_src_large VARCHAR(255),
            api_pkmn_name VARCHAR(255),
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
        
        CREATE TABLE collections (
            id INT PRIMARY KEY AUTO_INCREMENT,
            collection_name VARCHAR(255),
            user_id INT,
            api_set_id VARCHAR(255),
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
        
        CREATE TABLE collection_cards (
            collection_id INT,
            card_id INT,
            PRIMARY KEY (collection_id, card_id),
            FOREIGN KEY (collection_id) REFERENCES collections(id),
            FOREIGN KEY (card_id) REFERENCES cards(id)
        );`
      )
      .then((res) => {
        console.log(res);
      });
  } catch (error) {
    console.error(error);
  }
};
