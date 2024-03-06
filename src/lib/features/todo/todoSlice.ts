import { ITodo } from "@/types/todo.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ITodo[] = [];

export const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    reset: () => initialState,
    doAddTodoAction: (state, action) => {
      state.unshift(action.payload);
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

export const { doAddTodoAction, doUpdateTodoAction, doDeleteTodoAction, reset } = todo.actions;
export default todo.reducer;
