import { createSlice } from "@reduxjs/toolkit";

const initState:string ="";

export const ThemeSlice = createSlice({
  name: "theme",

  initialState: { value: initState },

  reducers: {
    changeColor: (state, action) => {
      state.value = action.payload;
    },
   
  },
});

export const { changeColor} = ThemeSlice.actions;
export default ThemeSlice.reducer;
