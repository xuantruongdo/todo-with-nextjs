"use client";
import { useAppSelector } from "@/lib/hook";
import { useRouter } from "next/navigation";

const ListUserPage = () => {
  const router = useRouter();
    const users = useAppSelector((state) => state.userReducer);
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
      </div>
    </div>
  );
};

export default ListUserPage;
