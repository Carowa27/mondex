import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { colorModes } from "../globals/theme";
import { IPkmnCard } from "../interfaces/dataFromApi";
import { ICardFromDB } from "../interfaces/dataFromDB";
import { getCardFromApi } from "../services/pkmnTcgApiServices";
import { variables } from "../globals/variables";
import { useMediaQuery } from "react-responsive";
import { lang } from "../globals/language/language";
import { ILSContainer } from "../interfaces/LSInterface";
import { getMondexLs, setMondexLs } from "../functions/LSFunctions";
import { ContainerContext } from "../globals/containerContext";

interface IProps {
  card: ICardFromDB | undefined;
  pkmnCard: IPkmnCard | undefined;
  changeShowPkmnInfo: () => void;
}
export const BigPkmnCard = ({ card, pkmnCard, changeShowPkmnInfo }: IProps) => {
  const { container, updateContainer } = useContext(ContainerContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const [cardInfo, setCardInfo] = useState<IPkmnCard>();
  const [lsContainer, setLsContainer] = useState<ILSContainer>({
    mostValuableCard: undefined,
    theme: colorModes.Light,
    user: { username: "", collections: [] },
    lastOpenedCard: undefined,
    language: lang.EN,
  });
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
        await getCardFromApi(card.api_card_id).then((res) => {
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
    setMondexLs(lsContainer);
  }, [lsContainer]);

  const valueHTML = (cardInfo: IPkmnCard) => (
    <>
      <h5>{language?.lang_code.word_market_value}</h5>
      <h6>TCG Player</h6>
      {cardInfo.tcgplayer?.prices["1stEdition"]?.market ? (
        <BigCardInfoRow>
          <span>1st Edition: </span>
          <span>{cardInfo.tcgplayer?.prices["1stEdition"].market}$</span>
        </BigCardInfoRow>
      ) : null}
      {cardInfo.tcgplayer?.prices["1stEditionHolofoil"]?.market ? (
        <BigCardInfoRow>
          <span>1st Edition Holofoil: </span>
          <span>
            {cardInfo.tcgplayer?.prices["1stEditionHolofoil"].market}$
          </span>
        </BigCardInfoRow>
      ) : null}
      {cardInfo.tcgplayer?.prices["1stEditionNormal"]?.market ? (
        <BigCardInfoRow>
          <span>1st Edition Normal: </span>
          <span>{cardInfo.tcgplayer?.prices["1stEditionNormal"].market}$</span>
        </BigCardInfoRow>
      ) : null}
      {cardInfo.tcgplayer?.prices.holofoil?.market ? (
        <BigCardInfoRow>
          <span>Holofoil: </span>
          <span>{cardInfo.tcgplayer?.prices.holofoil.market}$</span>
        </BigCardInfoRow>
      ) : null}
      {cardInfo.tcgplayer?.prices.normal?.market ? (
        <BigCardInfoRow>
          <span>Normal: </span>
          <span>{cardInfo.tcgplayer?.prices.normal.market}$</span>
        </BigCardInfoRow>
      ) : null}
      {cardInfo.tcgplayer?.prices.reverseHolofoil?.market ? (
        <BigCardInfoRow>
          <span>Reverse Holofoil: </span>
          <span>{cardInfo.tcgplayer?.prices.reverseHolofoil.market}$</span>
        </BigCardInfoRow>
      ) : null}
      {cardInfo.tcgplayer?.prices.unlimited?.market ? (
        <BigCardInfoRow>
          <span>Unlimited: </span>
          <span>{cardInfo.tcgplayer?.prices.unlimited.market}$</span>
        </BigCardInfoRow>
      ) : null}
      {cardInfo.tcgplayer?.prices.unlimitedHolofoil?.market ? (
        <BigCardInfoRow>
          <span>Unlimited Holofoil: </span>
          <span>{cardInfo.tcgplayer?.prices.unlimitedHolofoil.market}$</span>
        </BigCardInfoRow>
      ) : null}
      <h6 className="pt-3">CardMarket</h6>
      {cardInfo.cardmarket.prices.averageSellPrice ? (
        <BigCardInfoRow>
          <span>Normal: </span>
          <span>{cardInfo.cardmarket.prices.averageSellPrice}$</span>
        </BigCardInfoRow>
      ) : null}
      {cardInfo.cardmarket.prices.reverseHoloSell ? (
        <BigCardInfoRow>
          <span>Reverse Holofoil: </span>
          <span>{cardInfo.cardmarket.prices.reverseHoloSell}$</span>
        </BigCardInfoRow>
      ) : null}
    </>
  );

  const BigCardContainer = styled.div`
    height: "fit-content";
    width: 80vw;
    min-width: fit-content;
    min-height: fit-content;
    padding: 0 2rem 2rem 2rem;
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
    padding: 0.5rem 0;
    font-size: larger;
    font-weight: bolder;
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
      height: 100%;
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
  `;
  const BigCardValueContainer = styled.div`
    border: solid 1px grey;
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
                <h4>{cardInfo.name}</h4>{" "}
              </BigCardInfoHeader>
              <BigCardInfoRow>
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
              </BigCardInfoRow>
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
