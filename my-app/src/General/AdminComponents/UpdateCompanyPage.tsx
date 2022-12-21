import React, { useEffect, useState } from "react";
import {
  API,
  APIResponseHandler,
  API_URL,
  getToken,
} from "../Utils/APIWrapper";
import { useParams } from "react-router-dom";
import { Company } from "../Models/models";
import { SubmitHandler, useForm } from "react-hook-form";
import { changeMessage } from "../Redux/ErrorMessage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export interface IFormInputsCompany {
  companyId: number;
  companyName: string;
  email: string;
  password: string;
  dateCreated: Date;
  coupons: [];
}

const UpdateCompanyPage = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState<Company>();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getErrorMessage = (message: string) => {
    dispatch(changeMessage(message));
    navigate("/error");
  };
  const responseHandlerMethod: APIResponseHandler = {
    onSuccess: () => {},
    onFail: (error: string) => getErrorMessage(error),
  };

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

    const companyUpdate: Company = {
      companyId: Number(companyId),
      companyName: data.companyName,
      email: data.email,
      password: data.password,
      dateCreated: new Date(),
      coupons: [],
    };

    API.updateCompany(companyUpdate, responseHandlerMethod);
    reset();
  };

  const fetchOneCompany = async () => {
    console.log(companyId);
    let id: number = Number(companyId);
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", token: getToken() },
    };
    const res = await fetch(
      `${API_URL}admin/getOneCompany/${id}`,
      requestOptions
    );
    if (res.ok) {
      const data = await res.json();
      setCompany(data);
    } else {
      const data = await res.json();
      getErrorMessage(data.value);
    }
  };
  useEffect(() => {
    fetchOneCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label> Company Name </label>
        <input
          {...register("companyName", { required: true })}
          defaultValue={company && company!.companyName}
        />
        {errors.companyName && "company name is required"}

        <label> Email</label>
        <input
          {...register("email", { required: true, minLength: 8 })}
          type="email"
          defaultValue={company && company!.email}
        />

        <label> Password</label>
        <input
          {...register("password", { required: true, minLength: 8 })}
          defaultValue={company && company!.password}
        />
        {errors.password && "password must be with 8 digit minimum"}
        <input type="submit" className="btn" value={"Update Company"} />
      </form>
    </>
  );
};
export default UpdateCompanyPage;
