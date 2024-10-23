import { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { BreadCrumbs } from "./layout/BreadCrumbs";
import { ContainerContext } from "../globals/containerContext";

export const AboutProject = () => {
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { container } = useContext(ContainerContext);
  const language = container.language;
  const theme = container.theme;
  return (
    <>
      <div className="d-flex justify-content-between align-items-start">
        <h2>{language?.lang_code.about_about_project}</h2>
        <BreadCrumbs pageParam="about" />
      </div>
      <div
        id="about-container"
        className={
          isDesktop
            ? "d-flex flex-row justify-content-around my-1 "
            : "column my-1"
        }
        style={{ minHeight: "87vh" }}
      >
        <div
          className={
            isDesktop
              ? "rounded px-3 py-2 my-2 d-flex flex-column"
              : "w-100 rounded px-4 py-3 my-2 d-flex flex-column order-3"
          }
          style={
            isDesktop
              ? {
                  width: "32%",
                  border: `2px solid rgba(${theme?.typeColors.metal.rgb},0.5)`,
                  backgroundColor: `rgba(${theme?.typeColors.metal.rgb},0.1)`,
                  minHeight: "80vh",
                  height: "auto",
                }
              : {
                  border: `2px solid  rgba(${theme?.typeColors.metal.rgb},0.5)`,
                  backgroundColor: `rgba(${theme?.typeColors.metal.rgb},0.1)`,
                  minHeight: "28vh",
                }
          }
        >
          <h5 id="about-card-examprj-header">
            {language?.name === "English" ? (
              <>History and goals</>
            ) : (
              <>Historia och mål</>
            )}
          </h5>
          <p className="m-0">
            {language?.name === "English" ? (
              <>
                Originally, this is my graduation project from 2023 when I
                studied to be a Frontend developer.
                <br /> <br /> Our task was to create an optional project that
                reflects our knowledge from the education. I chose to create
                Mondex, an application where the user can search for pokemon
                cards from the TCG series. Search for the sets, cards, artists
                and more. Create collections to see which cards you as a user
                own and have left in your set or even create a collection with
                your favorite Pokémon. <br /> <br /> Right now, all data saved
                in your browser is collected, but you can delete the saved data
                at any time via your pages. You can also export your data to a
                csv file. <br /> <br /> In the future, I hope to further develop
                this app so that it has a proper login, with data saved in the
                database and opens up opportunities to see other users and even
                be able to match with cards you want to exchange.
              </>
            ) : (
              <>
                Ursprungligen är detta mitt examens projekt från 2023 när jag
                studerade till Frontend utvecklare.
                <br /> <br />
                Vår uppgift varatt skapa ett valfritt projekt som återspeglar
                våra kunskaper från utbildningen. Jag valde att skapa Mondex, en
                applikation där användaren kan söka efter pokémonkort från
                TCG-serien. Söka efter uppsättningarna, korten, artisterna och
                mer. Skapa samlingar för att se vilka kort du som användare äger
                och har kvar i set eller till och med skapa en samling med din
                favorit Pokémon.
                <br /> <br />
                Just nu samlas all data som sparas i din browser, men du kan
                närsomhelst ta bort den sparade datan via dina sidor. Du kan
                även exportera din data till en csv fil.
                <br />
                <br />I framtiden hoppas jag att vidareutveckla denna app så att
                den har en ordentlig inloggning, med data sparad i databas och
                öppna upp för möjligheter att kunna se andra användare och
                tillochmed kunna matcha med kort man vill byta.
              </>
            )}
          </p>
        </div>
        <div
          className={
            isDesktop
              ? "rounded px-3 py-2 my-2 d-flex flex-column"
              : "w-100 rounded px-4 py-3 my-2 d-flex flex-column order-3"
          }
          style={
            isDesktop
              ? {
                  width: "32%",
                  border: `2px solid rgba(${theme?.typeColors.metal.rgb},0.5)`,
                  backgroundColor: `rgba(${theme?.typeColors.metal.rgb},0.1)`,
                  minHeight: "80vh",
                  height: "auto",
                }
              : {
                  border: `2px solid  rgba(${theme?.typeColors.metal.rgb},0.5)`,
                  backgroundColor: `rgba(${theme?.typeColors.metal.rgb},0.1)`,
                  minHeight: "28vh",
                }
          }
        >
          <h5 id="about-card-purpose-header">
            {language?.lang_code.word_purpose}
          </h5>
          <p className="m-0">{language?.lang_code.about_description_purpose}</p>
        </div>
        <div
          className={
            isDesktop
              ? "rounded px-3 py-2 my-2 d-flex flex-column"
              : "w-100 rounded px-4 py-3 my-2 d-flex flex-column order-3"
          }
          style={
            isDesktop
              ? {
                  width: "32%",
                  border: `2px solid rgba(${theme?.typeColors.metal.rgb},0.5)`,
                  backgroundColor: `rgba(${theme?.typeColors.metal.rgb},0.1)`,
                  minHeight: "80vh",
                  height: "auto",
                }
              : {
                  border: `2px solid  rgba(${theme?.typeColors.metal.rgb},0.5)`,
                  backgroundColor: `rgba(${theme?.typeColors.metal.rgb},0.1)`,
                  minHeight: "28vh",
                }
          }
        >
          <h5 id="about-card-goal-header">{language?.lang_code.word_goal}</h5>
          <p className="m-0">{language?.lang_code.about_description_goal}</p>
        </div>
      </div>
    </>
  );
};
