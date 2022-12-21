import React, { useEffect, useState } from "react";
import { Customer } from "../Models/models";
import {
  API,
  APIResponseHandler,
  API_URL,
  getToken,
} from "../Utils/APIWrapper";

import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { changeMessage } from "../Redux/ErrorMessage";

export interface IFormInputsCustomer {
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const UpdateCustomerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customerId } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IFormInputsCustomer>();

  const getErrorMessage = (message: string) => {
    dispatch(changeMessage(message));
    navigate("/error");
  };

  const responseHandlerMethod: APIResponseHandler = {
    onSuccess: () => {},
    onFail: (error: string) => getErrorMessage(error),
  };

  const reset = () => {
    resetField("firstName");
    resetField("lastName");
    resetField("email");
    resetField("password");
  };

  const onSubmit: SubmitHandler<IFormInputsCustomer> = (data) => {
    console.log(data);

    const customerUpdated: Customer = {
      customerId: Number(customerId),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      coupons: [],
    };
    API.updateCustomer(customerUpdated, responseHandlerMethod);
    reset();
  };

  const fetchOneCustomer = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", token: getToken() },
    };
    const res = await fetch(
      `${API_URL}admin/getOneCustomer/${customerId}`,
      requestOptions
    );
    if (res.ok) {
      const data = await res.json();
      setCustomer(data);
    } else {
      const data = await res.json();
      getErrorMessage(data.value);
    }
  };

  const [customer, setCustomer] = useState<Customer>();

  useEffect(() => {
    fetchOneCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

  return (
    <>
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
        <input type="submit" className="btn" value={"Update Customer"} />
      </form>
    </>
  );
};

export default UpdateCustomerPage;
