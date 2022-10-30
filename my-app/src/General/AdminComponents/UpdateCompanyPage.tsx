import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API } from "../../Utils/APIWrapper";
import { useParams } from "react-router-dom";
import { Company } from "../Models/models";
import { SubmitHandler, useForm } from "react-hook-form";

export interface IFormInputsCompany {
  companyId: number;
  companyName: string;
  email: string;
  password: string;
  dateCreated: Date;
  coupons: [];
}

const UpdateCompanyPage = () => {
  let { companyId } = useParams();

  const [company, setCompany] = useState<Company>();

  const companyFromRedux = useSelector(
    (state: any) => state.companyUpdate.value
  );

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

    API.updateCompany(companyUpdate);
    reset();
  };

  useEffect(() => {
    setCompany(
      companyFromRedux.find((c: Company) => c.companyId === Number(companyId))
    );

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
        <input type="submit" className="btn" value={"For Example"} />
      </form>
    </>
  );
};
export default UpdateCompanyPage;
