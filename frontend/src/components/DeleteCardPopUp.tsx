import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { ICardFromDB, ICollectionFromDB } from "../interfaces/dataFromDB";
import { useAuth0 } from "@auth0/auth0-react";
import {
  deleteOwnedCardById,
  getAllOwnedCards,
} from "../services/cardServices";
import { deleteCollectionById } from "../services/collectionServices";
import { ContainerContext } from "../globals/containerContext";

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
  const { container } = useContext(ContainerContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { user } = useAuth0();
  const [cardList, setCardList] = useState<ICardFromDB[]>();
  const language = container.language;
  const theme = container.theme;

  const handleSubmitToDelete = async () => {
    if (user && cardToDelete) {
      const card = cardToDelete;
      await deleteOwnedCardById({ user, card }).then(() => {
        console.info(
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
        card = findCardsConnectedToSet[i];
        if (user) {
          await deleteOwnedCardById({ user, card });
        }
      }
    }

    if (user && collection) {
      await deleteCollectionById({ user, collection }).then(() => {
        console.info("deleted: ", collection.collection_name);
        window.location.href = "/all-collections";
      });
    }

    setTimeout(() => {
      updateData();
      changeShowDeleteCardPopUp();
    }, 100);
  };

  useEffect(() => {
    const getData = async () => {
      if (user) {
        await getAllOwnedCards({ user }).then((res: ICardFromDB[] | void) => {
          if (res) {
            setCardList(res);
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
      style={{ backgroundColor: theme?.primaryColors.background.hex }}
    >
      <header className="d-flex justify-content-end mt-2">
        <i className="bi bi-x-lg" onClick={changeShowDeleteCardPopUp}></i>
      </header>
      <div>
        {cardToDelete ? (
          <>
            <div className="mb-4">
              <h6>{language?.lang_code.card_card_to_delete}: </h6>
              <span>
                {cardToDelete?.api_pkmn_name}, {cardToDelete.api_card_id}
              </span>
            </div>
            <div className="mb-4">
              <h6>
                {language?.lang_code.card_collection_to_remove_card_from}:{" "}
              </h6>
              <span>{collectionName.replace(/_/g, " ")}</span>
            </div>
          </>
        ) : (
          <div className="mb-4">
            <h6>{language?.lang_code.collection_to_delete}: </h6>
            <span>
              {collection?.collection_name.replace(/_/g, " ")}
              {collection?.api_set_id ? `, ${collection.api_set_id}` : null}
            </span>
          </div>
        )}

        <i>{language?.lang_code.warning_delete}</i>
        <div className="d-flex justify-content-around mt-3">
          <button
            className="btn"
            onClick={changeShowDeleteCardPopUp}
            style={{
              border: `1px solid ${theme?.primaryColors.text.hex}`,
              color: theme?.primaryColors.text.hex,
            }}
          >
            {language?.lang_code.word_cancel}
          </button>
          <button
            className="btn text-danger fw-bolder"
            onClick={handleSubmitToDelete}
            style={{
              border: `1px solid ${theme?.primaryColors.text.hex}`,
              color: theme?.primaryColors.text.hex,
            }}
          >
            {language?.lang_code.word_delete}
          </button>
        </div>
      </div>
    </div>
  );
};
