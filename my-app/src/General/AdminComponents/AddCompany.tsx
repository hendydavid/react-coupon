import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { API } from "../../Utils/APIWrapper";
import { Company } from "../Models/models";
import { IFormInputsCompany } from "./UpdateCompanyPage";

const AddCompany = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IFormInputsCompany>();

  const reset = () => {
    resetField("companyName");
    resetField("email");
    resetField("password");
  };

  const onSubmit: SubmitHandler<IFormInputsCompany> = (data) => {
    console.log(data);

    const company: Company = {
      companyId: 0,
      companyName: data.companyName,
      email: data.email,
      password: data.password,
      dateCreated: new Date(),
      coupons: [],
    };

    API.addCompany(company);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <label> Company Name </label>
      <input {...register("companyName", { required: true })} />
      {errors.companyName && "company name is required"}

      <label> Email</label>
      <input
        {...register("email", { required: true, minLength: 8 })}
        type="email"
      />

      <label> Password</label>
      <input {...register("password", { required: true, minLength: 8 })} />
      {errors.password && "password must be with 8 digit minimum"}
      <input type="submit" className="btn" value={"For Example"} />
    </form>
  );
};

export default AddCompany;
