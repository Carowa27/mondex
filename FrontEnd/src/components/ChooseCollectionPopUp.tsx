import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { ThemeContext } from "../globals/theme";
import { styled } from "styled-components";
import { ICollectionFromDB } from "../interfaces/dataFromDB";
import { getAllOwnedCollections } from "../services/collectionServices";
import { User, useAuth0 } from "@auth0/auth0-react";
import { IPkmnCard } from "../interfaces/dataFromApi";
import { addCard } from "../services/cardServices";

interface IProps {
  changeShowAddCardPopup: () => void;
  cardToAdd: IPkmnCard;
  // updateData: () => void;
}

export const ChooseCollectionPopUp = ({
  changeShowAddCardPopup,
  cardToAdd,
}: // updateData,
IProps) => {
  const { theme } = useContext(ThemeContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { user, isAuthenticated } = useAuth0();

  const [listOfOwnedCollections, setListOfOwnedCollections] =
    useState<ICollectionFromDB[]>();
  const [selectedCollectionName, setSelectedCollectionName] =
    useState<string>();

  const getCollections = async () => {
    if (isAuthenticated && user) {
      await getAllOwnedCollections({ user }).then((res) =>
        setListOfOwnedCollections(res)
      );
    }
  };

  useEffect(() => {
    getCollections();
    // updateData();
  }, []);

  const handleChangeOnRadioBtn = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedCollectionName(event.target.value);
    event.preventDefault();
  };

  const handleSubmitToAddCard = async () => {
    const collection_name = selectedCollectionName!;
    if (isAuthenticated && user) {
      await addCard({ user, cardToAdd, collection_name });
    }

    setTimeout(() => {
      //     updateData();
      changeShowAddCardPopup();
    }, 100);
  };

  const SwapContainer = styled.div`
    height: 60vh;
    width: 80vw;
    /* min-width: fit-content; */
    min-height: fit-content;
    padding: 0 2rem 2rem 2rem;
    z-index: 500;
    position: fixed;
    top: 20vh;
    left: 10vw;
    background-color: ${theme.primaryColors.white.hex};
    border-radius: 0.5rem;

    @media (${variables.breakpoints.desktop}) {
      height: 80vh;
      width: 50vw;
      top: 10vh;
      left: 25vw;
      z-index: 500;
    }
  `;
  const SwapMain = styled.div`
    height: ${isDesktop ? "73%" : "65%"};
  `;
  const SwapFormContainer = styled.div`
    height: 100%;
  `;

  const SwapForm = styled.form`
    display: flex;
    flex-direction: ${isDesktop ? "row" : "column"};
    flex-wrap: no-wrap;
    height: 100%;
    overflow-y: hidden;
    overflow-y: scroll;

    @media (${variables.breakpoints.desktop}) {
      height: 100%;
      width: 100%;
      flex-wrap: wrap;
    }
  `;

  const SwapLabel = styled.label`
    @media (${variables.breakpoints.desktop}) {
      width: 30%;
    }
  `;
  return (
    <SwapContainer>
      <header className="d-flex justify-content-end mt-2">
        <i className="bi bi-x-lg" onClick={changeShowAddCardPopup}></i>
      </header>
      {cardToAdd && (
        <SwapMain>
          <p>
            <h6>Card to switch collection: </h6>
            <span>
              {cardToAdd?.name}, {cardToAdd.id}
            </span>
          </p>
          <h6>Change to collection:</h6>
          <SwapFormContainer>
            <SwapForm id="swap-form">
              {listOfOwnedCollections &&
                listOfOwnedCollections.map((coll) => (
                  <SwapLabel htmlFor={`${coll.id}`} key={coll.id}>
                    <input
                      type="radio"
                      name="collections"
                      id={`${coll.id}`}
                      value={coll.collection_name}
                      onChange={handleChangeOnRadioBtn}
                      checked={selectedCollectionName === coll.collection_name}
                    />{" "}
                    {coll.collection_name.replace(/_/g, " ")}
                  </SwapLabel>
                ))}
            </SwapForm>
            <div className="d-flex justify-content-around mt-3">
              <button className="btn" onClick={changeShowAddCardPopup}>
                cancel
              </button>
              <button className="btn" onClick={handleSubmitToAddCard}>
                add card
              </button>
            </div>
          </SwapFormContainer>
        </SwapMain>
      )}
    </SwapContainer>
  );
};
