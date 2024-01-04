DROP TABLE IF EXISTS users;
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
    collection_id INT,
    collection_name VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE collections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    collection_name VARCHAR(255),
    user_auth0_id VARCHAR(255),
    api_set_id VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO cards (id, user_auth0_id, amount,collection_id,collection_name, api_card_id, api_card_img_src_small, api_card_img_src_large, api_pkmn_name)
VALUES
   (1,'google-oauth2|100545501084792863843', 1,1,'Master_Collection', 'sv1-8', 'https://images.pokemontcg.io/sv1/8.png', 'https://images.pokemontcg.io/sv1/8_hires.png', 'Scatterbug'),
   (2,'google-oauth2|100545501084792863843', 1,2,'Scarlet_&_Violet_1', 'sv1-2', 'https://images.pokemontcg.io/sv1/2.png', 'https://images.pokemontcg.io/sv1/2_hires.png', 'Heracross'),
   (4,'google-oauth2|100545501084792863843', 1,3,'Heracross', 'sv1-2', 'https://images.pokemontcg.io/sv1/2.png', 'https://images.pokemontcg.io/sv1/2_hires.png', 'Heracross'),
   (3,'google-oauth2|100545501084792863843', 1,3,'Heracross', 'bw7-8', 'https://images.pokemontcg.io/bw7/8.png', 'https://images.pokemontcg.io/bw7/8_hires.png', 'Heracross'),
(5,'google-oauth2|100545501084792863843', 3,1,'Master_Collection', 'sv1-2', 'https://images.pokemontcg.io/sv1/2.png', 'https://images.pokemontcg.io/sv1/2_hires.png', 'Heracross'),
   (8,'google-oauth2|100545501084792863843', 1,1,'Master_Collection', 'swsh1-78', 'https://images.pokemontcg.io/swsh1/78.png', 'https://images.pokemontcg.io/swsh1/78_hires.png', 'Morpeko'),
   (7,'google-oauth2|100545501084792863843', 1,1,'Master_Collection', 'bw7-8', 'https://images.pokemontcg.io/bw7/8.png', 'https://images.pokemontcg.io/bw7/8_hires.png', 'Heracross');

INSERT INTO collections (id,collection_name, user_auth0_id)
VALUES
   (1,'Master_Collection', 'google-oauth2|100545501084792863843'),
   (4,'Master_Collection', 'google-oauth2|115054123556248398437'),
   (3,'Heracross', 'google-oauth2|100545501084792863843');
INSERT INTO collections (id, collection_name, user_auth0_id, api_set_id)
VALUES
   (2,'Scarlet_&_Violet_1', 'google-oauth2|100545501084792863843','sv1');
