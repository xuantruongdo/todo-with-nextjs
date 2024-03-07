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

interface IProps {
  assignees: IAssignee[];
  todos: any;
}
const TodoList = (props: IProps) => {
  const { assignees, todos: todoServer } = props;
  const [todos, setTodos] = useState<ITodo[]>(todoServer);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const [filter, setFilter] = useState({
    name: "",
    assigneeId: "",
    from: "",
    to: "",
  });

  const handleFilterChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;

    const nextState = produce((draft) => {
      draft[name] = value;
    });

    setFilter(nextState);
  };

  const clearFilter = () => {
    setFilter({
      name: "",
      assigneeId: "",
      from: "",
      to: "",
    });
  };

  const fetchTodos = async () => {
    try {
      const params: any = {
        page: page
      };

      if (filter.name !== "") {
        params.name = filter.name;
      }

      if (filter.assigneeId !== "") {
        params.assigneeId = filter.assigneeId;
      }

      if (filter.assigneeId !== "") {
        params.assigneeId = filter.assigneeId;
      }

      if (filter.from !== "") {
        params.from = filter.from;
      }

      if (filter.to !== "") {
        params.to = filter.to;
      }

      const res: any = await axios.get("/api/todos", {
        params: params,
      });
      if (res && res.data) {
        setTodos(res.data.todos);
        setTotalPage(res.data.totalPages)
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    setTodos(todoServer);
  }, [todoServer]);

  useEffect(() => {
    fetchTodos();
  }, [filter, page]);

  console.log(page);

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
              <Todo key={todo?.id} todo={todo} assignees={assignees} />
            ))}

          </tbody>
        </table>
        <Pagination page={page} setPage={setPage} totalPage={totalPage}/>

      </div>
    </>
  );
};

export default TodoList;
