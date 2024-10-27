import { useContext, useEffect, useRef, useState } from "react";
import { IPkmnCard } from "../interfaces/dataFromApi";
import { BigPkmnCard } from "./BigPkmnCard";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { ContainerContext } from "../globals/containerContext";

interface IProps {
  cardFromApi?: IPkmnCard;
  addCard: () => void;
}

export const SmallPkmnCardSearch = ({ cardFromApi, addCard }: IProps) => {
  const { container } = useContext(ContainerContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const [showCardAlternatives, setShowCardAlternatives] = useState<string>("");
  const [hoverPlusBtn, setHoverPlusBtn] = useState<boolean>(false);
  const [hoverInfoBtn, setHoverInfoBtn] = useState<boolean>(false);
  const [seeBigCard, setSeeBigCard] = useState<boolean>(false);
  const [infoPkmnCard, setInfoPkmnCard] = useState<IPkmnCard>();
  const [cardWidth, setCardWidth] = useState<number>(0);
  const theme = container.theme;
  const itemRef = useRef<HTMLImageElement>(null);

  const changeShowPkmnInfo = () => {
    setSeeBigCard(false);
  };

  const saveCardToGetInfoOn = (pkmnCard: IPkmnCard | undefined) => {
    if (pkmnCard !== undefined) {
      setInfoPkmnCard(pkmnCard);
    }
  };

  useEffect(() => {
    if (itemRef) {
      setCardWidth(itemRef.current?.clientWidth || 180);
    }
  }, []);

  return (
    <>
      {seeBigCard ? (
        <div
          style={{
            backgroundColor: `rgba(${theme?.primaryColors.black.rgb}, 0.7)`,
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            position: "fixed",
            zIndex: "400",
          }}
          className="d-flex justify-content-center align-items-center"
          onClick={changeShowPkmnInfo}
        >
          <BigPkmnCard
            card={undefined}
            pkmnCard={infoPkmnCard}
            changeShowPkmnInfo={changeShowPkmnInfo}
          />
        </div>
      ) : null}

      <div
        className={isDesktop ? "mb-3" : "mb-2"}
        style={{
          aspectRatio: "3/4",
          width: isDesktop ? "12.5rem" : cardWidth + "px",
          display: "flex",
          justifyContent: "center",
        }}
        onMouseEnter={() =>
          setShowCardAlternatives(cardFromApi ? cardFromApi.id : "")
        }
        onMouseLeave={() => setShowCardAlternatives("")}
      >
        {(showCardAlternatives && container.user) || !isDesktop ? (
          <div
            style={
              showCardAlternatives ===
                (cardFromApi !== undefined ? cardFromApi.id : "") || !isDesktop
                ? {
                    display: "flex",
                    zIndex: 300,
                    position: "absolute",
                    color: `${theme?.primaryColors.text.hex}`,
                    aspectRatio: "3/4",
                    width: cardWidth - 15 + "px",
                    fontSize: "20pt",
                    alignItems: "end",
                  }
                : { display: "none" }
            }
          >
            <div
              className="rounded-pill w-100 d-flex justify-content-around"
              style={{
                backgroundColor: `${theme?.primaryColors.buttonBackground.hex}`,
                padding: "0.3rem",
              }}
            >
              <span
                style={
                  hoverPlusBtn
                    ? {
                        backgroundColor: `rgba(${theme?.typeColors.grass.rgb},0.6)`,
                        width: "1.7rem",
                        height: "1.7rem",
                      }
                    : {
                        backgroundColor: `rgba(${theme?.typeColors.grass.rgb},0.4)`,
                        width: "1.7rem",
                        height: "1.7rem",
                      }
                }
                className="rounded-circle d-flex align-items-center justify-content-center"
                onMouseEnter={() => setHoverPlusBtn(true)}
                onMouseLeave={() => setHoverPlusBtn(false)}
                onClick={() => addCard()}
              >
                <i title="add amount" className="bi bi-plus m-0 p-0"></i>
              </span>

              <span
                style={
                  hoverInfoBtn
                    ? {
                        backgroundColor: `rgba(${theme?.typeColors.water.rgb},0.6)`,
                        width: "1.7rem",
                        height: "1.7rem",
                      }
                    : {
                        backgroundColor: `rgba(${theme?.typeColors.water.rgb},0.4)`,
                        width: "1.7rem",
                        height: "1.7rem",
                      }
                }
                className="rounded-circle d-flex align-items-center justify-content-center"
                onMouseEnter={() => setHoverInfoBtn(true)}
                onMouseLeave={() => setHoverInfoBtn(false)}
                onClick={() => {
                  setSeeBigCard(true);
                  saveCardToGetInfoOn(cardFromApi);
                }}
              >
                <span title="more info" className="fs-5 fw-medium">
                  i
                </span>
              </span>
            </div>
          </div>
        ) : null}

        <div className={"flip-box flip-box-flipped"}>
          <div className="flip-box-inner">
            <div className="flip-box-back">
              <img
                ref={itemRef}
                className="rounded"
                src={cardFromApi && cardFromApi.images.small}
                alt={cardFromApi && cardFromApi.name}
                style={{ width: "100%", opacity: "1" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
