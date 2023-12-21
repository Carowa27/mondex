import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { useAuth0 } from "@auth0/auth0-react";
import { LoadingModule } from "../components/LoadingModule";
import { useContext, useEffect, useState } from "react";
import { IPkmnCard } from "../interfaces/dataFromApi";
import { LanguageContext } from "../globals/language/language";
import { ThemeContext } from "../globals/theme";
import { getAllOwnedCards } from "../services/cardServices";
import { ICardFromDB } from "../interfaces/dataFromDB";

interface IProps {
  type: string;
}

export const CollectionPage = ({ type }: IProps) => {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { isAuthenticated, user } = useAuth0();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cardList, setCardList] = useState<ICardFromDB[]>([]);
  const collectionName = window.location.href.split("/")[4];

  useEffect(() => {
    if (isAuthenticated && user) {
      const getData = async () => {
        await getAllOwnedCards({ user }).then((res) => {
          const cardsInCollection = res.filter(
            (card: ICardFromDB) => card.collection_name === collectionName
          );
          setCardList(cardsInCollection);
        });
      };
      getData();
    }
  }, [isAuthenticated]);

  return (
    <>
      <h2>{collectionName}</h2>
      <div
        style={{ minHeight: "80vh", outline: "1px solid black" }}
        className="mt-3 p-2"
      >
        {!isLoading ? (
          <>
            {cardList.length !== 0 ? (
              <>
                <ul
                  className="d-flex flex-wrap justify-content-around"
                  style={{ listStyle: "none", padding: 0 }}
                >
                  {cardList.map((card: ICardFromDB) => (
                    <li
                      key={card.id}
                      className="pt-2 px-1"
                      onClick={() => {
                        console.log(card.api_card_img_src_large);
                      }}
                    >
                      <p className="fw-semibold ps-1 m-0">
                        {card.api_pkmn_name}
                        {card.amount >= 2 ? <>, {card.amount}</> : <></>}
                      </p>
                      <div
                        style={{
                          aspectRatio: "3/4",
                          width: "12.5rem",
                        }}
                      >
                        <img
                          style={{ width: "100%" }}
                          src={card.api_card_img_src_small}
                          alt={card.api_pkmn_name}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="d-flex justify-content-center">Paginering</div>
              </>
            ) : (
              <>Doesn't appear to be any cards in this collection</>
            )}
          </>
        ) : (
          <LoadingModule />
        )}
      </div>
    </>
  );
};
