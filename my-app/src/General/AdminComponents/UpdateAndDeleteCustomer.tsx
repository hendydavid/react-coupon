import React from "react";
import { Customer } from "../Models/models";
import { API } from "../Utils/APIWrapper";
import { URL } from "../Routing";
import { useNavigate } from "react-router-dom";
import { iconsList } from "../Utils/Icon";
import { changeMessage } from "../Redux/ErrorMessage";
import { useDispatch } from "react-redux";

type props = {
  customer: Customer;
  fetchCustomers: () => void;
};

const UpdateAndDeleteCustomer = (props: props) => {
  let customer = props.customer;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getErrorMessage = (errorMessage: string) => {
    dispatch(changeMessage(errorMessage));
  };

  return (
    <div className="data-display">
      {iconsList.customer("")}
      <h4>Name:</h4>
      <p>{`${customer.firstName} ${customer.lastName}`}</p>
      <h4>Email:</h4>
      <p>{customer.email}</p>
      <div className="button-display">
        {iconsList.delete(() => {
          if (
            window.confirm(
              `are you would you like to delete ${
                customer.firstName + " " + customer.lastName
              }`
            )
          ) {
            API.deleteCustomer(props.customer, {
              onSuccess: props.fetchCustomers,
              onFail: (errorMessage: string) => {
                navigate("error");
                getErrorMessage(errorMessage);
              },
            });
          }
        })}

        {iconsList.update(() => {
          navigate(
            URL.adminUrl.updateCustomersPage + `${props.customer.customerId}`
          );
        })}
      </div>
    </div>
  );
};

export default UpdateAndDeleteCustomer;
