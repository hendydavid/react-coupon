import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { API } from "../Utils/APIWrapper";
import "../css-files/App.css";
import { Customer } from "../Models/models";

interface IFormInputs {
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const useFormHook = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IFormInputs>();
  const reserForm = () => {
    
    resetField("firstName");
    resetField("lastName");
    resetField("email");
    resetField("password");
  };
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);

    const customer: Customer = {
      customerId: 0,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.lastName,
      password: data.password,
      coupons: [],
    };
    console.log(customer);
    reserForm();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <label> First Name</label>
      <input {...register("firstName", { required: true })} />
      {errors.firstName && "First name is required"}

      <label> Last Name</label>
      <input {...register("lastName", { required: true })} />

      <label> Email</label>
      <input {...register("email", { required: true })} type="email" />

      <label> Password</label>
      <input
        {...register("password", { required: true, minLength: 8 })}
        type="password"
      />
      {errors.password && "password must be with 8 digit minimum"}
      <input type="submit" className="btn" value={"For Example"} />
    </form>
  );
};

export default useFormHook;
