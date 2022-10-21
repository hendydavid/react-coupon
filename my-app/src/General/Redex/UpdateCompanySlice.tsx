import { createSlice } from "@reduxjs/toolkit";
import { Company } from "../Models/models";

const initState:Company={
  companyId: 0,
  companyName: '',
  email: '',
  password: '',
  dateCreated: new Date(),
  coupons: [],
};;

export const UpdateCompanySlice = createSlice({
  name: "companyUpdate",

  initialState: { value: initState },

  reducers: {
    changeCompamy: (state, action) => {
      state.value = action.payload;
    },
    reverseState: (state) => {
      state.value = initState;
    },
   
  }
});

export const { changeCompamy } = UpdateCompanySlice.actions;
export const { reverseState } = UpdateCompanySlice.actions;

export default UpdateCompanySlice.reducer;


