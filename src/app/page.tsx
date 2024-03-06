"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Draft, produce } from "immer";
import Modal from "@/components/modal/Modal";
import { ITodo } from "@/types/todo.interface";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useRouter } from "next/navigation";
import { checkValidDeadline } from "@/helpers/checkValidDeadline";
import { doAddTodoAction, doDeleteTodoAction, doUpdateTodoAction } from "@/lib/features/todo/todoSlice";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [assignment, setAssignment] = useState<string>("");
  const [todoInfo, setTodoInfo] = useState<ITodo | null>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.userReducer);
  const todos = useAppSelector((state) => state.todoReducer);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTodoInfo(null);
  };

  const handleAddTodo = () => {
    if (!name || !date || !assignment) {
      alert("Please fill in all information completely");
      return;
    }

    const selectDate = new Date(date);
    const currentDate = new Date();

    if (!checkValidDeadline(selectDate, currentDate)) {
      alert("The date is on or before the current date and time.");
      return;
    }
    

    const newTodo = {
      id: uuidv4(),
      name: name,
      status: "Open",
      deadline: date,
      assignment: assignment,
    };
    dispatch(doAddTodoAction(newTodo));
    setName("");
    setDate("");
    setAssignment("");
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(doDeleteTodoAction(id))
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
    if (!todoInfo?.name || !todoInfo?.status || !todoInfo?.deadline || !todoInfo?.assignment) {
      alert("Please fill in all information completely");
      return;
    }

    const selectDate = new Date(todoInfo?.deadline);
    const currentDate = new Date();

    if (!checkValidDeadline(selectDate, currentDate)) {
      alert("The date is on or before the current date and time.");
      return;
    }
    const updateData = {
      name: todoInfo?.name,
      status: todoInfo?.status,
      deadline: todoInfo?.deadline,
      assignment: todoInfo?.assignment
    };

    const nextState = produce(todos, draft => {
      const todoIndex = draft.findIndex((todo: ITodo) => todo.id === todoInfo?.id);
    
      if (todoIndex !== -1) {
        draft[todoIndex] = { ...draft[todoIndex], ...updateData };
      }
    });
    
    dispatch(doUpdateTodoAction(nextState));
    
    closeModal();
  };

  return (
    <div className="container flex justify-center h-screen">
      <div className="mt-5 w-1/2">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-semibold">Todo List</h2>
          <button
            className="my-5 focus:outline-none text-gray-900 bg-white border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
            onClick={() => router.push("list")}
          >
            Users List
          </button>
        </div>
        <div>
          <div className="my-5">
            <label htmlFor="name" className="text-slate-400 text-sm">
              Task name:
            </label>
            <input
              id="name"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="New task..."
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label htmlFor="deadline" className="text-slate-400 text-sm">
              Deadline:
            </label>
            <input
              id="deadline"
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label htmlFor="assignment" className="text-slate-400 text-sm">
              Assignment:
            </label>
            <select
              name="assignment"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={assignment}
              onChange={(e) => setAssignment(e.target.value)}
            >
              <option value="">Choose</option>

              {users?.map((user, index) => (
                <option value={user.email} key={index}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

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
                className="mt-3 flex items-center justify-between shadow-lg px-5 py-2 transition-all hover:bg-emerald-200"
                key={todo.id}
              >
                <div className="flex gap-5 items-center justify-between">
                  <h4 className="font-medium" style={{width: 150}}>{todo.name}</h4>
                  <h3 className={`text-xs ${todo.status}`} style={{width: 50}}>{todo.status}</h3>
                  <div className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 flex items-center justify-center">
                    {todo.assignment.toLocaleUpperCase().charAt(0)}
                  </div>
                  <p className="text-slate-400 text-sm">{todo.deadline}</p>
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
