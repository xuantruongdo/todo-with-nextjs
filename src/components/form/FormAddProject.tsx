"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IProps {
  closeModal: () => void;
  fetchProjects: () => void;
}
const FormAddProject = (props: IProps) => {
  const { closeModal, fetchProjects } = props;
  const router = useRouter();
  const [projectName, setProjectName] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      name: projectName,
    };
    const res = await axios.post("/api/projects", data);

    if (res && res.data) {
      router.push(`/${res.data.id}`);
      fetchProjects()
      router.refresh();
      closeModal();
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

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAddProject;
