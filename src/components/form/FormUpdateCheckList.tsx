import { notifyError, notifySuccess } from "@/lib/notify";
import { ICheckList, IUpdateCheckList } from "@/types/checklist.interface";
import { IResponseDelete } from "@/types/response.interface";
import axios from "@/config/axios-customize";
import React, { useState } from "react";

interface IProps {
  checklist: ICheckList;
  fetchTaskById: () => void;
  closeModal: () => void;
}
const FormUpdateCheckList = (props: IProps) => {
  const { checklist: initialChecklist, fetchTaskById, closeModal } = props;

  const [checklist, setChecklist] = useState<ICheckList>(initialChecklist);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? checked : value;

    setChecklist((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const handleSaveCheckList = async () => {
    const checklistData: IUpdateCheckList = {
      title: checklist?.title,
      checked: checklist?.checked,
    };
    setIsLoading(true);
    try {
      const { data } = await axios.patch<ICheckList>(
        `/api/checklists/${checklist?.id}`,
        checklistData
      );
      fetchTaskById();
      closeModal();
      notifySuccess("Updated checklist successfully")
    } catch (err) {
      console.log(err);
      notifyError(err as string)
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCheckList = async () => {
    try {
      const { data } = await axios.delete<IResponseDelete>(
        `/api/checklists/${checklist?.id}`
      );
      fetchTaskById();
      closeModal();
      notifySuccess("Deleted checklist successfully");
    } catch (err) {
      console.log(err);
      notifyError(err as string)
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
        Update CheckList
      </h2>

      <div className="my-5">
        <div className="mt-2 flex items-center gap-10">
          <input
            name="title"
            type="text"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={checklist?.title}
            onChange={handleInputChange}
          />
          <input
            name="checked"
            type="checkbox"
            id={`checklist-${checklist?.id}`}
            checked={checklist?.checked || false}
            className="form-checkbox h-5 w-5 text-blue-500"
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex space-x-2">
        {isLoading ? (
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800 opacity-50"
            disabled
          >
            Processing
          </button>
        ) : (
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800"
            onClick={handleSaveCheckList}
          >
            Save
          </button>
        )}
        <button
          type="button"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800"
          onClick={handleDeleteCheckList}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default FormUpdateCheckList;
