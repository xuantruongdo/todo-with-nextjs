import React from "react";

interface IProps {
  handleDeleteProject: () => void;
  closeModal: () => void;
}
const FormDeleteProject = (props: IProps) => {
  const { handleDeleteProject, closeModal } = props;
  return (
    <div className="bg-white p-4">
      <p className="mb-4 text-gray-700">
        Are you sure you want to delete this project?
      </p>
      <div className="flex justify-end">
        <button
          className="mr-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
          onClick={handleDeleteProject}
        >
          Yes
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={closeModal}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default FormDeleteProject;
