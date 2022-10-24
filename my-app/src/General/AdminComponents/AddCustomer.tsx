import React, { useRef, useState } from "react";
import { API } from "../../Utils/APIWrapper";
import Emailnpute from "../../Utils/Emailnpute";
import { Customer } from "../Models/models";
import "../css-files/App.css";

const AddCustomer = () => {
  const [emailFromState, setEmail] = useState("");
  const passRef = useRef<HTMLInputElement>(null);
  const firstName = useRef<HTMLInputElement>(null);
  const lastName = useRef<HTMLInputElement>(null);

  const addCustomerHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const customer: Customer = {
      customerId: 0,
      firstName: firstName.current!.value,
      lastName: lastName.current!.value,
      email: emailFromState,
      password: passRef.current!.value,
      coupons: [],
    };

    API.addCustomer(customer);
  };

  return (
    <>
      <h2>Please Add A New Customer</h2>
      <form onSubmit={addCustomerHandler}>
        <div className="form">
          <label>First Name</label>
          <input type="text" ref={firstName} />
          <label>Last Name</label>
          <input type="text" ref={lastName} />
          <label>Password</label>
          <input type="password" ref={passRef} />
          <Emailnpute
            functionHndler={addCustomerHandler}
            setEmail={setEmail}
            buttonValue={"Add Customer"}
          ></Emailnpute>
        </div>
      </form>
    </>
  );
};

export default AddCustomer;
