import { SubmitHandler, useForm } from "react-hook-form";
import { CompanyApi, APIResponseHandler } from "../Utils/APIWrapper";
import { Coupon } from "../Models/models";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeMessage } from "../Redux/ErrorMessage";
import { useState } from "react";
import { optionsCategory } from "../Utils/Category";
import "../css-files/select.css";


const AddCoupon = () => {
  const [categoryId, setCategory] = useState(0);

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

  const onSubmit: SubmitHandler<Coupon> = (data) => {
    let end = new Date(String(data.endDate)).getTime();
    let start = new Date().getTime();
    if (end <= start) {
      window.alert("Please select date later from today");
    } else {
      const defaultCompany = {
        companyId: 0,
        companyName: "",
        email: "",
        password: "",
        dateCreated: new Date(),
        coupons: [],
      };
      const coupon: Coupon = {
        couponId: 0,
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

      CompanyApi.addCoupon(coupon, responseHandlerMethod);
      reset();
      console.log(coupon);
    }
  };

  return (
    <>
      <h2 className="title">Please Add A New Coupon</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label> Coupon name </label>
        <input {...register("couponName", { required: true })} />
        {errors.couponName && "coupon name is required"}

        <label> Description</label>
        <textarea
          {...register("description", {
            required: true,
            minLength: 30,
            maxLength: 80,
          })}
        />
        {errors.description && "description must be with 30-80 characters"}

        <label> Amount of coupon available</label>
        <input type={"number"} {...register("amount", { required: true })} />

        <label> Coupon price</label>
        <input type={"number"} {...register("price", { required: true })} />

        <label> Please add image url</label>
        <input type={"text"} {...register("imageURL", { required: true })} />
        {errors.imageURL && "coupon must be with an image please add image url"}

        <label> Please select expiration time</label>
        <input type={"date"} {...register("endDate", { required: true })} />
        {errors.endDate && "coupon must be with an expiration date"}
        <label> Please select your category</label>

        <div className="select">
          <select
            id="format"
            {...register("categoryId", { required: true })}
            onChange={(e) => {
              console.log(e.target.value);
              setCategory(Number(e.target.value));
            }}
          >
            {optionsCategory()}
          </select>
        </div>

        <input type="submit" className="btn" value={"Add Coupon"} />
      </form>
    </>
  );
};

export default AddCoupon;
