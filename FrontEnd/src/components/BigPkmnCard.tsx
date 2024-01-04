import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { ThemeContext } from "../globals/theme";
import { IPkmnCard } from "../interfaces/dataFromApi";
import { ICardFromDB } from "../interfaces/dataFromDB";
import { SmallPkmnCard } from "./SmallPkmnCard";
import { getCardFromApi } from "../services/pkmnApiServices";
import { variables } from "../globals/variables";
import { useMediaQuery } from "react-responsive";
import { spawn } from "child_process";

interface IProps {
  card: ICardFromDB | undefined;
  pkmnCard: IPkmnCard | undefined;
  changeShowPkmnInfo: () => void;
}
export const BigPkmnCard = ({ card, pkmnCard, changeShowPkmnInfo }: IProps) => {
  const { theme } = useContext(ThemeContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const [cardInfo, setCardInfo] = useState<IPkmnCard>();

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

  const BigCardContainer = styled.div`
    height: 60vh;
    width: 80vw;
    min-width: fit-content;
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
    height: 100%;
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
    margin-top: auto;
    margin-bottom: 0%.5;
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
        {cardInfo && isDesktop && <BigCardImg src={cardInfo.images.large} />}
        <BigCardInfo>
          {cardInfo && (
            <>
              <BigCardInfoHeader>
                <h4>{cardInfo.name}</h4>{" "}
              </BigCardInfoHeader>
              <BigCardInfoRow>
                <NationalDex>
                  NationalDex:{" "}
                  {cardInfo.nationalPokedexNumbers.map((nr) => (
                    <span>{nr}</span>
                  ))}
                </NationalDex>
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
                <h5>Market Value</h5>
                <h6>TCG Player</h6>
                {cardInfo.tcgplayer?.prices["1stEdition"] ? (
                  <BigCardInfoRow>
                    <span>1st Edition: </span>
                    <span>
                      {cardInfo.tcgplayer?.prices["1stEdition"].market}$
                    </span>
                  </BigCardInfoRow>
                ) : null}
                {cardInfo.tcgplayer?.prices["1stEditionHolofoil"] ? (
                  <BigCardInfoRow>
                    <span>1st Edition Holofoil: </span>
                    <span>
                      {cardInfo.tcgplayer?.prices["1stEditionHolofoil"].market}$
                    </span>
                  </BigCardInfoRow>
                ) : null}
                {cardInfo.tcgplayer?.prices["1stEditionNormal"] ? (
                  <BigCardInfoRow>
                    <span>1st Edition Normal: </span>
                    <span>
                      {cardInfo.tcgplayer?.prices["1stEditionNormal"].market}$
                    </span>
                  </BigCardInfoRow>
                ) : null}
                {cardInfo.tcgplayer?.prices.holofoil ? (
                  <BigCardInfoRow>
                    <span>Holofoil: </span>
                    <span>{cardInfo.tcgplayer?.prices.holofoil.market}$</span>
                  </BigCardInfoRow>
                ) : null}
                {cardInfo.tcgplayer?.prices.normal ? (
                  <BigCardInfoRow>
                    <span>Normal: </span>
                    <span>{cardInfo.tcgplayer?.prices.normal.market}$</span>
                  </BigCardInfoRow>
                ) : null}
                {cardInfo.tcgplayer?.prices.reverseHolofoil ? (
                  <BigCardInfoRow>
                    <span>Reverse Holofoil: </span>
                    <span>
                      {cardInfo.tcgplayer?.prices.reverseHolofoil.market}$
                    </span>
                  </BigCardInfoRow>
                ) : null}
                {cardInfo.tcgplayer?.prices.unlimited ? (
                  <BigCardInfoRow>
                    <span>Unlimited: </span>
                    <span>{cardInfo.tcgplayer?.prices.unlimited.market}$</span>
                  </BigCardInfoRow>
                ) : null}
                {cardInfo.tcgplayer?.prices.unlimitedHolofoil ? (
                  <BigCardInfoRow>
                    <span>Unlimited Holofoil: </span>
                    <span>
                      {cardInfo.tcgplayer?.prices.unlimitedHolofoil.market}$
                    </span>
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
              </BigCardValueContainer>
            </>
          )}
        </BigCardInfo>
      </BigCardBody>
    </BigCardContainer>
  );
};
