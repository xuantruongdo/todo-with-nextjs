"use client";

import { ITodo } from "@/types/todo.interface";
import moment from "moment";
import Modal from "../modal/Modal";
import FormUpdate from "../form/FormUpdate";
import { useState } from "react";
import { checkValidDeadline } from "@/helpers/checkValidDeadline";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IAssignee } from "@/types/assignee.interface";
import FormDelete from "../form/FormDelete";

interface IProps {
  todo: ITodo;
  assignees: IAssignee[];
  fetchTodos: any;
}
const Todo = (props: IProps) => {
  const { todo, assignees, fetchTodos } = props;
  const [todoInfo, setTodoInfo] = useState<ITodo>(todo);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodoInfo((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSaveTodo = async () => {
    if (
      !todoInfo?.name ||
      !todoInfo?.status ||
      !todoInfo?.deadline ||
      !todoInfo?.assigneeId
    ) {
      alert("Please fill in all information completely");
      return;
    }

    const selectedDate = new Date(todoInfo?.deadline);
    const currentDate = new Date();

    if (!checkValidDeadline(selectedDate, currentDate)) {
      alert("The date is on or before the current date and time.");
      return;
    }
    const updateData = {
      name: todoInfo?.name,
      status: todoInfo?.status,
      deadline: new Date(todoInfo?.deadline),
      assigneeId: Number(todoInfo?.assigneeId),
    };

    const res = await axios.patch(`/api/todos/${todoInfo?.id}`, updateData);
    if (res && res.data) {
      router.refresh();
      fetchTodos();
    } else {
      alert("error");
    }
  };

  const handleDeleteTodo = async (id: number) => {
    const res = await axios.delete(`/api/todos/${id}`);
    if (res && res.data) {
      router.refresh();
      fetchTodos();
    }
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {todo?.id}
      </th>

      <td className="px-6 py-4">{todo?.name}</td>
      <td className={`px-6 py-4 ${todo?.status}`}>{todo?.status}</td>
      <td className="px-6 py-4">
        {moment(todo?.deadline).format("DD/MM/YYYY")}
      </td>

      <td className="px-6 py-4">{todo?.assignee.name}</td>
      <td>
        <Modal
          title="Update Todo"
          content={
            <FormUpdate
              todoInfo={todoInfo}
              handleInputChange={handleInputChange}
              assignees={assignees}
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
          confirmAction={() => handleDeleteTodo(todoInfo.id)}
        />
      </td>
    </tr>
  );
};

export default Todo;
