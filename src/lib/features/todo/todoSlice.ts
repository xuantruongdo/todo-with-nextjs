import { ITodo } from "@/types/todo.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { produce } from "immer";

const initialState: ITodo[] = [
  {
    id: "1",
    name: "Todo 1",
    deadline: "2024-03-09",
    status: "Open",
    assignment: "dev4@gmail.com",
  },
  {
    id: "2",
    name: "Todo 2",
    deadline: "2024-03-09",
    status: "Open",
    assignment: "dev4@gmail.com",
  },
  {
    id: "3",
    name: "Todo 3",
    deadline: "2024-03-12",
    status: "Open",
    assignment: "dev1@gmail.com",
  },
  {
    id: "4",
    name: "Todo 4",
    deadline: "2024-03-09",
    status: "Open",
    assignment: "dev2@gmail.com",
  },
  {
    id: "5",
    name: "Todo 5",
    deadline: "2024-04-09",
    status: "Open",
    assignment: "dev7@gmail.com",
  },
];

export const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    reset: () => initialState,
    doAddTodoAction: (state, action) => {
      state.push(action.payload);
    },

    doUpdateTodoAction: (state, action) => {
      const id = action.payload.id;
      const updateData = action.payload.updateData;
      const todoIndex = state.findIndex(todo => todo.id === id)
      if (todoIndex !== -1) {
        state[todoIndex] = { ...state[todoIndex], ...updateData };
      }
      return state;
    },

    doDeleteTodoAction: (state, action) => {
      const id = action.payload;
      state = state.filter((todo: ITodo) => todo.id !== id);
      return state;
    },

  },
});

export const {
  doAddTodoAction,
  doUpdateTodoAction,
  doDeleteTodoAction,
  reset,
} = todo.actions;
export default todo.reducer;
