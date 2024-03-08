"use client";

import { useEffect, useState } from "react";
import { ITodo } from "@/types/todo.interface";
import { IResponse } from "@/types/response.interface";
import axios from "axios";
import { produce } from "immer";
import FormFilter from "../form/FormFilter";
import { IAssignee } from "@/types/assignee.interface";
import Todo from "../todo/Todo";
import Pagination from "../pagination/Pagination";
import { IFilter } from "@/types/filter.interface";

interface IProps {
  assignees: IAssignee[];
  todos: ITodo[];
  filter: IFilter;
  handleFilterChange: (e: React.ChangeEvent<any>) => void;
  clearFilter: () => void;
  fetchTodos: () => void;
}
const TodoList = (props: IProps) => {
  const { assignees, todos, filter, handleFilterChange, clearFilter, fetchTodos } = props;

  return (
    <>
      <FormFilter
        filter={filter}
        handleFilterChange={handleFilterChange}
        clearFilter={clearFilter}
        assignees={assignees}
      />
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Deadline
              </th>
              <th scope="col" className="px-6 py-3">
                Assignee
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {todos?.map((todo: ITodo) => (
              <Todo key={todo?.id} todo={todo} assignees={assignees} fetchTodos={fetchTodos} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TodoList;
