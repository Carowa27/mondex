import { FormEvent, useContext } from "react";
import { ContainerContext } from "../globals/containerContext";
import { useMediaQuery } from "react-responsive";
import { variables } from "../globals/variables";

interface IStandardButtonProps {
  btnText: string;
  btnAction: (e: FormEvent) => void;
  disabled: boolean;
  bgColor?: string;
  fontColor?: string;
}
interface IInputButtonProps {
  btnText: string;
  btnAction: (e: FormEvent) => void;
  disabled: boolean;
}
interface ITextToggleProps {
  btnText: string;
  btnAction: (e: FormEvent) => void;
  toggleState: boolean;
  disabled?: boolean;
}

export const StandardButton = ({
  btnText,
  btnAction,
  disabled,
  bgColor,
  fontColor,
}: IStandardButtonProps) => {
  const { container } = useContext(ContainerContext);
  const theme = container.theme;
  return (
    <>
      <button
        style={{
          border: "#a0a0a0 solid 1px",
          borderRadius: "10px",
          color: fontColor ? fontColor : "inherit",
          backgroundColor: bgColor
            ? bgColor
            : theme?.primaryColors.buttonBackground.hex,
          fontWeight: fontColor ? "bolder" : "normal",
        }}
        className={"btn"}
        onClick={(e) => btnAction(e)}
        disabled={disabled}
      >
        {btnText}
      </button>
    </>
  );
};
export const InputButton = ({
  btnText,
  btnAction,
  disabled,
}: IInputButtonProps) => {
  return (
    <>
      <button
        style={{
          height: "2.5rem",
          padding: "0rem 0.4rem",
        }}
        className={"btn btn-secondary"}
        onClick={(e) => btnAction(e)}
        disabled={disabled}
      >
        {btnText}
      </button>
    </>
  );
};
export const CreateButton = ({
  btnText,
  btnAction,
  disabled,
}: IInputButtonProps) => {
  const isDesktop = useMediaQuery({ query: variables.breakpoints.desktop });
  return (
    <>
      <button
        style={{
          height: "2.5rem",
          padding: "0rem 0.4rem",
          width: isDesktop ? "15rem" : "auto",
        }}
        className={"btn btn-secondary"}
        onClick={(e) => btnAction(e)}
        disabled={disabled}
      >
        {btnText}
      </button>
    </>
  );
};
export const TextToggleButton = ({
  btnText,
  btnAction,
  toggleState,
}: ITextToggleProps) => {
  return (
    <button
      style={{
        background: "none",
        color: "inherit",
        fontSize: "inherit",
        width: "max-content",
        padding: "0.2rem 0.5rem",
        borderRadius: "30px",
        border: "none",
        cursor: "pointer",
      }}
      onClick={(e) => btnAction(e)}
    >
      {btnText}
      {toggleState === true ? (
        <i className="bi bi-chevron-up ps-1"></i>
      ) : (
        <i className="bi bi-chevron-down ps-1"></i>
      )}
    </button>
  );
};
