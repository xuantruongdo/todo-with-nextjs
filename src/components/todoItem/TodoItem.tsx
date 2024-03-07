"use client";

import { ITodo } from "@/types/todo.interface";
import FormUpdate from "../form/FormUpdate";
import Modal from "../modal/Modal";
import { useState } from "react";
import { checkValidDeadline } from "@/helpers/checkValidDeadline";
import { produce } from "immer";
import { useDispatch } from "react-redux";
import {
  doDeleteTodoAction,
  doUpdateTodoAction,
} from "@/lib/features/todo/todoSlice";
import FormDelete from "../form/FormDelete";

interface IProps {
  todo: ITodo;
  todos: ITodo[];
  setTodos: any;
}

const TodoItem = (props: IProps) => {
  const { todo, todos, setTodos } = props;
  const [todoInfo, setTodoInfo] = useState<ITodo | any>(todo);
  const dispatch = useDispatch();

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
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev: ITodo[]) => prev.filter((todo: ITodo) => todo.id !== id));
    dispatch(doDeleteTodoAction(id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodoInfo((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
        <Modal
          title="Update Todo"
          content={
            <FormUpdate
              todoInfo={todoInfo}
              handleInputChange={handleInputChange}
            />
          }
          submitBtn="Edit"
          closeBtn="Cancel"
          confirmAction={handleSaveTodo}
        />

        <Modal
          title="Delete Todo"
          content={<FormDelete />}
          submitBtn="Delete"
          closeBtn="Cancel"
          confirmAction={() => handleDeleteTodo(todo.id)}
        />
      </div>
    </div>
  );
};

export default TodoItem;
