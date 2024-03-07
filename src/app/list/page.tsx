"use client";
import { useAppSelector } from "@/lib/hook";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ListUserPage = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const globalUsers = useAppSelector((state) => state.userReducer);
  const [users, setUsers] = useState(globalUsers);
  const [totalPage, setTotalPage] = useState<number>(1);

  const handlePaginate = (type: string) => {
    if (type !== "previous" && type !== "next") {
      setPage(parseInt(type));
    }

    if (type === "previous") {
      setPage((prev) => prev - 1);
    }
    if (type === "next") {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (page > 0) {
      const limit = 4;

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      setTotalPage(Math.ceil(globalUsers.length / limit));
      setUsers(globalUsers.slice(startIndex, endIndex));
    }
  }, [page]);

  return (
    <div className="mx-10 my-5">
      <h2 className="text-2xl font-semibold text-center text-green-950">
        Users List
      </h2>

      <div className="flex items-center justify-between">
        <button
          type="button"
          className="my-5 focus:outline-none text-gray-900 bg-white border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          onClick={() => router.push("/")}
        >
          Home
        </button>
        <button
          type="button"
          className="my-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={() => router.push("add")}
        >
          Add
        </button>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={user?.id}
              >
                <td className="px-6 py-4 font-semibold">{index + 1}</td>
                <td className="px-6 py-4">{user?.name}</td>
                <td className="px-6 py-4">{user?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-center mt-10">
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
      </div>
    </div>
  );
};

export default ListUserPage;
