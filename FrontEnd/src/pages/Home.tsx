import { useMediaQuery } from "react-responsive";
import { FrontPageBtnCard } from "../components/FrontPageBtnCard";
import { Link } from "react-router-dom";
import { variables } from "../globals/variables";

export const Home = () => {
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  return (
    <>
      <div
        className={
          isDesktop
            ? "row m-1" //d-flex flex-row justify-content-around
            : "row d-flex justify-content-center" //"d-flex flex-column justify-content-around align-items-center"
        }
        style={{ height: "90vh" }}
      >
        {/* <Link to="./about"></Link> */}
        <FrontPageBtnCard header="Fast about">
          <div>test</div>
        </FrontPageBtnCard>
        <FrontPageBtnCard header="Search">
          <div>test</div>
          <Link to="./search">Go search now</Link>
        </FrontPageBtnCard>
        <FrontPageBtnCard header="Create Account">
          <div>If you have an account you could....</div>
          <div className="d-flex justify-content-around">
            <button>create an account</button>
            <button>login</button>
          </div>
        </FrontPageBtnCard>
      </div>
    </>
  );
};
