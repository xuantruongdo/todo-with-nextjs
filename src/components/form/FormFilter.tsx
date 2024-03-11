"use client";

import { IFilter } from "@/types/filter.interface";

interface IProps {
  filter: {
    name: string;
    status: string;
    from: string;
    to: string;
  };
  handleFilterChange: (e: React.ChangeEvent<any>) => void;
  clearFilter: () => void;
}

const FormFilter = (props: IProps) => {
  const { filter, handleFilterChange, clearFilter } = props;
  return (
    <div className="mb-3">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-slate-400 text-sm mb-2">
            Task name:
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name..."
            value={filter?.name}
            onChange={handleFilterChange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="status" className="text-slate-400 text-sm mb-2">
            Status:
          </label>
          <select
            id="status"
            name="status"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={filter?.status}
            onChange={handleFilterChange}
          >
            <option value="">Choose</option>
            <option value="Open">Open</option>
            <option value="InProcess">In process</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="from" className="text-slate-400 text-sm mb-2">
            From:
          </label>
          <input
            id="from"
            name="from"
            type="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date"
            value={filter?.from}
            onChange={handleFilterChange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="to" className="text-slate-400 text-sm mb-2">
            To:
          </label>
          <input
            id="to"
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
        className="w-full my-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={clearFilter}
      >
        Clear
      </button>
    </div>
  );
};

export default FormFilter;
