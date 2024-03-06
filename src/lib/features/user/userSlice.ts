import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  id: string;
  name: string;
  email: string;
};

const initialState: UserState[] = [
  {
    id: "1",
    name: "Truong 1",
    email: "dev1@gmail.com",
  },
  {
    id: "2",
    name: "Truong 2",
    email: "dev2@gmail.com",
  },
  {
    id: "3",
    name: "Truong 3",
    email: "dev3@gmail.com",
  },
  {
    id: "4",
    name: "Truong 4",
    email: "dev4@gmail.com",
  },
  {
    id: "5",
    name: "Truong 5",
    email: "dev5@gmail.com",
  },
  {
    id: "6",
    name: "Truong 6",
    email: "dev6@gmail.com",
  },
  {
    id: "7",
    name: "Truong 7",
    email: "dev7@gmail.com",
  },
  {
    id: "8",
    name: "Truong 8",
    email: "dev8@gmail.com",
  },
  {
    id: "9",
    name: "Truong 9",
    email: "dev9@gmail.com",
  },
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
