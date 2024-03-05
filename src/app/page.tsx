"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "./components/modal/Modal";
import { Draft, produce } from "immer";

export default function Home() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [name, setName] = useState<string>("");
  const [todoInfo, setTodoInfo] = useState<ITodo | undefined>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTodoInfo(undefined);
  };

  const handleAddTodo = () => {
    if (!name) return;
    const newTodo = {
      id: uuidv4(),
      name: name,
      status: "Open",
    };
    setTodos(() => [newTodo, ...todos]);
    setName("");
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleOpenModal = (id: string) => {
    openModal();
    setTodoInfo(() => todos.find((todo: ITodo) => todo.id === id));
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;

    const nextState = produce((draft) => {
      draft[name] = value;
    });

    setTodoInfo(nextState);
  };

  const handleSaveTodo = () => {
    if (!todoInfo?.name || !todoInfo?.status) return;
    const updateData = {
      name: todoInfo?.name,
      status: todoInfo?.status,
    };

    const nextState = produce((draft) => {
      const todoIndex = draft.findIndex(
        (todo: ITodo) => todo.id === todoInfo?.id
      );
      if (todoIndex !== -1) {
        draft[todoIndex] = { ...draft[todoIndex], ...updateData };
      }
    });

    setTodos(nextState);
    closeModal();
  };

  return (
    <div className="container flex justify-center h-screen">
      <div className="mt-5 w-1/2">
        <h2 className="text-2xl font-semibold">Todo List</h2>
        <div className="flex gap-5 justify-center items-center">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="New task..."
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTodo();
              }
            }}
          />
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={handleAddTodo}
          >
            Add
          </button>
        </div>

        <div className="mt-4">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <div
                className="mt-3 flex items-center justify-between shadow-lg px-5 py-2"
                key={todo.id}
              >
                <div className="flex gap-5 items-center">
                  <h4 className="font-medium">{todo.name}</h4>
                  <h3 className={`text-xs ${todo.status}`}>{todo.status}</h3>
                </div>
                <div className="flex">
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={() => handleOpenModal(todo.id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h2 className="mt-5 text-center">No data...</h2>
          )}
        </div>

        <Modal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          todoInfo={todoInfo!}
          handleSaveTodo={handleSaveTodo}
          handleInputChange={handleInputChange}
        />
      </div>
    </div>
  );
}
