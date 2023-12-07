import pool from "../database/database";

export const addMockDataUsers = async () => {
  try {
    await pool
      .query(
        `
          INSERT INTO users (username, email, role) VALUES
          ('GottaCatchThemAll', 'carolina.ikw@outlook.com', 'USER'),
          ('adminadmin', 'carolinaidaw@gmail.com', 'ADMIN');
          `
      )
      .then((res) => {
        console.log(res);
      });
  } catch (error) {
    console.error(error);
  }
};
export const addMockDataCards = async (user_id) => {
  try {
    await pool
      .query(
        `
          INSERT INTO cards (user_id, amount, api_card_id, api_card_img_src_small, api_card_img_src_large, api_pkmn_name, created_at)
          VALUES
             (${user_id}, 1, 'sv1-8', 'https://images.pokemontcg.io/sv1/8.png', 'https://images.pokemontcg.io/sv1/8_hires.png', 'Scatterbug', NOW()),
             (${user_id}, 2, 'sv1-2', 'https://images.pokemontcg.io/sv1/2.png', 'https://images.pokemontcg.io/sv1/2_hires.png', 'Heracross', NOW()),
             (${user_id}, 1, 'bw7-8', 'https://images.pokemontcg.io/bw7/8.png', 'https://images.pokemontcg.io/bw7/8_hires.png', 'Heracross', NOW());
          `
      )
      .then((res) => {
        console.log(res);
      });
  } catch (error) {
    console.error(error);
  }
};

export const addMockDataCollections = async (user_id) => {
  try {
    await pool
      .query(
        `
          INSERT INTO collections (collection_name, user_id, created_at)
          VALUES
             ('MasterCollection', ${user_id}, NOW()),
             ('Heracross', ${user_id}, NOW());
          INSERT INTO collections (collection_name, user_id, api_set_id, created_at)
          VALUES
             ('Scarlet & Violet 1', ${user_id},'sv1', NOW());
         `
      )
      .then((res) => {
        console.log(res);
      });
  } catch (error) {
    console.error(error);
  }
};

export const addConnectionMockDataCollectionsCards = async (valuesToAdd) => {
  //valuesToAdd: (collection_id, card_id)
  try {
    await pool
      .query(
        `
          INSERT INTO collection_cards (collection_id, card_id) VALUES ${valuesToAdd}
           `
      )
      .then((res) => {
        console.log(res);
      });
  } catch (error) {
    console.error(error);
  }
};
