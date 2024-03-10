import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  id: number;
  name: string;
  email: string;
};

const initialState: UserState[] = [

];

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
    doAddUserAction: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { doAddUserAction, reset } = user.actions;
export default user.reducer;
