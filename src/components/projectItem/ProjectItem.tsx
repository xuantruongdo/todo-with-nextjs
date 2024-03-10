"use client";

import useModal from "@/hooks/useModal";
import { IProject } from "@/types/project.interface";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import FormDeleteProject from "../form/FormDeleteProject";
import axios from "axios";
import { useRouter } from "next/navigation";
import Modal from "../modal/Modal";

interface IProps {
  project: IProject;
  fetchProjects: () => void;
}
const ProjectItem = (props: IProps) => {
  const { project, fetchProjects } = props;
  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();
  const handleDeleteProject = async () => {
    const res = await axios.delete(`/api/projects/${project?.id}`);
    if (res) {
      fetchProjects();
      router.push("/");
      closeModal();
    }
  };
  return (
    <Link href={`/${project.id}`} key={project.id}>
      <li className="flex items-center justify-between hover:bg-gray-200 rounded-md p-2 cursor-pointer">
        <p className="text-base font-medium">{project.name}</p>
        <button onClick={openModal}>
          <MdDelete color="red" />
        </button>
      </li>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <FormDeleteProject
          handleDeleteProject={handleDeleteProject}
          closeModal={closeModal}
        />
      </Modal>
    </Link>
  );
};

export default ProjectItem;
