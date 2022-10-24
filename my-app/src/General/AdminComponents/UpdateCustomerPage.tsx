import React, { useRef, useState } from "react";
import Emailnpute from "../../Utils/Emailnpute";
import { Customer } from "../Models/models";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../Utils/APIWrapper";
import { reverseCustomerState } from "../Redux/UpdateCustomerSlice";

const UpdateCustomerPage = () => {
  const customerFromRedux = useSelector(
    (state: any) => state.updateCustomer.value
  );

  const [emailFromState, setEmail] = useState("");
  const [clearInpute, setInpute] = useState(true);
  const passRef = useRef<HTMLInputElement>(null);
  const firstName = useRef<HTMLInputElement>(null);
  const lastName = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const updateCustomerHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const customer: Customer = {
      customerId: Number(customerFromRedux.customerId),
      firstName: firstName.current!.value,
      lastName: lastName.current!.value,
      email: emailFromState,
      password: passRef.current!.value,
      coupons: [],
    };

    API.updateCustomer(customer);
    dispatch(reverseCustomerState());
    setEmail("");
  };

  return (
    <form onSubmit={updateCustomerHandler}>
  
      <div className="form">
        <label>First Name</label>
        <input
          type="text"
          ref={firstName}
          defaultValue={customerFromRedux.firstName}
        />

        <label>Last Name</label>
        <input
          type="text"
          ref={lastName}
          defaultValue={customerFromRedux.lastName}
        />

        <label>Password</label>
        <input
          type="password"
          ref={passRef}
          defaultValue={customerFromRedux.password}
        />
        <Emailnpute
          functionHndler={updateCustomerHandler}
          setEmail={setEmail}
          inputValue={customerFromRedux.email}
          buttonValue={"update customer"}
        ></Emailnpute>
      </div>
    </form>
  );
};

export default UpdateCustomerPage;
