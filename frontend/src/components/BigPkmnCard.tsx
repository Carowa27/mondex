import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { colorModes } from "../globals/theme";
import { IPkmnCard } from "../interfaces/dataFromApi";
import { getCardFromApi } from "../services/pkmnTcgApiServices";
import { variables } from "../globals/variables";
import { useMediaQuery } from "react-responsive";
import { lang } from "../globals/language/language";
import { ICard, ILSContainer } from "../interfaces/LSInterface";
import { getMondexLs, updateMondexLs } from "../functions/LSFunctions";
import { ContainerContext } from "../globals/containerContext";
import { getValuesAndTypesOfCard } from "../functions/dataFunctions";

interface IProps {
  card: ICard | undefined;
  pkmnCard: IPkmnCard | undefined;
  changeShowPkmnInfo: () => void;
  changeToAddPopup?: () => void;
}
export const BigPkmnCard = ({
  card,
  pkmnCard,
  changeShowPkmnInfo,
  changeToAddPopup,
}: IProps) => {
  const { container, updateContainer } = useContext(ContainerContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const [cardInfo, setCardInfo] = useState<IPkmnCard>();
  const [lsContainer, setLsContainer] = useState<ILSContainer>(container);
  const [hoverAddBtn, setHoverAddBtn] = useState<boolean>(false);
  const language = container.language;
  const theme = container.theme;
  useEffect(() => {
    if (pkmnCard && window.location.href.includes(`/search`)) {
      let value = getMondexLs();
      setLsContainer(value);
    }
  }, []);
  useEffect(() => {
    if (card) {
      const getData = async () => {
        await getCardFromApi(card.card.id).then((res) => {
          setCardInfo(res as IPkmnCard);
        });
      };
      getData();
    } else {
      if (pkmnCard) {
        setCardInfo(pkmnCard);
      }
    }
  }, [card, pkmnCard]);

  useEffect(() => {
    if (pkmnCard && window.location.href.includes(`/search`)) {
      setLsContainer((prevState) => ({
        ...prevState,
        lastOpenedCard: pkmnCard,
      }));
      updateContainer(pkmnCard, "lastOpenedCard");
    }
  }, [pkmnCard]);
  useEffect(() => {
    updateMondexLs(lsContainer);
  }, [lsContainer]);
  const cardValuesTCG =
    cardInfo &&
    getValuesAndTypesOfCard({ card: cardInfo, amount: 0 }, "tcgplayer");
  const cardValuesCardmarket =
    cardInfo &&
    getValuesAndTypesOfCard({ card: cardInfo, amount: 0 }, "cardmarket");
  const valueHTML = (cardInfo: IPkmnCard) => (
    <>
      <h5 style={{ margin: 0 }}>{language?.lang_code.word_market_value}</h5>
      <h6 style={{ margin: 0 }}>TCG Player</h6>
      {cardInfo.tcgplayer && cardInfo.tcgplayer.prices ? (
        <>
          {cardValuesTCG &&
            cardValuesTCG.map((val) => (
              <BigCardInfoRow key={`${val.type}-${val.value}`}>
                <span>{val.type} </span>
                <span>{val.value}$</span>
              </BigCardInfoRow>
            ))}
        </>
      ) : (
        <p>No prices found</p>
      )}
      <h6 className="pt-3 m-0">CardMarket</h6>
      {cardInfo.cardmarket && cardInfo.cardmarket.prices ? (
        <>
          {cardValuesCardmarket &&
            cardValuesCardmarket.map((val) => (
              <BigCardInfoRow key={`${val.type}-${val.value}`}>
                <span>{val.type} </span>
                <span>{val.value}$</span>
              </BigCardInfoRow>
            ))}
        </>
      ) : (
        <p>No prices found</p>
      )}
    </>
  );

  const BigCardContainer = styled.div`
    height: "fit-content";
    width: 80vw;
    min-width: fit-content;
    min-height: fit-content;
    z-index: 500;
    position: fixed;
    background-color: ${theme?.primaryColors.background.hex};
    border-radius: 0.5rem;
    margin: 0 2rem;

    @media (${variables.breakpoints.desktop}) {
      height: fit-content;
      min-height: 60vh;
      width: 50vw;
    }
  `;
  const BigCardHeader = styled.header`
    width: 100%;
    display: flex;
    justify-content: end;
    font-size: larger;
    font-weight: bolder;
    padding: 2rem 2rem 0 0;
  `;
  const BigCardBody = styled.main`
    height: 100%;
    width: 100%;
    display: flex;
    gap: 1rem;
    justify-content: space-evenly;

    @media (${variables.breakpoints.desktop}) {
      height: 90%;
    }
  `;
  const BigCardImg = styled.img`
    height: 30rem;
  `;
  const BigCardInfo = styled.div`
    height: 90%;
    display: flex;
    flex-direction: column;
    @media (${variables.breakpoints.desktop}) {
      height: auto;
    }
  `;
  const BigCardInfoRow = styled.div`
    margin-left: 0.5rem;
    :first-child {
      font-weight: bold;
      padding-right: 0.5rem;
    }
    :nth-child(even) {
      padding-right: 0.5rem;
    }
  `;
  const BigCardInfoHeader = styled.span`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  `;
  const BigCardValueContainer = styled.div`
    margin-top: ${isDesktop ? "auto" : "1rem"};
    margin-bottom: 0.5rem;
    padding: 1rem 2rem;
    border: 3px solid goldenrod;
    border-radius: 0.5rem;
  `;
  const NationalDex = styled.span`
    font-size: x-small;
    display: flex;
    justify-content: end;
    align-self: end;
  `;
  const BigCardLegalities = styled.div``;
  return (
    <BigCardContainer>
      <BigCardHeader>
        <i className="bi bi-x-lg" onClick={changeShowPkmnInfo}></i>
      </BigCardHeader>
      <BigCardBody>
        {cardInfo && isDesktop && (
          <BigCardImg className="rounded" src={cardInfo.images.large} />
        )}
        <BigCardInfo>
          {cardInfo && (
            <>
              <BigCardInfoHeader>
                <h4 style={{ margin: 0 }}>{cardInfo.name}</h4>
                {cardInfo.nationalPokedexNumbers ? (
                  <NationalDex>
                    NationalDex:{" "}
                    {cardInfo.nationalPokedexNumbers.map(
                      (nr: number, index: number) => (
                        <span key={index}>{nr}</span>
                      )
                    )}
                  </NationalDex>
                ) : null}
              </BigCardInfoHeader>
              <BigCardInfoRow></BigCardInfoRow>
              <BigCardInfoRow>
                <span>Artist: </span>
                <span>{cardInfo.artist}</span>
              </BigCardInfoRow>
              <BigCardInfoRow>
                <span>Set: </span>
                <span>{cardInfo.set.name}</span>
                <span>Nr: {cardInfo.number}</span>
              </BigCardInfoRow>
              <BigCardInfoRow>
                <span>{language?.lang_code.word_release_date}: </span>
                <span>{cardInfo.set.releaseDate}</span>
              </BigCardInfoRow>
              <BigCardInfoRow>
                <span>Rarity: </span>
                <span>{cardInfo.rarity}</span>
              </BigCardInfoRow>
              <BigCardLegalities>
                <h6 className="m-0 mt-3">TCG Legality </h6>
                {cardInfo.legalities.standard && (
                  <BigCardInfoRow>
                    <span>Standard: </span>
                    {cardInfo.legalities.standard}
                  </BigCardInfoRow>
                )}
                {cardInfo.legalities.unlimited && (
                  <BigCardInfoRow>
                    <span>Unlimited: </span>
                    {cardInfo.legalities.unlimited}
                  </BigCardInfoRow>
                )}
                {cardInfo.legalities.expanded && (
                  <BigCardInfoRow>
                    <span>Expanded: </span>
                    {cardInfo.legalities.expanded}
                  </BigCardInfoRow>
                )}
              </BigCardLegalities>
              {container.user &&
              container.user.username !== "" &&
              changeToAddPopup ? (
                <span
                  style={
                    hoverAddBtn
                      ? {
                          backgroundColor: `rgba(${theme?.typeColors.grass.rgb},0.6)`,
                          width: "35px",
                          height: "35px",
                          fontSize: "30px",
                          alignSelf: "end",
                          margin: "0.5rem",
                        }
                      : {
                          backgroundColor: `rgba(${theme?.typeColors.grass.rgb},0.4)`,
                          width: "35px",
                          height: "35px",
                          fontSize: "30px",
                          alignSelf: "end",
                          margin: "0.5rem",
                        }
                  }
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  onMouseEnter={() => setHoverAddBtn(true)}
                  onMouseLeave={() => setHoverAddBtn(false)}
                  title="add card"
                  onClick={() => {
                    changeToAddPopup();
                  }}
                >
                  <i className="bi bi-plus m-0 p-0"></i>
                </span>
              ) : null}
              <BigCardValueContainer>
                {valueHTML(cardInfo)}
              </BigCardValueContainer>
            </>
          )}
        </BigCardInfo>
      </BigCardBody>
    </BigCardContainer>
  );
};
