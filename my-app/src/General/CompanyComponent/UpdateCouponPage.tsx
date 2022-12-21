import React, { useEffect, useState } from "react";
import { APIResponseHandler, API_URL, CompanyApi, getToken } from "../Utils/APIWrapper";
import { useParams } from "react-router-dom";
import { Coupon } from "../Models/models";
import { SubmitHandler, useForm } from "react-hook-form";
import { changeMessage } from "../Redux/ErrorMessage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeLoadingMode } from "../Redux/LoadingCircleIcon";
import { optionsCategory } from "../Utils/Category";

export interface IFormInputsCompany {
  couponId: number;
  companyName: string;
  email: string;
  password: string;
  dateCreated: Date;
  coupons: [];
}

const UpdateCompanyPage = () => {
  const { couponId } = useParams();

  const setLoadingMode = (isLoading: boolean) => {
    dispatch(changeLoadingMode(isLoading));
  };

  const defaultCoupon: Coupon = {
    couponId: 0,
    couponName: "",
    description: "",
    company: "",
    customers: [],
    amount: 0,
    price: 0,
    categoryId: 0,
    imageURL: "",
    startDate: new Date(Date.now()),
    endDate: new Date(),
  };

  const [coupon, setCoupon] = useState<Coupon>(defaultCoupon);

  const [categoryId, setCategory] = useState(0);

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
  } = useForm<Coupon>();

  const reset = () => {
    resetField("couponName");
    resetField("description");
    resetField("amount");
    resetField("price");
    resetField("description");
    resetField("imageURL");
    resetField("endDate");
  };

  const onSubmit: SubmitHandler<Coupon> = (data) => {
    let end = new Date(String(data.endDate)).getTime();
    let start = new Date().getTime();
    if (end <= start) {
      window.alert("Please select date later from today");
    } else if (data.amount <= 0 || data.price <= 0) {
      window.alert("Please select price and amount greater than zero");
    } else {
      const defaultCompany = {
        couponId: 0,
        companyName: "",
        email: "",
        password: "",
        dateCreated: new Date(),
        coupons: [],
      };
      const coupon: Coupon = {
        couponId: Number(couponId),
        couponName: data.couponName,
        description: data.description,
        company: defaultCompany,
        customers: [],
        amount: data.amount,
        price: data.price,
        categoryId: categoryId === 0 ? 1 : categoryId,
        imageURL: data.imageURL,
        startDate: new Date(Date.now()),
        endDate: new Date(String(data.endDate)),
      };

      CompanyApi.updateCoupon(coupon, responseHandlerMethod);
      reset();
      console.log(coupon);
    }
  };

  const fetchOneCoupon = async () => {
    let id: number = Number(couponId);
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", token: getToken() },
    };
    const res = await fetch(
      `${API_URL}companies/getOneCoupon/${id}`,
      requestOptions
    );
    const data = await res.json();
    if (res.ok) {
      setCoupon(data);
      setLoadingMode(false);
    } else {
      getErrorMessage(data.value);
      setLoadingMode(false);
    }
  };
  useEffect(() => {
    setLoadingMode(true);
    fetchOneCoupon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [couponId]);

  return (
    <>
      <h2 className="title">Please update your coupon </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label> Coupon name </label>
        <input
          defaultValue={coupon?.couponName}
          {...register("couponName", { required: true })}
        />
        {errors.couponName && "coupon name is required"}

        <label> Description</label>
        <textarea
          {...register("description", {
            required: true,
            minLength: 30,
            maxLength: 80,
          })}
          defaultValue={coupon?.description}
        />
        {errors.description && "description must between 30-80 characters"}

        <label> Your amount of coupon available : {coupon.amount} </label>

        <input type={"number"} {...register("amount", { required: true })} />
        {errors.amount && "please update your amount"}

        <label> Your coupon price : {coupon.price}</label>
        <input type={"number"} {...register("price", { required: true })} />
        {errors.price && "please update your price"}

        <label> Please add image URl</label>
        <input
          defaultValue={coupon?.imageURL}
          type={"text"}
          {...register("imageURL", { required: true })}
        />
        {errors.imageURL && "coupon must be with an image please add image url"}

        <label>
          Your current expiration time : {String(coupon.endDate).slice(0, 10)}
        </label>
        <input type={"date"} {...register("endDate", { required: true })} />
        {errors.endDate && "coupon must be with an expiration date"}
        <label> Please select your category</label>
        <select
          {...register("categoryId", { required: true })}
          onChange={(e) => {
            console.log(e.target.value);
            setCategory(Number(e.target.value));
          }}
        >
          {optionsCategory()}
        </select>
        {errors.categoryId && "Please select category for your coupon"}

        <input type="submit" className="btn" value={"Add Coupon"} />
      </form>
      <div></div>
    </>
  );
};
export default UpdateCompanyPage;
