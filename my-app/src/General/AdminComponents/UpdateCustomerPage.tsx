import React, { useEffect, useRef, useState } from "react";
import Emailnpute from "../../Utils/Emailnpute";
import { Customer } from "../Models/models";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../Utils/APIWrapper";
import { reverseCustomerState } from "../Redux/UpdateCustomerSlice";
import { useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInputs {
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const UpdateCustomerPage = () => {
  const customerFromRedux = useSelector(
    (state: any) => state.updateCustomer.value
  );

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);

    const customerUpdated: Customer = {
      customerId: Number(customerId),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.lastName,
      password: data.password,
      coupons: [],
    };
    API.updateCustomer(customerUpdated);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  const { customerId } = useParams();
  const [customer, setCustomer] = useState<Customer>();

  // const [emailFromState, setEmail] = useState("");
  // const passRef = useRef<HTMLInputElement>(null);
  // const firstName = useRef<HTMLInputElement>(null);
  // const lastName = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCustomer(
      customerFromRedux.find(
        (c: Customer) => c.customerId === Number(customerId)
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

  // const updateCustomerHandler = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const customer: Customer = {
  //     customerId: Number(customerFromRedux.customerId),
  //     firstName: firstName.current!.value,
  //     lastName: lastName.current!.value,
  //     email: emailFromState,
  //     password: passRef.current!.value,
  //     coupons: [],
  //   };

  // API.updateCustomer(customer);
  // dispatch(reverseCustomerState());
  // setEmail("");

  return (
    <>
      {/* <form onSubmit={updateCustomerHandler}>
        {customerId && customerId}
        <div className="form">
          <label>First Name</label>
          <input
            type="text"
            ref={firstName}
            defaultValue={customer && customer!.firstName}
          />

          <label>Last Name</label>
          <input
            type="text"
            ref={lastName}
            defaultValue={customer && customer!.lastName}
          />

          <label>Password</label>
          <input
            type="password"
            ref={passRef}
            defaultValue={customer && customer!.password}
          />
          <Emailnpute
            functionHndler={updateCustomerHandler}
            setEmail={setEmail}
            inputValue={customer && customer!.email}
            buttonValue={"update customer"}
          ></Emailnpute>
        </div>
      </form> */}

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        
        <label> First Name </label>
        <input
          {...register("firstName", { required: true })}
          defaultValue={customer && customer!.firstName}
        />
        {errors.firstName && "First name is required"}

        <label> Last Name</label>
        <input
          {...register("lastName", { required: true })}
          defaultValue={customer && customer!.lastName}
        />

        <label> Email</label>
        <input
          {...register("email", { required: true })}
          type="email"
          defaultValue={customer && customer!.email}
        />

        <label> Password</label>
        <input
          {...register("password", { required: true, minLength: 8 })}
          defaultValue={customer && customer!.password}
        />
        {errors.password && "password must be with 8 digit minimum"}
        <input type="submit" className="btn" value={"For Example"} />
      </form>
      {customer?.customerId}
    </>
  );
};

export default UpdateCustomerPage;
