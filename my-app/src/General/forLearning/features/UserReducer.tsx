import { createSlice } from "@reduxjs/toolkit";

const initState = { name: "", age: '', email: "" };

export const userSlice = createSlice({
  name: "user",

  initialState: { value: { name: "", age: '', email: "" } },

  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = initState;
    },
  },
});

export const { login } = userSlice.actions;
export const { logout } = userSlice.actions;

export default userSlice.reducer;
