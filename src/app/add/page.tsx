"use client";
import { doAddUserAction } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  //   const todos = useAppSelector((state) => state.todosReducer);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const newUser = {
      id: uuidv4(),
      name: name,
      email: email,
    };
    dispatch(doAddUserAction(newUser));
    router.push("list");
  };
  return (
    <div className="container flex justify-center h-screen">
      <div className="mt-5 w-1/2">
        <h2 className="text-2xl font-semibold text-center text-green-950">
          Add User
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name..."
            required
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email..."
            required
          />
          <button
            type="submit"
            className="w-full mt-3 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPage;
