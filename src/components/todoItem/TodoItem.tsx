"use client";

import { ITodo } from "@/types/todo.interface";

interface IProps {
  todo: ITodo;
  handleOpenModalUpdate: (id: string) => void;
  handleOpenModalDelete: (id: string) => void;
}

const TodoItem = (props: IProps) => {
  const { todo, handleOpenModalUpdate, handleOpenModalDelete } = props;

  return (
    <div
      className="mt-3 flex items-center justify-between shadow-lg px-5 py-2 transition-all hover:bg-emerald-200"
      key={todo.id}
    >
      <div className="flex gap-5 items-center justify-between">
        <h4 className="font-medium" style={{ width: 150 }}>
          {todo.name}
        </h4>
        <h3 className={`text-xs ${todo.status}`} style={{ width: 50 }}>
          {todo.status}
        </h3>
        <div className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 flex items-center justify-center">
          {todo.assignment.toLocaleUpperCase().charAt(0)}
        </div>
        <p className="text-slate-400 text-sm">{todo.deadline}</p>
      </div>
      <div className="flex">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => {
            handleOpenModalUpdate(todo.id);
          }}
        >
          Edit
        </button>
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={() => handleOpenModalDelete(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
