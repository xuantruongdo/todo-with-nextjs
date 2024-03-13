"use client";

import { IResponseDelete } from "@/types/response.interface";
import axios from "@/config/axios-customize";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notifyError, notifySuccess } from "@/lib/notify";

type IProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
const DeleteTaskPage = (props: IProps) => {
  const taskId = props.params.id;
  const projectId = props.searchParams.projectId;
  const router = useRouter();

  const handleDeleteTask = async () => {
    try {
      const { data } = await axios.delete<IResponseDelete>(
        `/api/tasks/${taskId}`
      );
      router.push(`/${projectId}`);
      notifySuccess("Deleted task successfully");
    } catch (err) {
      notifyError(err as string);
    }
  };
  return (
    <div className="mx-auto sm:px-10 md:px-8 lg:px-14 xl:px-20 mt-40">
      <div className="bg-gray-200 rounded p-4">
        <p className="mb-4 text-gray-700">
          Are you sure you want to delete this task?
        </p>
        <div className="flex justify-end">
          <button
            className="mr-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
            onClick={handleDeleteTask}
          >
            Yes
          </button>
          <Link
            href={`/tasks/${taskId}`}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            No
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskPage;
