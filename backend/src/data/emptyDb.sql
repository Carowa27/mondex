DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS collections;


CREATE TABLE cards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_auth0_id VARCHAR(255),
    amount INT,
    api_card_id VARCHAR(255),
    api_card_img_src_small VARCHAR(255),
    api_card_img_src_large VARCHAR(255),
    api_pkmn_name VARCHAR(255),
    api_set_id VARCHAR(255),
    collection_id INT,
    collection_name VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (collection_id) REFERENCES collections(id)
);

CREATE TABLE collections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    collection_name VARCHAR(255),
    user_auth0_id VARCHAR(255),
    api_set_id VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
