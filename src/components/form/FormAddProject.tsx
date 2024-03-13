"use client";

import { IProject } from "@/types/project.interface";
import axios from "@/config/axios-customize";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { notifyError, notifySuccess } from "@/lib/notify";

interface IProps {
  closeModal: () => void;
  setProjects: (projects: any) => void;
}
const FormAddProject = (props: IProps) => {
  const { closeModal, setProjects } = props;
  const router = useRouter();
  const [projectName, setProjectName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const projectData = {
      name: projectName,
    };
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/projects", projectData);
      setProjects((prevData: IProject[]) => [...prevData, data]);
      router.push(`/${data.id}`);
      router.refresh();
      closeModal();
      notifySuccess("Created project successfully");
    } catch (err) {
      console.log(err);
      notifyError(err as string);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
        Create Project
      </h2>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label
            htmlFor="taskName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Project Name
          </label>
          <input
            type="text"
            id="taskName"
            className="w-full p-2 border rounded-md"
            placeholder="New task..."
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center">
            <button
              type="button"
              className="bg-blue-200 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none opacity-50"
            >
              Processing
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Create Project
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default FormAddProject;
