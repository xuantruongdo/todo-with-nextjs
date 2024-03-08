"use client";
import AddTodo from "@/components/addTodo/AddTodo";
import Pagination from "@/components/pagination/Pagination";
import TodoList from "@/components/todoList/TodoList";
import { IAssignee } from "@/types/assignee.interface";
import { IFilter } from "@/types/filter.interface";
import { ITodo } from "@/types/todo.interface";
import axios from "axios";
import { produce } from "immer";
import Link from "next/link";
import { useEffect, useState } from "react";

const TodoPage = () => {
  const [todos, setTodos] = useState<ITodo[]>();
  const [assignees, setAssignees] = useState<IAssignee[]>();
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [filter, setFilter] = useState<IFilter>({
    name: "",
    assigneeId: "",
    from: "",
    to: "",
  });

  const fetchTodos = async () => {
    try {
      const params: any = {
        page: page,
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
        setTotalPage(res.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const fetchAssignees = async () => {
    try {
      const params: any = {
        page: 1,
        pageSize: 100,
      };

      const res: any = await axios.get("/api/assignees", {
        params: params,
      });
      if (res && res.data) {
        setAssignees(res.data.assignees);
        setTotalPage(res.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [filter, page]);

  useEffect(() => {
    fetchAssignees();
  }, []);

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

  return (
    <div className="max-w-screen-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-center text-green-950">
        Todo List
      </h2>
      <div className="flex items-center justify-between">
        <AddTodo assignees={assignees!} fetchTodos={fetchTodos} />
        <Link
          href={"/assignees"}
          type="button"
          className="my-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Assignees
        </Link>
      </div>
      <TodoList
        assignees={assignees!}
        todos={todos!}
        filter={filter}
        handleFilterChange={handleFilterChange}
        clearFilter={clearFilter}
        fetchTodos={fetchTodos}
      />

      <Pagination page={page} setPage={setPage} totalPage={totalPage} />
    </div>
  );
};

export default TodoPage;
