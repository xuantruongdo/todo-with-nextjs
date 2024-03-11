"use client";
import { IResponse } from "@/types/response.interface";
import { ITask, IUpdateTask } from "@/types/task.interface";
import { IUser } from "@/types/user.interface";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Select from "react-select";

type IProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
const UpdateTaskPage = (props: IProps) => {
  const taskId = props.params.id;
  const [selectedIds, setSelectedIds] = useState([]);
  const [task, setTask] = useState<ITask>();
  const [users, setUsers] = useState<IUser[]>();
  const [defaultAssignees, setDefaultAssignees] = useState<any>([]);
  const router = useRouter();

  const fetchTaskById = async () => {
    const res: IResponse<any> = await axios.get(`/api/tasks/${taskId}`);
    if (res && res.data) {
      setTask(res.data);
      setDefaultAssignees(
        res.data?.assignees?.map((u: any) => {
          return {
            label: u.user.fullName,
            value: u.user.id,
          };
        })
      );

      setSelectedIds(
        res.data?.assignees?.map((u: any) => u?.user.id)
      );
    }
  };

  const fetchUsers = async () => {
    const res: IResponse<IUser[]> = await axios.get(`/api/users`);
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

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setTask((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleChange = (value: any) => {
    setDefaultAssignees(
      value.map((option: any) => {
        return {
          value: Number(option.value),
          label: option.label,
        };
      })
    );
    setSelectedIds(value.map((option: any) => Number(option.value)));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: IUpdateTask | any = {
      name: task?.name,
      status: task?.status,
      deadline: task?.deadline,
      assigneeIds: selectedIds,
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
              <Select
                isMulti
                onChange={handleChange}
                options={users?.map((user) => {
                  return {
                    label: user.fullName,
                    value: user.id,
                  };
                })}
                value={defaultAssignees}
              />
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
