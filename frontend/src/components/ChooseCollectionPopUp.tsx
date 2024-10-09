import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { styled } from "styled-components";
import { IPkmnCard } from "../interfaces/dataFromApi";
import { ContainerContext } from "../globals/containerContext";
import { ICollection } from "../interfaces/LSInterface";

interface IProps {
  changeShowAddCardPopup: () => void;
  cardToAdd: IPkmnCard;
  addCard: (cardToAdd: IPkmnCard, collectionName: string) => void;
}

export const ChooseCollectionPopUp = ({
  changeShowAddCardPopup,
  cardToAdd,
  addCard,
}: IProps) => {
  const { container } = useContext(ContainerContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const language = container.language;

  const [listOfOwnedCollections, setListOfOwnedCollections] =
    useState<ICollection[]>();
  const [selectedCollectionName, setSelectedCollectionName] =
    useState<string>();
  const theme = container.theme;

  const getCollections = async () => {
    if (container.user) {
      if (container.user.collections) {
        setListOfOwnedCollections(container.user.collections);
      }
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
    if (cardToAdd && container.user && selectedCollectionName) {
      // await addCard({
      //   user,
      //   cardToAdd,
      //   collection_name: selectedCollectionName,
      // });
      addCard(cardToAdd, selectedCollectionName);
    }

    setTimeout(() => {
      changeShowAddCardPopup();
    }, 100);
  };

  const SwapContainer = styled.div`
    height: fit-content;
    width: 80vw;
    min-height: fit-content;
    padding: 0 2rem 2rem 2rem;
    z-index: 500;
    position: fixed;
    top: 20vh;
    left: 10vw;
    background-color: ${theme?.primaryColors.background.hex};
    border-radius: 0.5rem;

    @media (${variables.breakpoints.desktop}) {
      height: fit-content;
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
            <h6>{language?.lang_code.card_card_to_add}: </h6>
            <span>
              {cardToAdd?.name}, {cardToAdd.id}
            </span>
          </p>
          <h6>{language?.lang_code.card_add_to_collection}:</h6>
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
                      disabled={
                        coll.set?.id !== undefined &&
                        cardToAdd.set.id !== coll.set.id
                      }
                    />
                    <span
                      style={
                        coll.set !== undefined &&
                        cardToAdd.set.id !== coll.set?.id
                          ? {
                              color: theme?.primaryColors.breadcrumbText.hex,
                            }
                          : {}
                      }
                    >
                      {" "}
                      {coll.collection_name.replace(/_/g, " ")}
                    </span>
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
              <button
                className="btn"
                onClick={changeShowAddCardPopup}
                style={{
                  border: `1px solid ${theme?.primaryColors.text.hex}`,
                  color: theme?.primaryColors.text.hex,
                }}
              >
                {language?.lang_code.word_cancel}
              </button>
              <button
                className="btn"
                onClick={handleSubmitToAddCard}
                style={{
                  border: `1px solid ${theme?.primaryColors.text.hex}`,
                  color: theme?.primaryColors.text.hex,
                }}
                disabled={selectedCollectionName === undefined}
              >
                {language?.lang_code.word_add}
              </button>
            </div>
          </SwapFormContainer>
        </SwapMain>
      )}
    </SwapContainer>
  );
};
