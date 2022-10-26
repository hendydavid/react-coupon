import { createSlice } from "@reduxjs/toolkit";
import { Company } from "../Models/models";

const initState: Company[] = [];

export const UpdateCompanySlice = createSlice({
  name: "companyUpdate",

  initialState: { value: initState },

  reducers: {
    changeCompany: (state, action) => {
      state.value = action.payload;
    },
    reverseCompanyState: (state) => {
      state.value = initState;
    },
  
  },
});

export const { changeCompany } = UpdateCompanySlice.actions;
export const { reverseCompanyState } = UpdateCompanySlice.actions;

export default UpdateCompanySlice.reducer;
