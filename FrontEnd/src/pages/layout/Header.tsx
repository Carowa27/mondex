import { Menu } from "./Menu";

export const Header = () => {
  return (
    <>
      <div className="d-flex justify-content-between pl-2">
        <span>logo</span>
        <span>name</span>
        <Menu />
      </div>
    </>
  );
};
