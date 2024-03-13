"use client";
import { IAssignee } from "@/types/assignee.interface";
import { ITask, IUpdateTask } from "@/types/task.interface";
import { IUser } from "@/types/user.interface";
import axios from "@/config/axios-customize";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { notifyError, notifySuccess } from "@/lib/notify";

type IProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

type SelectItemType = {
  label: string;
  value: number;
};
const UpdateTaskPage = (props: IProps) => {
  const taskId = props.params.id;
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [task, setTask] = useState<ITask | null>(null);
  const [users, setUsers] = useState<IUser[]>();
  const [defaultAssignees, setDefaultAssignees] = useState<any>([]);
  const router = useRouter();

  const fetchTaskById = async () => {
    try {
      const { data } = await axios.get<ITask>(`/api/tasks/${taskId}`);
      setTask(data);
      setDefaultAssignees(
        data.assignees?.map((u: IAssignee) => {
          return {
            label: u.user.fullName,
            value: u.user.id,
          };
        })
      );

      setSelectedIds(data.assignees?.map((u: IAssignee) => u?.user.id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get<IUser[]>(`/api/users`);
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTaskById();
  }, [taskId]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTask((prevData: ITask | any) => ({ ...prevData, [name]: value }));
  };

  const handleChange = (value: any) => {
    setDefaultAssignees(
      value.map((option: SelectItemType) => {
        return {
          value: Number(option.value),
          label: option.label,
        };
      })
    );
    setSelectedIds(value.map((option: SelectItemType) => option.value));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updateTaskData: IUpdateTask | any = {
      name: task?.name,
      status: task?.status,
      deadline: task?.deadline,
      assigneeIds: selectedIds,
    };
    try {
      const { data } = await axios.patch<ITask>(
        `/api/tasks/${taskId}`,
        updateTaskData
      );
      router.push(`/tasks/${taskId}`);
      notifySuccess("Updated task successfully");
    } catch (err) {
      notifyError(err as string);
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
