import React from "react";
import { Customer } from "../Models/models";
import { API } from "../Utils/APIWrapper";
import { URL } from "../Routing";
import { useNavigate } from "react-router-dom";
import { iconsList } from "../Utils/Icon";

type props = {
  customer: Customer;
  fetchCustomers: () => void;
};

const UpdateAndDeleteCustomer = (props: props) => {
  let customer = props.customer;

  const navigate = useNavigate();

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
              fetchData: props.fetchCustomers,
              errorRouting: () => {
                navigate(URL.adminUrl.errorMessage);
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
