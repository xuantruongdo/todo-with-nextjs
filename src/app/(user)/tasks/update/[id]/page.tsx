"use client";
import { ITask } from "@/types/task.interface";
import { IUser } from "@/types/user.interface";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type IProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
const UpdateTaskPage = (props: IProps) => {
  const taskId = props.params.id;

  const [task, setTask] = useState<ITask>();
  const [users, setUsers] = useState<IUser[]>();
  const router = useRouter();

  const fetchTaskById = async () => {
    const res = await axios.get(`/api/tasks/${taskId}`);
    if (res && res.data) {
      setTask(res.data);
    }
  };

  const fetchUsers = async () => {
    const res = await axios.get(`/api/users`);
    if (res && res.data) {
      setUsers(res.data);
    }
  };

  useEffect(() => {
    fetchTaskById();
  }, [taskId]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setTask((prevData: any) => ({ ...prevData, [name]: value }));
  };

  

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      name: task?.name,
      status: task?.status,
      deadline: task?.deadline,
      userId: task?.userId,
    };
    const res = await axios.patch(`/api/tasks/${taskId}`, data);
    if (res && res.data) {
      router.push(`/tasks/${taskId}`);
    }
  };

  return (
    <div className="mx-auto sm:px-10 md:px-8 lg:px-14 xl:px-20 mt-40">
      <div className="bg-gray-100 shadow-md rounded-md p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div className="w-1/2 mr-4">
                <label
                  htmlFor="name"
                  className="text-gray-700 font-bold mb-2 block"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-2 border rounded"
                  value={task?.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="date"
                  className="text-gray-700 font-bold mb-2 block"
                >
                  Date:
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  className="w-full p-2 border rounded"
                  value={moment(task?.deadline).format("YYYY-MM-DD")}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="w-1/2 mr-4">
              <label
                htmlFor="status"
                className="text-gray-700 font-bold mb-2 block"
              >
                Status:
              </label>
              <select
                id="status"
                name="status"
                className="w-full p-2 border rounded"
                value={task?.status}
                onChange={handleInputChange}
                required
              >
                <option value="Open">Open</option>
                <option value="InProcess">In process</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div className="w-1/2">
              <label
                htmlFor="userId"
                className="text-gray-700 font-bold mb-2 block"
              >
                Assignee:
              </label>
              <select
                id="userId"
                name="userId"
                className="w-full p-2 border rounded"
                value={task?.userId}
                onChange={handleInputChange}
                required
              >
                {users?.map((user: IUser) => (
                  <option value={user?.id} key={user?.id}>
                    {user?.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTaskPage;
