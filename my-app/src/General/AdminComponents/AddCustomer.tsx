import React, { useRef, useState } from "react";
import { API } from "../../Utils/APIWrapper";
import Emailnpute from "../../Utils/Emailnpute";
import { Customer } from "../Models/models";
import "../css-files/App.css";
import { IFormInputsCustomer } from "./UpdateCustomerPage";
import { SubmitHandler, useForm } from "react-hook-form";

const AddCustomer = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IFormInputsCustomer>();

  const reset = () => {
    resetField("firstName");
    resetField("lastName");
    resetField("email");
    resetField("password");
  };

  const onSubmit: SubmitHandler<IFormInputsCustomer> = (data) => {
    console.log(data);

    const customerUpdated: Customer = {
      customerId: 0,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      coupons: [],
    };
    API.updateCustomer(customerUpdated);
    reset();
  };

  return (
    <>
      <h2>Please Add A New Customer</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label> First Name </label>
        <input
          {...register("firstName", { required: true })}
        />
        {errors.firstName && "First name is required"}

        <label> Last Name</label>
        <input
          {...register("lastName", { required: true })}
        />

        <label> Email</label>
        <input
          {...register("email", { required: true })}
          type="email"
        />

        <label> Password</label>
        <input
          {...register("password", { required: true, minLength: 8 })}
        />
        {errors.password && "password must be with 8 digit minimum"}
        <input type="submit" className="btn" value={"For Example"} />
      </form>
    </>
  );
};

export default AddCustomer;
