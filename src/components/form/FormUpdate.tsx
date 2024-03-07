"use client";
import { IAssignee } from "@/types/assignee.interface";
import { ITodo } from "@/types/todo.interface";
import moment from "moment";

interface IProps {
  todoInfo: ITodo;
  handleInputChange: (e: React.ChangeEvent<any>) => void;
  assignees: IAssignee[]
}
const FormUpdate = (props: IProps) => {
  const { todoInfo, handleInputChange, assignees } = props;
  return (
    <>
      <div className="my-3">
        <label htmlFor="name" className="text-slate-400 text-sm">
          Task name:
        </label>
        <input
          type="text"
          name="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="New task..."
          required
          value={todoInfo?.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="my-3">
        <label htmlFor="deadline" className="text-slate-400 text-sm">
          Deadline:
        </label>
        <input
          name="deadline"
          type="date"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Select date"
          value={moment(todoInfo?.deadline).format("YYYY-MM-DD")}
          onChange={handleInputChange}
        />
      </div>

      <div className="my-3">
        <label htmlFor="assigneeId" className="text-slate-400 text-sm">
          Assignee:
        </label>
        <select
          name="assigneeId"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={todoInfo?.assigneeId}
          onChange={handleInputChange}
        >
          <option disabled>Choose</option>
          {assignees?.map((assignee) => (
            <option value={assignee.id.toString()} key={assignee.id}>
              {assignee.name}
            </option>
          ))}
        </select>
      </div>

      <div className="my-3">
        <label htmlFor="status" className="text-slate-400 text-sm">
          Status:
        </label>
        <select
          name="status"
          value={todoInfo?.status}
          onChange={handleInputChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option disabled>Choose a status</option>

          <option value="Open">Open</option>
          <option value="InProcess">In process</option>
          <option value="Done">Done</option>
        </select>
      </div>
    </>
  );
};

export default FormUpdate;
