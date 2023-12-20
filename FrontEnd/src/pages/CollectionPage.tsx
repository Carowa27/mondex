import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllCards } from "../services/cardServices";

interface IProps {
  type: string;
}

export const CollectionPage = ({ type }: IProps) => {
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  const { isAuthenticated } = useAuth0();

  getAllCards().then(async (res) => {
    await res;
    console.log(res);
  });
  return <>collection page</>;
};
