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
}

export const ChooseCollectionPopUp = ({
  changeShowAddCardPopup,
  cardToAdd,
}: IProps) => {
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
  }, []);

  const handleChangeOnRadioBtn = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedCollectionName(event.target.value);
    event.preventDefault();
  };

  const handleSubmitToAddCard = async () => {
    if (cardToAdd && user && selectedCollectionName) {
      await addCard({
        user,
        cardToAdd,
        collection_name: selectedCollectionName,
      });
    }

    setTimeout(() => {
      changeShowAddCardPopup();
    }, 100);
  };

  const SwapContainer = styled.div`
    height: fit-content; //60vh;
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
      height: fit-content; //80vh;
      width: 50vw;
      top: 10vh;
      left: 25vw;
    }
  `;
  const SwapMain = styled.div`
    height: 60%;
  `;
  const SwapFormContainer = styled.div`
    height: 100%;
  `;

  const SwapForm = styled.form`
    display: flex;
    flex-direction: column;
    max-height: 100%;
    height: 80%;
    overflow-y: hidden;
    overflow-y: scroll;
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
            <h6>Card to add: </h6>
            <span>
              {cardToAdd?.name}, {cardToAdd.id}
            </span>
          </p>
          <h6>Add to collection:</h6>
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
                    />
                    <span> {coll.collection_name.replace(/_/g, " ")}</span>
                  </SwapLabel>
                ))}
            </SwapForm>
            <div
              className={
                isDesktop
                  ? "d-flex justify-content-around mt-4"
                  : "d-flex justify-content-around mt-3"
              }
            >
              <button className="btn border" onClick={changeShowAddCardPopup}>
                cancel
              </button>
              <button className="btn border" onClick={handleSubmitToAddCard}>
                add
              </button>
            </div>
          </SwapFormContainer>
        </SwapMain>
      )}
    </SwapContainer>
  );
};
