"use client";
import Pagination from "@/components/pagination/Pagination";
import { IAssignee } from "@/types/assignee.interface";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const AssigneePage = () => {
  const [assignees, setAssignees] = useState<IAssignee[]>();
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const fetchAssignees = async () => {
    const res = await axios.get("/api/assignees", {
      params: {page: page, pageSize: 5}
    });
    if (res && res.data) {
      setAssignees(res.data.assignees);
      setTotalPage(res.data.totalPages)
    }
  };

  useEffect(() => {
    fetchAssignees();
  }, [page]);

  return (
    <div className="max-w-screen-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-center text-green-950">
        Assignees List
      </h2>
      <div className="flex items-center justify-between">
        <Link
          href={"/"}
          className="my-5 focus:outline-none text-gray-900 bg-white border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Home
        </Link>
        <Link
          href={"/assignees/create"}
          type="button"
          className="my-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Create
        </Link>
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
            {assignees?.map((assignee: IAssignee) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={assignee?.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {assignee?.id}
                </th>

                <td className="px-6 py-4">{assignee?.name}</td>
                <td className="px-6 py-4">{assignee?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination page={page} setPage={setPage} totalPage={totalPage}/>
      </div>
    </div>
  );
};

export default AssigneePage;
