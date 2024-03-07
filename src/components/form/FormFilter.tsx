"use client";

import { useAppSelector } from "@/lib/hook";

interface IProps {
  filter: any;
  handleFilterChange: (e: React.ChangeEvent<any>) => void;
  clearFilter: () => void;
}

const FormFilter = (props: IProps) => {
  const { filter, handleFilterChange, clearFilter } = props;
  const users = useAppSelector((state) => state.userReducer);
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="mt-5">
          <label htmlFor="nameFilter" className="text-slate-400 text-sm">
            Task name:
          </label>
          <input
            name="name"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name..."
            required
            value={filter?.name}
            onChange={handleFilterChange}
          />
        </div>
        <div className="mt-5">
          <label htmlFor="assignment" className="text-slate-400 text-sm">
            Assignment:
          </label>

          <select
            name="assignment"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={filter?.assignment}
            onChange={handleFilterChange}
          >
            <option value={""}>Choose</option>
            {users?.map((user, index) => (
              <option value={user.email} key={index}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label htmlFor="from" className="text-slate-400 text-sm">
            From:
          </label>
          <input
            name="from"
            type="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date"
            value={filter?.from}
            onChange={handleFilterChange}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="to" className="text-slate-400 text-sm">
            To:
          </label>
          <input
            name="to"
            type="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date"
            value={filter?.to}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <button
        type="button"
        className="w-full py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={clearFilter}
      >
        Clear
      </button>
    </>
  );
};

export default FormFilter;