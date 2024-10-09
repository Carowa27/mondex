import { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { ContainerContext } from "../globals/containerContext";
import { ICard, ICollection } from "../interfaces/LSInterface";

interface IProps {
  changeShowDeleteCardPopUp: () => void;
  cardToDelete?: ICard | undefined;
  collection?: ICollection | undefined;
  collectionName: string;
  updateData: () => void;
  delCard?: (card: ICard) => void;
}

export const DeleteCardPopUp = ({
  changeShowDeleteCardPopUp,
  cardToDelete,
  collection,
  collectionName,
  updateData,
  delCard,
}: IProps) => {
  const { container } = useContext(ContainerContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const language = container.language;
  const theme = container.theme;
  const user = container.user;

  const handleSubmitToDelete = async () => {
    if (user && cardToDelete) {
      delCard && delCard(cardToDelete);
    }

    setTimeout(() => {
      updateData();
      changeShowDeleteCardPopUp();
    }, 100);
  };

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
                {cardToDelete.card.name}, {cardToDelete.card.id}
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
              {collection?.set?.id ? `, ${collection.set?.id}` : null}
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
