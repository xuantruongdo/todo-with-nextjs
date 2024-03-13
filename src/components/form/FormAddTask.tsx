"use client";

import { ICreateTask, ITask } from "@/types/task.interface";
import { IUser } from "@/types/user.interface";
import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "@/config/axios-customize";
import { notifyError, notifySuccess } from "@/lib/notify";

interface IProps {
  projectId: number;
  setTasks: (tasks: any) => void;
  closeModal: () => void;
}
const FormAddTask = (props: IProps) => {
  const { projectId, setTasks, closeModal } = props;
  const [taskName, setTaskName] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [users, setUsers] = useState<IUser[]>([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get<IUser[]>("/api/users");
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const taskData: ICreateTask = {
      name: taskName,
      deadline: new Date(deadline),
      assigneeIds: selectedIds,
      projectId: projectId,
    };

    setIsLoading(true);
    try {
      const { data } = await axios.post<ITask>("/api/tasks", taskData);
      setTasks((prevTasks: ITask[]) => [data, ...prevTasks]);
      setTaskName("");
      setDeadline("");
      setSelectedIds([]);
      closeModal();
      notifySuccess("Created task successfully");
    } catch (err) {
      notifyError(err as string);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (value: any) => {
    setSelectedIds(value.map((option: any) => Number(option.value)));
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
        Create Task
      </h2>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label
            htmlFor="taskName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Task Name
          </label>
          <input
            type="text"
            id="taskName"
            className="w-full p-2 border rounded-md"
            placeholder="New task..."
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="deadline"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            className="w-full p-2 border rounded-md"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="user"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Assign to User
          </label>
          <Select
            isMulti
            onChange={handleChange}
            options={users.map((user) => {
              return {
                label: user.fullName,
                value: user.id,
              };
            })}
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center">
            <button
              type="button"
              className="w-full bg-blue-200 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none opacity-50"
            >
              Processing
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Create Task
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default FormAddTask;
