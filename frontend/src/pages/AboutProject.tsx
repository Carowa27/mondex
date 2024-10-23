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
            {language?.name === "English" ? <>History</> : <>Historia</>}
          </h5>
          <p className="m-0">
            {language?.name === "English" ? (
              <>
                Originally, this is my graduation project from 2023 when I
                studied to become a Frontend developer.
                <br /> <br /> Our task was to create an optional project that
                reflects our knowledge from the education. I chose to create
                Mondex, an application where the user can search for pokemon
                cards from the TCG series. Search for the sets, cards, artists
                and more. Create collections to see which cards you as a user
                own and have left in your set or even create a collection with
                your favorite Pokémon. <br /> <br /> Right now, all data that is
                saved is saved in your browser, but you can delete the saved
                data at any time via your pages. You can also export your data
                to a csv file.
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
          <p className="m-0">
            {language?.name === "English" ? (
              <>
                As a Pokemon card collector, it's hard to keep track of all the
                cards in your collection. First, you have different ways to
                collect, a large collection, collection of the different sets
                that are released or maybe of favorite pokemon or designer.
                <br />
                <br />
                If you buy an ETB(Elite Trainer Box) you get a booklet that
                contains all the cards in that set, but it still doesn't really
                give you a good overview of the collection as a whole. And if
                you want to collect the whole set, it becomes more difficult
                when you can't be sure which cards you have or not.
                <br />
                <br />
                This app would make collection easier and more time efficient.
                The user could check in the app which cards are in the different
                collections and which are missing.
              </>
            ) : (
              <>
                Som samlare av Pokémon-kort är det svårt att hålla koll på alla
                kort som finns i samlingen. Du har för det första olika sätt att
                samla på, en stor samling, samling av de olika uppsättningar som
                släpps eller kanske av favorit pokemon eller designer.
                <br />
                <br />
                Om du köper en ETB(Elite Trainer Box) får du ett häfte som
                innehåller alla kort i den uppsättningen, men den ger dig
                fortfarande inte riktigt en bra överblick över samlingen som
                helhet. Och om du vill samla hela setet blir det svårare när du
                inte kan vara säker på vilka kort du har eller inte.
                <br />
                <br />
                Denna app skulle göra insamlingen enklare och mer tidseffektiv.
                Användaren skulle kunna kolla i appen vilka kort som finns i de
                olika kollektionerna och vilka som saknas.
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
          <h5 id="about-card-goal-header">{language?.lang_code.word_goal}</h5>
          <p className="m-0">
            {language?.name === "English" ? (
              <>
                In the future, I hope to further develop this app and add proper
                login functionality with better data storage capabilities.{" "}
                <br />
                <br /> The idea is also to open opportunities for users to
                interact with others by seeing other users' traded/searched
                collections and thereby facilitate card exchanges.
              </>
            ) : (
              <>
                I framtiden hoppas jag kunna vidareutveckla den här appen och
                lägga till ordentlig inloggningsfunktion med bättre
                datalagringsmöjligheter.
                <br />
                <br /> Tanken är också att öppna möjligheter för användare att
                interagera med andra genom att se andra användares bytes/sökes
                kollektioner och därigenom underlätta kortbyten.
              </>
            )}
          </p>
        </div>
      </div>
    </>
  );
};
