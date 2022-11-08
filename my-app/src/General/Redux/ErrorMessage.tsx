import { createSlice } from "@reduxjs/toolkit";

const initState: string = "";

export const ErrorMessage = createSlice({
  name: "errorMessage",

  initialState: { value: initState },

  reducers: {
    changeMessage: (state, action) => {
      state.value = action.payload;
    },
    clearMessage: (state) => {
      state.value = initState;
    },
  },
});

export const { changeMessage } = ErrorMessage.actions;
export const { clearMessage } = ErrorMessage.actions;
export default ErrorMessage.reducer;
