import { FormEvent } from "react";

interface IInputButtonProps {
  btnText: string;
  btnAction: (e: FormEvent) => void;
}

export const InputButton = ({ btnText, btnAction }: IInputButtonProps) => {
  return (
    <>
      <button
        style={{ border: "none", borderRadius: "0 10px 10px 0" }}
        className={"btn btn-secondary"}
        onClick={(e) => btnAction(e)}
      >
        {btnText}
      </button>
    </>
  );
};
