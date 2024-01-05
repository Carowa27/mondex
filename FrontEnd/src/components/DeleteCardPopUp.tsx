import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { ThemeContext } from "../globals/theme";
import { styled } from "styled-components";
import { ICardFromDB, ICollectionFromDB } from "../interfaces/dataFromDB";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteOwnedCardById } from "../services/cardServices";

interface IProps {
  changeShowDeleteCardPopUp: () => void;
  cardToDelete: ICardFromDB | undefined;
  collectionName: string;
  updateData: () => void;
}

export const DeleteCardPopUp = ({
  changeShowDeleteCardPopUp,
  cardToDelete,
  collectionName,
  updateData,
}: IProps) => {
  const { theme } = useContext(ThemeContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { user } = useAuth0();

  const handleSubmitToDelete = async () => {
    if (user && cardToDelete) {
      const card = cardToDelete;
      await deleteOwnedCardById({ user, card }).then(() =>
        console.log("deleted")
      );
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
      style={{ backgroundColor: theme.primaryColors.white.hex }}
    >
      <header className="d-flex justify-content-end mt-2">
        <i className="bi bi-x-lg" onClick={changeShowDeleteCardPopUp}></i>
      </header>
      {cardToDelete && (
        <div>
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
      )}
    </div>
  );
};
