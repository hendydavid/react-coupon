import React, { useEffect, useState } from "react";
import UpdateAndDeleteCustomer from "./UpdateAndDeleteCustomer";
import { useParams } from "react-router-dom";
import { Customer } from "../Models/models";
import { useDispatch } from "react-redux";
import { changeCustomer } from "../Redux/UpdateCustomerSlice";

type Props = {};

const UpdateAndDeleteCustomersList = (props: Props) => {
  const dispatch = useDispatch();
  const [customers, setCustomers] = useState<Customer[]>([]);

  const fetchCompany = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", token: "token" },
    };

    const response = await fetch(
      "http://localhost:8080/admin/getAllCustomers",
      requestOptions
    );

    if (response.ok) {
      const data = await response.json();
      setCustomers(data);
      dispatch(changeCustomer(data));
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchCompany();
  }, []);

  let keyNumber = 1;

  return (
    <div>
      {customers.map((customer) => (
        <UpdateAndDeleteCustomer
          customer={customer}
          key={keyNumber++}
        ></UpdateAndDeleteCustomer>
      ))}
    </div>
  );
};

export default UpdateAndDeleteCustomersList;
