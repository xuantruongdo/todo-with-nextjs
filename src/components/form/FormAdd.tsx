"use client";

import { useAppSelector } from "@/lib/hook";
import { ITodo } from "@/types/todo.interface";

interface IProps {
  todoInfo: ITodo;
  handleInputChange: (e: React.ChangeEvent<any>) => void;
}
const FormAdd = (props: IProps) => {
  const { todoInfo, handleInputChange } = props;
  const users = useAppSelector((state) => state.userReducer);

  return (
    <>
      <div className="my-3">
        <label htmlFor="name" className="text-slate-400 text-sm">
          Task name:
        </label>
        <input
          type="text"
          name="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="New task..."
          required
          value={todoInfo?.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="my-3">
        <label htmlFor="deadline" className="text-slate-400 text-sm">
          Deadline:
        </label>
        <input
          name="deadline"
          type="date"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Select date"
          value={todoInfo?.deadline}
          onChange={handleInputChange}
        />
      </div>

      <div className="my-3">
        <label htmlFor="assignment" className="text-slate-400 text-sm">
          Assignment:
        </label>
        <select
          name="assignment"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={todoInfo?.assignment}
          onChange={handleInputChange}
        >
          <option value={""}>Choose</option>
          {users?.map((user, index) => (
            <option value={user.email} key={index}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default FormAdd;
