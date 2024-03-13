"use client";

import FormAddTask from "@/components/form/FormAddTask";
import FormFilter from "@/components/form/FormFilter";
import Modal from "@/components/modal/Modal";
import Pagination from "@/components/pagination/Pagination";
import { initFilter } from "@/constants/constant";
import useModal from "@/hooks/useModal";
import { IProject } from "@/types/project.interface";
import { IResponseTask, ITask } from "@/types/task.interface";
import axios from "@/config/axios-customize";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";

type IProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
const DetailProjectPage = (props: IProps) => {
  const projectId = props.params.id;
  const [project, setProject] = useState<IProject | null>(null);
  const [tasks, setTasks] = useState<ITask[] | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const { isOpen, openModal, closeModal } = useModal();
  const [filter, setFilter] = useState(initFilter);

  const fetchProjectById = async () => {
    try {
      const { data } = await axios.get<IProject>(`/api/projects/${projectId}`);
      setProject(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTasksByProjectId = async () => {
    try {
      const { data } = await axios.get<IResponseTask>(
        `/api/tasks/projectId/${projectId}`,
        {
          params: {
            page,
            ...filter,
          },
        }
      );

      setTasks(data.tasks);
      setTotalPage(data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjectById();
    fetchTasksByProjectId();
  }, [projectId, filter]);

  useEffect(() => {
    fetchTasksByProjectId();
  }, [page]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFilter((prevData) => ({ ...prevData, [name]: value }));
  };

  const clearFilter = () => {
    setFilter(initFilter);
  };

  return (
    <div className="w-full lg:w-[calc(100%-300px)] mx-auto pt-20">
      <div className="flex items-center justify-between my-4">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          {project?.name}
        </h2>
      </div>
      <button
        className="my-3 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={openModal}
      >
        Add Task
      </button>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <FormAddTask
          projectId={Number(projectId)}
          setTasks={setTasks}
          closeModal={closeModal}
        />
      </Modal>
      <FormFilter
        filter={filter}
        handleFilterChange={handleFilterChange}
        clearFilter={clearFilter}
      />

      <div className="flex flex-col space-y-4">
        {tasks?.length! > 0 ? (
          <>
            {tasks?.map((task: ITask) => (
              <Link href={`/tasks/${task.id}`} key={task.id}>
                <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-between hover:bg-gray-100">
                  <h3 className="text-lg font-semibold mb-2">{task.name}</h3>
                  <p>{moment(task?.deadline).format("DD/MM/YYYY")}</p>
                </div>
              </Link>
            ))}
            <Pagination page={page} setPage={setPage} totalPage={totalPage} />
          </>
        ) : (
          <p>No data...</p>
        )}
      </div>
    </div>
  );
};

export default DetailProjectPage;
