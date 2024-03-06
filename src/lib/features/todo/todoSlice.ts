import { ITodo } from "@/types/todo.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { produce } from "immer";

const initialState: ITodo[] = [
  {
    id: "1",
    name: "Todo 1",
    deadline: "2024-03-09",
    status: "Open",
    assignment: "Truong 1",
  },
  {
    id: "2",
    name: "Todo 2",
    deadline: "2024-03-09",
    status: "Open",
    assignment: "Truong 1",
  },
  {
    id: "3",
    name: "Todo 3",
    deadline: "2024-03-09",
    status: "Open",
    assignment: "Truong 3",
  },
  {
    id: "4",
    name: "Todo 4",
    deadline: "2024-03-09",
    status: "Open",
    assignment: "Truong 1",
  },
  {
    id: "5",
    name: "Todo 5",
    deadline: "2024-03-09",
    status: "Open",
    assignment: "Truong 1",
  },
];

export const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    reset: () => initialState,
    doAddTodoAction: (state, action) => {
      state.unshift(action.payload);
      return state;
    },

    doUpdateTodoAction: (state, action) => {
      state = action.payload;
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
