import { ChangeEvent, useContext, useEffect, useState } from "react";
import { variables } from "../globals/variables";
import { styled } from "styled-components";
import { ContainerContext } from "../globals/containerContext";
import { ICard, ICollection } from "../interfaces/LSInterface";
import { swapCardToOtherCollection } from "../functions/cardFunctions";
interface IProps {
  changeShowSwapPopUp: () => void;
  cardToSwap: ICard | undefined;
  collectionName: string;
  updateData: () => void;
}

export const SwapCollectionPopUp = ({
  changeShowSwapPopUp,
  cardToSwap,
  collectionName,
  updateData,
}: IProps) => {
  const { container, updateContainer } = useContext(ContainerContext);
  const language = container.language;
  const theme = container.theme;
  const user = container.user;
  const collections = user?.collections;

  // const [listOfOwnedCollections, setListOfOwnedCollections] =
  //   useState<ICollection[]>();
  const [selectedCollectionName, setSelectedCollectionName] =
    useState<string>();

  // const getCollections = async () => {
  //   if (user) {
  //     await getAllOwnedCollections({ user }).then((res) =>
  //       setListOfOwnedCollections(res)
  //     );
  //   }
  // };

  useEffect(() => {
    // getCollections();
    updateData();
  }, []);

  const handleChangeOnRadioBtn = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedCollectionName(event.target.value);
    event.preventDefault();
  };

  const handleSubmitToSwap = async () => {
    const newCollectionName = selectedCollectionName;
    const oldCollectionName = collectionName;
    console.log("swap", newCollectionName, oldCollectionName);
    if (cardToSwap && collections && newCollectionName && oldCollectionName) {
      const updatedCollections = swapCardToOtherCollection(
        cardToSwap,
        newCollectionName,
        oldCollectionName,
        collections
      );
      updateContainer(
        {
          username: container.user!.username,
          collections: updatedCollections as ICollection[],
        },
        "user"
      );
    }
    setTimeout(() => {
      updateData();
      changeShowSwapPopUp();
    }, 100);
  };

  const SwapContainer = styled.div`
    height: 60vh;
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
    height: 80%;
    overflow-y: hidden;
    overflow-y: scroll;

    @media (${variables.breakpoints.desktop}) {
      height: 100%;
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
        <i className="bi bi-x-lg" onClick={changeShowSwapPopUp}></i>
      </header>
      {cardToSwap && (
        <SwapMain>
          <p>
            <h6>{language?.lang_code.card_card_to_swap}: </h6>
            <span>
              {cardToSwap?.card.name}, {cardToSwap.card.id}
            </span>
          </p>
          <p>
            <h6>{language?.lang_code.card_collection_to_remove_card_from}: </h6>
            <span>{collectionName.replace(/_/g, " ")}</span>
          </p>
          <h6>{language?.lang_code.collection_to_change_to}:</h6>
          <SwapFormContainer>
            <SwapForm id="swap-form">
              {collections &&
                collections.map((coll) => (
                  <SwapLabel htmlFor={`${coll.id}`} key={coll.id}>
                    <input
                      type="radio"
                      name="collections"
                      id={`${coll.id}`}
                      value={coll.collection_name}
                      onChange={handleChangeOnRadioBtn}
                      checked={selectedCollectionName === coll.collection_name}
                      disabled={
                        coll.collection_name === collectionName ||
                        (coll.set?.id !== undefined &&
                          cardToSwap.card.set.id !== coll.set?.id)
                      }
                    />
                    <span
                      style={
                        coll.collection_name === collectionName ||
                        (coll.set?.id !== undefined &&
                          cardToSwap.card.set.id !== coll.set?.id)
                          ? {
                              color: theme?.primaryColors.breadcrumbText.hex,
                            }
                          : {}
                      }
                    >
                      {coll.collection_name.replace(/_/g, " ")}
                    </span>
                  </SwapLabel>
                ))}
            </SwapForm>
            <div className="d-flex justify-content-around mt-3">
              <button
                className="btn"
                onClick={changeShowSwapPopUp}
                style={{
                  border: `1px solid ${theme?.primaryColors.text.hex}`,
                  color: theme?.primaryColors.text.hex,
                }}
              >
                {language?.lang_code.word_cancel}
              </button>
              <button
                className="btn"
                onClick={handleSubmitToSwap}
                style={{
                  border: `1px solid ${theme?.primaryColors.text.hex}`,
                  color: theme?.primaryColors.text.hex,
                }}
              >
                {language?.lang_code.word_change}
              </button>
            </div>
          </SwapFormContainer>
        </SwapMain>
      )}
    </SwapContainer>
  );
};
