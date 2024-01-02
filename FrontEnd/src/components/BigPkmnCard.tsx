import { useContext } from "react";
import { styled } from "styled-components";
import { ThemeContext } from "../globals/theme";

export const BigPkmnCard = () => {
  const { theme } = useContext(ThemeContext);

  const BigCardContainer = styled.div`
    background-color: ${theme.primaryColors.buttonBackground.hex};
    height: "80%";
  `;

  return <BigCardContainer>BigPkmnCard</BigCardContainer>;
};
