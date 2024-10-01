import { ILSContainer } from "../interfaces/LSInterface";

export const setMondexLs = (value: ILSContainer) => {
  localStorage.setItem("mondex", JSON.stringify(value));
};
export const getMondexLs = () => {
  const value = localStorage.getItem("mondex");
  if (value !== null) {
    return JSON.parse(value);
  }
};