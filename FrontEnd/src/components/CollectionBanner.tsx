import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllCards } from "../services/cardServices";
import { useState, useEffect } from "react";
import { ICardFromDB, ICollectionFromDB } from "../interfaces/dataFromDB";
import axios from "axios";
import { getAllOwnedCollections } from "../services/collectionServices";

interface IProps {
  type: string;
}

export const CollectionBanner = () => {
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { user, isAuthenticated } = useAuth0();
  const [cards, setCards] = useState<ICardFromDB[]>([]);
  const [collections, setCollections] = useState<ICollectionFromDB[]>([]);

  const fetchData = async () => {
    // getAllCards()
    getAllOwnedCollections()
      .then((res) => {
        console.log(res.data);
        // setCards(res.data);
        setCollections(res.data);
      })
      .catch((error) => {
        console.error("An error has occurred: ", error);
      });
  };
  return (
    <>
      <button onClick={() => (fetchData(), console.log("btn clicked"))}>
        get data
      </button>
      {/* {cards.length !== 0 ? (
        <div>
          <ul>
            {cards.map((card) => (
              <li key={card.id}>
                {card.api_pkmn_name}, {card.api_card_id}
              </li>
            ))}
          </ul>
        </div>
      ) : null} */}
      {collections.length !== 0 ? (
        <div>
          <ul>
            {collections.map((collection) => (
              <li key={collection.id}>{collection.collection_name}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {isAuthenticated && (
        <>
          {isDesktop ? (
            <div
              style={{ outline: "2px blue solid" }}
              className={
                window.location.pathname === "/"
                  ? "py-2 my-3"
                  : "py-2 my-3 col-5"
              }
            >
              <h6>collection name</h6>
              {/* smallPkmnCard Array of 5(?) */}

              <div className="row d-flex justify-content-around px-3">
                <div
                  className="col-2"
                  style={{ outline: "1px green solid", height: "4rem" }}
                ></div>
                <div
                  className="col-2"
                  style={{ outline: "1px brown solid", height: "4rem" }}
                ></div>
                <div
                  className="col-2"
                  style={{ outline: "1px brown solid", height: "4rem" }}
                ></div>
                <div
                  className="col-2"
                  style={{ outline: "1px brown solid", height: "4rem" }}
                ></div>
                <div
                  className="col-2"
                  style={{ outline: "1px brown solid", height: "4rem" }}
                ></div>
              </div>
            </div>
          ) : (
            <div
              style={{ outline: "2px blue solid", width: "100%" }}
              className="py-2 my-2"
            >
              <h6>collection name</h6>
              {/* smallPkmnCard Array of 3(?) */}
              <div className="row d-flex justify-content-around px-3">
                <div
                  className="col-3 p-0 m-0"
                  style={{ outline: "1px brown solid", height: "4rem" }}
                ></div>
                <div
                  className="col-3 p-0 m-0"
                  style={{ outline: "1px brown solid", height: "4rem" }}
                ></div>
                <div
                  className="col-3 p-0 m-0"
                  style={{ outline: "1px brown solid", height: "4rem" }}
                ></div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
