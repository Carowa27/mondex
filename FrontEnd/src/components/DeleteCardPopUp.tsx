import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { ThemeContext } from "../globals/theme";
import { ICardFromDB, ICollectionFromDB } from "../interfaces/dataFromDB";
import { useAuth0 } from "@auth0/auth0-react";
import {
  deleteOwnedCardById,
  getAllOwnedCards,
} from "../services/cardServices";
import {
  deleteCollectionById,
  getOwnedCollectionByCollectionName,
} from "../services/collectionServices";

interface IProps {
  changeShowDeleteCardPopUp: () => void;
  cardToDelete?: ICardFromDB | undefined;
  collection?: ICollectionFromDB | undefined;
  collectionName: string;
  updateData: () => void;
}

export const DeleteCardPopUp = ({
  changeShowDeleteCardPopUp,
  cardToDelete,
  collection,
  collectionName,
  updateData,
}: IProps) => {
  const { theme } = useContext(ThemeContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { user } = useAuth0();
  const [cardList, setCardList] = useState<ICardFromDB[]>();

  const handleSubmitToDelete = async () => {
    if (user && cardToDelete) {
      const card = cardToDelete;
      await deleteOwnedCardById({ user, card }).then((res) => {
        console.log(
          "deleted: ",
          cardToDelete.api_pkmn_name,
          cardToDelete.api_card_id
        );
      });
    }

    if (cardList && collection) {
      const findCardsConnectedToSet: ICardFromDB[] = cardList.filter((card) => {
        return card.collection_id === collection.id;
      });
      let card: ICardFromDB;
      for (let i = 0; i < findCardsConnectedToSet.length; i++) {
        console.log(findCardsConnectedToSet[i]);
        card = findCardsConnectedToSet[i];
        if (user) {
          await deleteOwnedCardById({ user, card });
        }
      }
    }

    if (user && collection) {
      await deleteCollectionById({ user, collection }).then((res) => {
        console.log(
          "deleted: ",
          collection.collection_name
          // "status: ",
          // res?.status
        );
        window.location.href = "/all-collections";
      });
    }

    setTimeout(() => {
      updateData();
      changeShowDeleteCardPopUp();
    }, 100);
  };
  const deleteCollection = async () => {};

  useEffect(() => {
    const getData = async () => {
      if (user) {
        await getAllOwnedCards({ user }).then((res: ICardFromDB[] | void) => {
          if (res) {
            setCardList(res);
            console.log(res);
          }
        });
      }
    };
    getData();
  }, []);

  return (
    <div
      className={
        isDesktop ? "w-25 px-4 py-3 rounded" : "w-75 px-4 py-3 rounded"
      }
      style={{ backgroundColor: theme.primaryColors.white.hex }}
    >
      <header className="d-flex justify-content-end mt-2">
        <i className="bi bi-x-lg" onClick={changeShowDeleteCardPopUp}></i>
      </header>
      <div>
        {cardToDelete ? (
          <>
            <div className="mb-4">
              <h6>Card to delete: </h6>
              <span>
                {cardToDelete?.api_pkmn_name}, {cardToDelete.api_card_id}
              </span>
            </div>
            <div className="mb-4">
              <h6>From collection: </h6>
              <span>{collectionName.replace(/_/g, " ")}</span>
            </div>
          </>
        ) : (
          <div className="mb-4">
            <h6>Collection to delete: </h6>
            <span>
              {collection?.collection_name.replace(/_/g, " ")}
              {collection?.api_set_id ? `, ${collection.api_set_id}` : null}
            </span>
          </div>
        )}

        <i>Are you sure you want to delete? It will be gone forever.</i>
        <div className="d-flex justify-content-around mt-3">
          <button className="btn border" onClick={changeShowDeleteCardPopUp}>
            cancel
          </button>
          <button
            className="btn text-danger fw-bolder border"
            onClick={handleSubmitToDelete}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
};
