"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { produce } from "immer";
import { ITodo } from "@/types/todo.interface";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useRouter } from "next/navigation";
import { checkValidDeadline } from "@/helpers/checkValidDeadline";
import {
  doAddTodoAction,
  doDeleteTodoAction,
  doUpdateTodoAction,
} from "@/lib/features/todo/todoSlice";
import Pagination from "@/components/pagination/Pagination";
import TodoItem from "@/components/todoItem/TodoItem";
import useModal from "@/hooks/useModal";
import FormAdd from "@/components/form/FormAdd";
import FormUpdate from "@/components/form/FormUpdate";
import FormDelete from "@/components/form/FormDelete";
import FormFilter from "@/components/form/FormFilter";

export default function Home() {
  const [todoInfo, setTodoInfo] = useState<ITodo | any>();
  const [filter, setFilter] = useState({
    name: "",
    assignment: "",
    from: "",
    to: "",
  });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const globalTodos = useAppSelector((state) => state.todoReducer);
  const [todos, setTodos] = useState<ITodo[]>(globalTodos);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [idDelete, setIdDelete] = useState<string>("");

  
  const handleAddTodo = (): void => {
    const { name, deadline, assignment } = todoInfo;
    if (!name || !deadline || !assignment) {
      alert("Please fill in all information completely");
      return;
    }

    const selectDate = new Date(deadline);
    const currentDate = new Date();

    if (!checkValidDeadline(selectDate, currentDate)) {
      alert("The date is on or before the current date and time.");
      return;
    }

    const data = {
      id: uuidv4(),
      name: name,
      status: "Open",
      deadline: deadline,
      assignment: assignment,
    };

    dispatch(doAddTodoAction(data));
    closeModalAdd();
    setTodoInfo({
      name: "",
      deadline: "",
      assignment: "",
    });
  };

  const handleDeleteTodo = () => {
    setTodos((prev) => prev.filter((todo: ITodo) => todo.id !== idDelete));
    dispatch(doDeleteTodoAction(idDelete));
    closeModalDelete();
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
    dispatch(doUpdateTodoAction({ id: todoInfo?.id, updateData }));

    closeModalUpdate();
  };

  const handleOpenModalUpdate = (id: string) => {
    openModalUpdate();
    setTodoInfo(() => todos.find((todo: ITodo) => todo.id === id));
  };

  const handleOpenModalDelete = (id: string) => {
    openModalDelete();
    setIdDelete(id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodoInfo((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFilterChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;

    const nextState = produce((draft) => {
      draft[name] = value;
    });

    setFilter(nextState);
  };

  const handleFilter = () => {
    const { name, assignment, from, to } = filter;
    const fromDate = new Date(from) || new Date();
    const toDate = new Date(to) || new Date();

    if (!checkValidDeadline(toDate, fromDate)) {
      alert("The fromDate is on or before the toDate and time.");
      return;
    }

    const filteredTodos = globalTodos.filter((todo) => {
      const matchName =
        !name || todo.name.toLowerCase().includes(name.toLowerCase());
      const matchAssignment =
        !assignment ||
        todo.assignment.toLowerCase().includes(assignment.toLowerCase());

      const todoDeadline = new Date(todo.deadline);
      const matchDeadline =
        (!from || todoDeadline >= fromDate) && (!to || todoDeadline <= toDate);

      return matchName && matchAssignment && matchDeadline;
    });

    setTodos(filteredTodos);
  };

  const clearFilter = () => {
    setFilter({
      name: "",
      assignment: "",
      from: "",
      to: "",
    });
  };

  useEffect(() => {
    handleFilter();
  }, [filter]);

  useEffect(() => {
    if (page > 0) {
      const limit = 4;

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      setTotalPage(Math.ceil(globalTodos.length / limit));
      setTodos(globalTodos.slice(startIndex, endIndex));
    }
  }, [page, globalTodos]);

  const {
    modal: modalAdd, openModal: openModalAdd, closeModal: closeModalAdd,} = useModal({
    title: "Add Todo",
    content: (
      <FormAdd todoInfo={todoInfo} handleInputChange={handleInputChange} />
    ),
    submitBtn: "Add",
    closeBtn: "Cancel",
    confirmAction: handleAddTodo,
  });

  const { modal: modalUpdate, openModal: openModalUpdate, closeModal: closeModalUpdate,} = useModal({
    title: "Update Todo",
    content: (
      <FormUpdate todoInfo={todoInfo} handleInputChange={handleInputChange} />
    ),
    submitBtn: "Save",
    closeBtn: "Cancel",
    confirmAction: handleSaveTodo,
  });

  const {modal: modalDelete, openModal: openModalDelete, closeModal: closeModalDelete,} = useModal({
    title: "Delete Todo",
    content: (
      <FormDelete />
    ),
    submitBtn: "Delete",
    closeBtn: "Cancel",
    confirmAction: handleDeleteTodo,
  });

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-4 rounded-md shadow-md min-w-[50%]">
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
          onClick={openModalAdd}
        >
          Add Todo
        </button>

        <FormFilter filter={filter} handleFilterChange={handleFilterChange} clearFilter={clearFilter} />

        <div className="mt-4">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                handleOpenModalUpdate={handleOpenModalUpdate}
                handleOpenModalDelete={handleOpenModalDelete}
              />
            ))
          ) : (
            <h2 className="mt-5 text-center">No data...</h2>
          )}

          <Pagination page={page} setPage={setPage} totalPage={totalPage} />
        </div>

        {modalAdd}
        {modalUpdate}
        {modalDelete}
      </div>
    </div>
  );
}
