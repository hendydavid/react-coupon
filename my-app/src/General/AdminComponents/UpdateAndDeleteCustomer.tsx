import React from "react";
import { Customer } from "../Models/models";
import { API } from "../../Utils/APIWrapper";
import { changeCustomer } from "../Redux/UpdateCustomerSlice";
import { useDispatch } from "react-redux";
type props = {
  customer: Customer;
};

const UpdateAndDeleteCustomer = (props: props) => {
  let firstName = props.customer.firstName;
  let lastName = props.customer.lastName;

  const dispatch = useDispatch();

  const dispatchCustomer = (customer: Customer) => {
    dispatch(changeCustomer(customer));
  };

  return (
    <>
      <div>
        customer name: {props.customer.firstName}
        customer name: {props.customer.lastName}
        customer email: {props.customer.email}
      </div>
      <button
        onClick={() => {
          if (
            window.confirm(
              `are you would you like to delete ${firstName + " " + lastName}`
            )
          ) {
            API.deleteCustomer(props.customer);
          }
        }}
      >
        Delete
      </button>
      <button
        onClick={() => {
          dispatchCustomer(props.customer);
        }}
      >
        Edit
      </button>
    </>
  );
};

export default UpdateAndDeleteCustomer;
