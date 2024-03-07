"use client";

import { Dispatch, SetStateAction } from 'react';
interface IProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPage: number;
}

const Pagination = (props: IProps) => {
  const { page, setPage, totalPage } = props;
  const handlePaginate = (type: string) => {
    if (type !== "previous" && type !== "next") {
      setPage(parseInt(type));
    }

    if (type === "previous") {
      setPage((prev: number) => prev - 1);
    }
    if (type === "next") {
      setPage((prev: number) => prev + 1);
    }
  };

  return (
    <div className="flex items-center justify-center py-5">
      <button
        className={`flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium ${
          page === 1
            ? "bg-gray-300 text-gray-500 border border-gray-300 rounded-md px-4 py-2 disabled cursor-not-allowed"
            : "flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        } rounded-lg`}
        onClick={() => handlePaginate("previous")}
        disabled={page === 1}
      >
        Previous
      </button>

      {Array.from({ length: totalPage }, (_, index) => (
        <button
          key={index + 1}
          className={`flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium ${
            page === index + 1
              ? "text-white bg-blue-500"
              : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          } rounded-lg`}
          onClick={() => handlePaginate(`${index + 1}`)}
        >
          {index + 1}
        </button>
      ))}

      <button
        className={`flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium ${
          page === totalPage
            ? "bg-gray-300 text-gray-500 border border-gray-300 rounded-md px-4 py-2 disabled cursor-not-allowed"
            : "flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        } rounded-lg`}
        onClick={() => handlePaginate("next")}
        disabled={page === totalPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
