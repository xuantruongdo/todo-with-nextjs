import { ITodo } from "@/types/todo.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { produce } from "immer";

const initialState: ITodo[] = [

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
