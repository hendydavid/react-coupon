import { API, APIResponseHandler } from "../Utils/APIWrapper";
import { Customer } from "../Models/models";
import "../css-files/App.css";

import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeMessage } from "../Redux/ErrorMessage";

export interface IFormInputsCustomer {
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const AddCustomer = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IFormInputsCustomer>();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getErrorMessage = (message: string) => {
    dispatch(changeMessage(message));
    navigate("error");
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
      customerId: 0,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      coupons: [],
    };
    API.updateCustomer(customerUpdated,responseHandlerMethod);
    reset();
  };

  return (
    <>
      <h2 className="title">Please Add A New Customer</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label> First Name </label>
        <input {...register("firstName", { required: true })} />
        {errors.firstName && "First name is required"}

        <label> Last Name</label>
        <input {...register("lastName", { required: true })} />

        <label> Email</label>
        <input {...register("email", { required: true })} type="email" />

        <label> Password</label>
        <input {...register("password", { required: true, minLength: 8 })} />

        {errors.password && "password must be with 8 digit minimum"}
        <input type="submit" className="btn" value={"Add Customer"} />
      </form>
    </>
  );
};

export default AddCustomer;
