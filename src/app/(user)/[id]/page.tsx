"use client";

import FormAddTask from "@/components/form/FormAddTask";
import Modal from "@/components/modal/Modal";
import useModal from "@/hooks/useModal";
import { IProject } from "@/types/project.interface";
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
const DetailProjectPage = (props: IProps) => {
  const projectId = props.params.id;
  const [project, setProject] = useState<IProject>();
  const { isOpen, openModal, closeModal } = useModal();

  const fetchProjectById = async () => {
    const res: IResponse<IProject> = await axios.get(
      `/api/projects/${projectId}`
    );
    if (res && res.data) {
      setProject(res.data);
    }
  };

  useEffect(() => {
    fetchProjectById();
  }, [projectId]);

  return (
    <div className="w-full lg:w-[calc(100%-300px)] mx-auto pt-20">
      <div className="flex items-center justify-between my-4">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          {project?.name}
        </h2>
        <div></div>
      </div>
      <button
        className="my-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        onClick={openModal}
      >
        Add Task
      </button>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <FormAddTask
          projectId={Number(projectId)}
          fetchProjectById={fetchProjectById}
          closeModal={closeModal}
        />
      </Modal>
      <div className="flex flex-col space-y-4">
        {project?.tasks.length! > 0 ? (
          project?.tasks.map((task: ITask) => (
            <Link href={`/tasks/${task.id}`} key={task.id}>
              <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-between hover:bg-gray-100">
                <h3 className="text-lg font-semibold mb-2">{task.name}</h3>
                <p>{moment(task?.deadline).format("DD/MM/YYYY")}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No data...</p>
        )}
      </div>
    </div>
  );
};

export default DetailProjectPage;
