"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Draft, produce } from "immer";
import Modal from "@/components/modal/ModalUpdate";
import { ITodo } from "@/types/todo.interface";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useRouter } from "next/navigation";
import { checkValidDeadline } from "@/helpers/checkValidDeadline";
import ModalAdd from "@/components/modal/ModalAdd";
import { IFilter } from "@/types/filter.interface";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [assignment, setAssignment] = useState<string>("");
  const [todoInfo, setTodoInfo] = useState<ITodo | null>();
  const [filter, setFilter] = useState<IFilter | any>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const globalTodos = useAppSelector((state) => state.todoReducer);
  const [todos, setTodos] = useState<ITodo[]>(globalTodos);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const openModalUpdate = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTodoInfo(null);
  };

  const closeModalAdd = () => {
    setIsModalAddOpen(false);
  };

  const handleAddTodo = () => {
    console.log(date);
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

    setTodos([newTodo, ...todos]);
    setIsModalAddOpen(false);
    setName("");
    setDate("");
    setAssignment("");
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo: ITodo) => todo.id !== id));
  };

  const handleOpenModal = (id: string) => {
    openModalUpdate();
    setTodoInfo(() => todos.find((todo: ITodo) => todo.id === id));
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;

    const nextState = produce((draft) => {
      draft[name] = value;
    });

    setTodoInfo(nextState);
  };

  const handleFilterChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFilter((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveTodo = () => {
    if (
      !todoInfo?.name ||
      !todoInfo?.status ||
      !todoInfo?.deadline ||
      !todoInfo?.assignment
    ) {
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
      assignment: todoInfo?.assignment,
    };

    const nextState = produce(todos, (draft) => {
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

  const handleFilter = () => {
    const { nameFilter, assignmentFilter } = filter;
    if (!nameFilter || !assignmentFilter) {
      alert("Please fill in all information completely");
      return;
    }
    setTodos(
      globalTodos.filter(
        (todo) =>
          (nameFilter && todo.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
          (assignmentFilter && todo.assignment.toLowerCase().includes(assignmentFilter.toLowerCase()))
      )
    );
  };

  const handlePaginate = (type: string) => {
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
      setTotalPage(Math.ceil(globalTodos.length / limit));
      setTodos(globalTodos.slice(startIndex, endIndex));
    }
  }, [page]);

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

        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => setIsModalAddOpen(true)}
        >
          Add Todo
        </button>

        <div className="grid grid-cols-2 gap-4">
          <div className="my-5">
            <label htmlFor="nameFilter" className="text-slate-400 text-sm">
              Task name:
            </label>
            <input
              name="nameFilter"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="New task..."
              required
              value={filter?.nameFilter}
              onChange={handleFilterChange}
            />
          </div>
          <div className="my-5">
            <label
              htmlFor="assignmentFilter"
              className="text-slate-400 text-sm"
            >
              Assignment:
            </label>
            <input
              name="assignmentFilter"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="New task..."
              required
              value={filter?.assignmentFilter}
              onChange={handleFilterChange}
            />
          </div>
        </div>
        <button
          type="button"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleFilter}
        >
          Search
        </button>

        <ModalAdd
          isModalAddOpen={isModalAddOpen}
          closeModalAdd={closeModalAdd}
          handleAddTodo={handleAddTodo}
          name={name}
          setName={setName}
          date={date}
          setDate={setDate}
          assignment={assignment}
          setAssignment={setAssignment}
        />

        <div className="mt-4">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <div
                className="mt-3 flex items-center justify-between shadow-lg px-5 py-2 transition-all hover:bg-emerald-200"
                key={todo.id}
              >
                <div className="flex gap-5 items-center justify-between">
                  <h4 className="font-medium" style={{ width: 150 }}>
                    {todo.name}
                  </h4>
                  <h3
                    className={`text-xs ${todo.status}`}
                    style={{ width: 50 }}
                  >
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
          <div className="flex items-center justify-center mt-10">
            <button
              className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => handlePaginate("previous")}
              disabled={page === 1}
            >
              Previous
            </button>

            <button
              className="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => handlePaginate("next")}
              disabled={page === totalPage}
            >
              Next
            </button>
          </div>
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
