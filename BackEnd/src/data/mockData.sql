DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS collections;
DROP TABLE IF EXISTS collection_cards;

CREATE TABLE users (
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
);

INSERT INTO users (id,username, email, role) VALUES
(123456,'GottaCatchThemAll', 'carolina.ikw@outlook.com', 'USER'),
(6543,'adminadmin', 'carolinaidaw@gmail.com', 'ADMIN');

INSERT INTO cards (id,user_id, amount, api_card_id, api_card_img_src_small, api_card_img_src_large, api_pkmn_name)
VALUES
   (1,123456, 1, 'sv1-8', 'https://images.pokemontcg.io/sv1/8.png', 'https://images.pokemontcg.io/sv1/8_hires.png', 'Scatterbug'),
   (2,123456, 2, 'sv1-2', 'https://images.pokemontcg.io/sv1/2.png', 'https://images.pokemontcg.io/sv1/2_hires.png', 'Heracross'),
   (3,123456, 1, 'bw7-8', 'https://images.pokemontcg.io/bw7/8.png', 'https://images.pokemontcg.io/bw7/8_hires.png', 'Heracross');

INSERT INTO collections (id, collection_name, user_id)
VALUES
   (1,'MasterCollection', 123456),
   (3,'Heracross', 123456);
INSERT INTO collections (collection_name, user_id, api_set_id)
VALUES
   (2,'Scarlet & Violet 1', 123456,'sv1');

INSERT INTO collection_cards (collection_id, card_id) VALUES (1, 1), (1, 2), (1, 3);
INSERT INTO collection_cards (collection_id, card_id) VALUES (2, 1), (2, 2);
INSERT INTO collection_cards (collection_id, card_id) VALUES (3, 2), (3, 3);