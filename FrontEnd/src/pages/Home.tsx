import { getAllCards } from "../services/cardServices";

export const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <button onClick={getAllCards}>get cards</button>
    </>
  );
};
