import { useEffect, useState } from "react";

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
  const amountPages = Math.ceil(totalCount / pageSize);
  const [numbers, setNumbers] = useState<number[]>();
  const [paginationStart, setPaginationStart] = useState<number>();
  const [paginationEnd, setPaginationEnd] = useState<number>();

  useEffect(() => {
    const numberArray = [];
    for (let i = 0; i < amountPages; i++) {
      console.log("nummer", i + 1);
      numberArray.push(i + 1);
    }
    setNumbers(numberArray);
  }, []);

  useEffect(() => {
    if (page === 1 || page === amountPages) {
      if (page === amountPages) {
        setPaginationEnd(amountPages);
        setPaginationStart(page - 5);
      } else {
        setPaginationStart(0);
        setPaginationEnd(page + 5);
      }
    } else {
      setPaginationStart(page - 5), setPaginationEnd(page + 5);
    }
  }, [page]);
  return (
    <>
      <div className="w-100 d-flex justify-content-center justify-self-center align-items-center">
        <p className="m-0 px-2">
          <i
            className="bi bi-caret-left-fill"
            onClick={() => (page !== 1 ? updateSearch(1) : null)}
          ></i>
        </p>
        {numbers &&
          numbers.slice(paginationStart, paginationEnd).map((number) => {
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
