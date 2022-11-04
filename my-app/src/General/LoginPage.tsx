import { CheckBox } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { API } from "../General/Utils/APIWrapper";
import { URL } from "./Routing";
import { useNavigate } from "react-router-dom";

type LoginInfo = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const succsess = () => {
    navigate(URL.adminUrl.main);
  };
  const error = () => {
    navigate("error");
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<LoginInfo>();

  const reset = () => {
    resetField("email");
    resetField("password");
  };

  const onSubmit: SubmitHandler<LoginInfo> = (data) => {
    API.login({
      email: data.email,
      password: data.password,
      forwardError: error,
      forwardLogin: succsess,
    });
    reset();
  };

  return (
    <div className="login-page">
      <h1 className="title">Welcome To Coupon Shppoer</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="login form ">
        <label> Please Enter Your Email </label>

        <input
          {...register("email", { required: true, minLength: 8 })}
          type="email"
        />
        <label> Password</label>
        <input
          {...register("password", { required: true, minLength: 8 })}
          type={"password"}
        />
        {errors.password && "password must be with 8 digit minimum"}

        <input type="submit" className="btn" value={"Login"} />
      </form>
    </div>
  );
};

export default LoginPage;
