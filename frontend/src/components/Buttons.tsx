import { FormEvent } from "react";

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
  return (
    <>
      <button
        style={{
          border: "none",
          borderRadius: "10px",
          color: fontColor ? fontColor : "inherit",
          backgroundColor: bgColor ? bgColor : "#adb5bd",
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
