"use client";

import useModal from "@/hooks/useModal";
import { IProject } from "@/types/project.interface";
import axios from "@/config/axios-customize";
import ProjectItem from "../projectItem/ProjectItem";
import { useEffect, useState } from "react";
import { IResponse } from "@/types/response.interface";
import FormAddProject from "../form/FormAddProject";
import Modal from "../modal/Modal";

const Sidebar = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const { isOpen, openModal, closeModal } = useModal();
  const fetchProjects = async () => {
    try {
      const res: IResponse<IProject[]> = await axios.get(`/api/projects`);
      if (res && res.data) {
        setProjects(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-screen w-64 bg-ivory text-gray-800 flex flex-col overflow-y-auto p-4 border-r"
      style={{ paddingTop: 100 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold mb-4">Projects</h3>
        <button
          type="button"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={openModal}
        >
          Create
        </button>
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <FormAddProject closeModal={closeModal} setProjects={setProjects} />
      </Modal>
      <ul className="space-y-2">
        {projects?.length > 0 ? (
          projects?.map((project: IProject) => (
            <ProjectItem
              key={project?.id}
              project={project}
              setProjects={setProjects}
            />
          ))
        ) : (
          <p>No data...</p>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
