import { createSlice } from "@reduxjs/toolkit";
import { Customer } from "../Models/models";

const initState:Customer={
  customerId:0,
  firstName:'',
  lastName:'',
  email: '',
  password: '',
  coupons: [],
};

export const UpdateCustomerSlice = createSlice({
  name: "updateCustomer",

  initialState: { value: initState },

  reducers: {
    changeCustomer: (state, action) => {
      state.value = action.payload;
    },
    reverseCustomerState: (state) => {
      state.value = initState;
    },
   
  }
});

export const { changeCustomer } = UpdateCustomerSlice.actions;
export const { reverseCustomerState } = UpdateCustomerSlice.actions;

export default UpdateCustomerSlice.reducer;


