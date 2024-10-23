import { FormEvent, useContext } from "react";
import { ContainerContext } from "../globals/containerContext";

interface IInputButtonProps {
  btnText: string;
  btnAction: (e: FormEvent) => void;
  disabled: boolean;
}
interface IStandardButtonProps {
  btnText: string;
  btnAction: (e: FormEvent) => void;
  disabled: boolean;
  bgColor?: string;
  fontColor?: string;
}
export const InputButton = ({
  btnText,
  btnAction,
  disabled,
}: IInputButtonProps) => {
  return (
    <>
      <button
        style={{ border: "none", borderRadius: "0 10px 10px 0" }}
        className={"btn btn-secondary"}
        onClick={(e) => btnAction(e)}
        disabled={disabled}
      >
        {btnText}
      </button>
    </>
  );
};
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
