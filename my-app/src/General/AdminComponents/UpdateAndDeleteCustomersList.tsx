import React, { useEffect, useState } from "react";
import UpdateAndDeleteCustomer from "./UpdateAndDeleteCustomer";

type Props = {};

const UpdateAndDeleteCustomersList = (props: Props) => {
  const [customers, setCustomers] = useState([]);

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
        <UpdateAndDeleteCustomer customer={customer} key={keyNumber++}></UpdateAndDeleteCustomer>
      ))}
    </div>
  );
};

export default UpdateAndDeleteCustomersList;
