import { createSlice } from "@reduxjs/toolkit";

const initState = false;

export const LoadingData = createSlice({
  name: "loadingData",

  initialState: { value: initState },

  reducers: {
    changeLoadingMode: (state, action) => {
      state.value = action.payload;
    },
    clearLoadingMode: (state) => {
      state.value = initState;
    },
  },
});

export const { changeLoadingMode } = LoadingData.actions;
export const { clearLoadingMode } = LoadingData.actions;
export default LoadingData.reducer;
