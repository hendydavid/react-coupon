import React from "react";
import { Customer } from "../Models/models";
import { API } from "../../Utils/APIWrapper";
import { URL } from "../Routing";
import { useNavigate } from "react-router-dom";
type props = {
  customer: Customer;
};

const UpdateAndDeleteCustomer = (props: props) => {
  let firstName = props.customer.firstName;
  let lastName = props.customer.lastName;

  const navigate = useNavigate();

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
          navigate(
            URL.adminUrl.updateCustomersPage + `${props.customer.customerId}`
          );
        }}
      >
        Edit
      </button>
    </>
  );
};

export default UpdateAndDeleteCustomer;
