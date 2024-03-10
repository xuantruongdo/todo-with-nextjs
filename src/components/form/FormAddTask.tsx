"use client";

import { IUser } from "@/types/user.interface";
import axios from "axios";
import { useEffect, useState } from "react";

interface IProps {
  projectId: number;
  fetchProjectById: () => void;
  closeModal: () => void;
}
const FormAddTask = (props: IProps) => {
  const { projectId, fetchProjectById, closeModal } = props;

  const [taskName, setTaskName] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [assigneeId, setAssigneeId] = useState("");

  const [users, setUsers] = useState<IUser[]>([]);

  const fetchUsers = async () => {
    const res = await axios.get(`/api/users`);
    if (res && res.data) {
      setUsers(res.data);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      name: taskName,
      deadline: new Date(deadline),
      userId: Number(assigneeId),
      projectId: projectId
    };
    const res = await axios.post("/api/tasks", data);
    if (res && res.data) {
      fetchProjectById();
      setTaskName("");
      setDeadline("");
      setAssigneeId("");
      closeModal();
    }
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
          <select
            id="user"
            className="w-full p-2 border rounded-md"
            value={assigneeId}
            onChange={(e) => setAssigneeId(e.target.value)}
            required
          >
            <option value="" disabled>
              Choose a assignee
            </option>
            {users?.map((user: IUser) => (
              <option key={user.id} value={user.id}>
                {user.fullName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAddTask;
