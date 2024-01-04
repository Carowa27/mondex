import { useEffect } from "react";

interface IProps {
  pageSize: number;
  totalCount: number;
  page: number;
  updateSearch: (newPage: number) => void;
}

export const Pagination = ({
  pageSize,
  totalCount,
  page,
  updateSearch,
}: IProps) => {
  // const activePage;
  const amountPages = Math.ceil(totalCount / pageSize);
  const numbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  return (
    <>
      <div className="w-50 d-flex justify-content-center justify-self-center align-items-center">
        <p className="m-0 px-2">
          <i
            className="bi bi-caret-left-fill"
            onClick={() => (page !== 1 ? updateSearch(1) : null)}
          ></i>
        </p>
        {numbers.slice(0, amountPages).map((number) => {
          return (
            <p
              key={number}
              className={number === page ? "fw-bold m-0 px-2" : "m-0 px-2"}
              onClick={() => (page !== number ? updateSearch(number) : null)}
            >
              {number}
            </p>
          );
        })}
        <p className="m-0 px-2">
          <i
            className="bi bi-caret-right-fill"
            onClick={() =>
              page !== amountPages ? updateSearch(amountPages) : null
            }
          ></i>
        </p>
      </div>
    </>
  );
};
