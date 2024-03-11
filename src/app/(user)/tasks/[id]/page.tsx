"use client";

import FormUpdateCheckList from "@/components/form/FormUpdateCheckList";
import Modal from "@/components/modal/Modal";
import TaskSkeleton from "@/components/skeleton/TaskSkeleton";
import useModal from "@/hooks/useModal";
import { ICheckList, ICreateCheckList } from "@/types/checklist.interface";
import { IResponse } from "@/types/response.interface";
import { ITask } from "@/types/task.interface";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";

type IProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
const DetailTaskPage = (props: IProps) => {
  const taskId = props.params.id;
  const { isOpen, openModal, closeModal } = useModal();

  const [task, setTask] = useState<ITask>();
  const [checklist, setChecklist] = useState<ICheckList>();
  const [title, setTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchTaskById = async () => {
    setIsLoading(true);
    const res: IResponse<ITask> = await axios.get(`/api/tasks/${taskId}`);
    setIsLoading(false);
    if (res && res.data) {
      setTask(res.data);
    }
  };

  useEffect(() => {
    fetchTaskById();
  }, [taskId]);

  const handleAddCheckList = async () => {
    const data: ICreateCheckList = {
      title: title,
      taskId: Number(taskId),
    };
    
    const res: IResponse<ICheckList> = await axios.post("/api/checklists", data);
    
    if (res && res.data) {
      fetchTaskById();
      setTitle("");
    }
  };

  if(isLoading) return <TaskSkeleton/>

  return (
    <div className="mx-auto sm:px-10 md:px-8 lg:px-14 xl:px-20 mt-40">
      <div className="bg-gray-100 shadow-md rounded-md p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            {task?.name}
          </h2>
          <div>
            <Link
              href={`/tasks/update/${task?.id}`}
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Update
            </Link>

            <Link
              href={`/tasks/delete/${task?.id}?projectId=${task?.projectId}`}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Delete
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <div className="text-gray-700 font-bold mb-2">Deadline:</div>
            <div className="text-gray-800">
              {moment(task?.deadline).format("DD/MM/YYYY")}
            </div>
          </div>
          <div className="mb-4">
            <div className="text-gray-700 font-bold mb-2">Status:</div>
            <div className={`text-gray-800 ${task?.status} font-semibold`}>
              {task?.status}
            </div>
          </div>
          <div className="mb-4">
            <div className="text-gray-700 font-bold mb-2">Asignee:</div>
            {task?.assignees.map((assignee) => (
              <div className="text-gray-800" key={assignee?.id}>
                {assignee?.user.fullName}
              </div>
            ))}
          </div>

          <div className="mb-4">
            <div className="text-gray-700 font-bold mb-2">Created by:</div>
            <div className="text-gray-800">{task?.createdBy.fullName}</div>
          </div>

          <div className="mb-4">
            <div className="text-gray-700 font-bold mb-2">Checklists:</div>
            <div className="mb-4">
              <input
                type="text"
                className="p-2 border rounded mr-2"
                placeholder="New Checklist Item"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={handleAddCheckList}
              >
                Add
              </button>
            </div>
            {task?.checklists.map((checklist: ICheckList) => (
              <div key={checklist?.id} className="flex items-center mb-2">
                <div className="mr-2">{checklist.checked ? "✔" : "○"}</div>
                <p
                  className="text-gray-800 hover:text-blue-500 cursor-pointer"
                  onClick={() => {
                    openModal();
                    setChecklist(checklist);
                  }}
                >
                  {checklist.title}
                </p>
              </div>
            ))}
            <Modal isOpen={isOpen} closeModal={closeModal}>
              <FormUpdateCheckList
                checklist={checklist!}
                fetchTaskById={fetchTaskById}
                closeModal={closeModal}
              />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTaskPage;
