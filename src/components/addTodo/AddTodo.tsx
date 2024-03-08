"use client";

import { SyntheticEvent, useState } from "react";
import FormAdd from "../form/FormAdd";
import Modal from "../modal/Modal";
import { ITodo } from "@/types/todo.interface";
import { IAssignee } from "@/types/assignee.interface";
import axios from "axios";
import { useRouter } from "next/navigation";
import { checkValidDeadline } from "@/helpers/checkValidDeadline";
import { IResponse } from "@/types/response.interface";

interface IProps {
  assignees: IAssignee[];
  fetchTodos: () => void;
}
const AddTodo = (props: IProps) => {
  const { assignees, fetchTodos } = props;
  const router = useRouter();
  const [todoInfo, setTodoInfo] = useState({
    name: "",
    deadline: "",
    assigneeId: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodoInfo((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddTodo = async () => {
    try {
      if (!todoInfo?.name || !todoInfo?.deadline || !todoInfo?.assigneeId) {
        alert("Fill in all information");
        return;
      }

      const selectedDate = new Date(todoInfo?.deadline);
      const currentDate = new Date();

      if (!checkValidDeadline(selectedDate, currentDate)) {
        alert("The date is on or before the current date and time.");
        return;
      }

      const data = {
        name: todoInfo?.name,
        deadline: new Date(todoInfo?.deadline),
        assigneeId: Number(todoInfo?.assigneeId),
      };

      const res: IResponse<ITodo> = await axios.post("/api/todos", data);
      if (res && res.data) {
        fetchTodos();
        router.refresh();
        setTodoInfo({
          name: "",
          deadline: "",
          assigneeId: "",
        });
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <Modal
      title="Add Todo"
      content={
        <FormAdd
          todoInfo={todoInfo!}
          handleInputChange={handleInputChange}
          assignees={assignees}
        />
      }
      submitBtn="Add"
      closeBtn="Cancel"
      confirmAction={handleAddTodo}
    />
  );
};

export default AddTodo;
