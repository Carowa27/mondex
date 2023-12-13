import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { useAuth0 } from "@auth0/auth0-react";

export const CollectionBanner = () => {
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {isAuthenticated && (
        <>
          {isDesktop ? (
            <div
              style={{ outline: "2px blue solid" }}
              className={
                window.location.pathname === "/"
                  ? "py-2 my-3"
                  : "py-2 my-3 col-5"
              }
            >
              <h6>collection name</h6>
              {/* smallPkmnCard Array of 5(?) */}

              <div className="row d-flex justify-content-around px-3">
                <div
                  className="col-2"
                  style={{ outline: "1px green solid", height: "4rem" }}
                ></div>
                <div
                  className="col-2"
                  style={{ outline: "1px brown solid", height: "4rem" }}
                ></div>
                <div
                  className="col-2"
                  style={{ outline: "1px brown solid", height: "4rem" }}
                ></div>
                <div
                  className="col-2"
                  style={{ outline: "1px brown solid", height: "4rem" }}
                ></div>
                <div
                  className="col-2"
                  style={{ outline: "1px brown solid", height: "4rem" }}
                ></div>
              </div>
            </div>
          ) : (
            <div
              style={{ outline: "2px blue solid", width: "100%" }}
              className="py-2 my-2"
            >
              <h6>collection name</h6>
              {/* smallPkmnCard Array of 3(?) */}
              <div className="row d-flex justify-content-around px-3">
                <div
                  className="col-3 p-0 m-0"
                  style={{ outline: "1px brown solid", height: "4rem" }}
                ></div>
                <div
                  className="col-3 p-0 m-0"
                  style={{ outline: "1px brown solid", height: "4rem" }}
                ></div>
                <div
                  className="col-3 p-0 m-0"
                  style={{ outline: "1px brown solid", height: "4rem" }}
                ></div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
