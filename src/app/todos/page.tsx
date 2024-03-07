import AddTodo from "@/components/addTodo/AddTodo";
import TodoList from "@/components/todoList/TodoList";
import { IAssignee } from "@/types/assignee.interface";
import { ITodo } from "@/types/todo.interface";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
const prisma = new PrismaClient();

const getTodos = async (): Promise<ITodo[]> => {
  const res = await prisma.todos.findMany({
    select: {
      id: true,
      name: true,
      status: true,
      deadline: true,
      assignee: true,
      assigneeId: true,
    },
    orderBy: {
      id: "desc",
    },
  });
  return res;
};

const getAssignees = async (): Promise<IAssignee[]> => {
  const res = await prisma.assignees.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  return res;
};

const TodoPage = async () => {
  const assignees: IAssignee[] = await getAssignees();
  const todos: ITodo[] = await getTodos();
  return (
    <div className="max-w-screen-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-center text-green-950">
        Todo List
      </h2>
      <div className="flex items-center justify-between">
        <AddTodo assignees={assignees} />
        <Link
          href={"/assignees"}
          type="button"
          className="my-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Assignees
        </Link>
      </div>
      <TodoList assignees={assignees} todos={todos} />
    </div>
  );
};

export default TodoPage;
