import { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { ContainerContext } from "../globals/containerContext";
import { ICard, ICollection } from "../interfaces/LSInterface";
import { deleteCollection } from "../functions/collectionFunctions";
import { useNavigate } from "react-router-dom";
import { StandardButton } from "./Buttons";
import { colorModes } from "../globals/theme";

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
  const { container, updateContainer } = useContext(ContainerContext);
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const language = container.language;
  const theme = container.theme;
  const user = container.user;
  const collections = user?.collections;

  const handleSubmitToDelete = async () => {
    if (user && user.username !== "" && cardToDelete) {
      delCard && delCard(cardToDelete);
    }
    if (user && user.username !== "" && !cardToDelete && collection) {
      const updatedCollections = deleteCollection(collection, collections!);
      updateContainer(
        {
          username: container.user!.username,
          collections: updatedCollections as ICollection[],
        },
        "user"
      );
      navigate("/userpage", { replace: true });
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
          <StandardButton
            btnAction={changeShowDeleteCardPopUp}
            disabled={false}
            btnText={`${language?.lang_code.word_cancel}`}
          />
          <StandardButton
            btnAction={handleSubmitToDelete}
            disabled={false}
            btnText={`${language?.lang_code.word_delete}`}
            fontColor={`${theme?.typeColors.fire.hex}`}
          />
        </div>
      </div>
    </div>
  );
};
