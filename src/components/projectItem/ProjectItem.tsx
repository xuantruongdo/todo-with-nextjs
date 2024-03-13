"use client";

import useModal from "@/hooks/useModal";
import { IProject } from "@/types/project.interface";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import FormDeleteProject from "../form/FormDeleteProject";
import axios from "@/config/axios-customize";
import { useRouter } from "next/navigation";
import Modal from "../modal/Modal";
import { IResponseDelete } from "@/types/response.interface";
import { notifyError, notifySuccess } from "@/lib/notify";

interface IProps {
  project: IProject;
  setProjects: (projects: any) => void;
}
const ProjectItem = (props: IProps) => {
  const { project, setProjects } = props;
  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();
  const handleDeleteProject = async () => {
    try {
      const { data } = await axios.delete<IResponseDelete>(
        `/api/projects/${project?.id}`
      );
      setProjects((prevData: IProject[]) =>
        prevData.filter((p) => p.id !== project?.id)
      );
      router.push("/");
      closeModal();
      notifySuccess("Deleted project successfully");
    } catch (err) {
      console.log(err);
      notifyError(err as string);
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
