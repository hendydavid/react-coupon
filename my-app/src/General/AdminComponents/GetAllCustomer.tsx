import React, { useEffect, useState } from "react";
import { Customer } from "../Models/models";
import CustomerDisplay from "./CustomerDisplay";



const GetAllCustomer = () => {
  const [customersList, setCustomers] = useState([]);
  let keyNumber = 1;
  const fetchCustomer = async () => {
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
    fetchCustomer();
  }, []);

  return (
    <div>
      <div>
        {customersList.map((customer) => (
          <CustomerDisplay
            customer={customer}
            key={keyNumber++}
          ></CustomerDisplay>
        ))}
      </div>
    </div>
  );
};

export default GetAllCustomer;
