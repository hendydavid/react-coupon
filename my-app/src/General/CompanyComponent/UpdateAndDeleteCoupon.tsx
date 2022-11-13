import React from "react";
import { Coupon } from "../Models/models";
import { API, APIResponseHandler, CompanyApi } from "../Utils/APIWrapper";
import { useNavigate } from "react-router-dom";
import { URL } from "../Routing";
import { iconsList } from "../Utils/Icon";
import { changeMessage } from "../Redux/ErrorMessage";
import { useDispatch } from "react-redux";

import "../css-files/App.css";

type Prop = {
  coupon: Coupon;
  fetchCoupons: () => void;
};

const UpdateAndDeleteCoupon = (prop: Prop) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getErrorMessage = (message: string) => {
    dispatch(changeMessage(message));
    navigate("error");
  };

  const responseHandlerMethod: APIResponseHandler = {
    onSuccess: () => {
      prop.fetchCoupons();
    },
    onFail: (error: string) => getErrorMessage(error),
  };

  let coupon = prop.coupon;

  return (
    <div className="data-display">
      {iconsList.coupon("")}
      <h4>Name:</h4>
      <p>{coupon.couponName}</p>
      <h4>Coupon price:</h4>
      <p>{coupon.price}</p>

      <h4>Amount of coupons available : </h4>
      <p>{coupon.amount}</p>

      <h4>
        Coupon current expiration date: 
      </h4>
      <p>{`${String(coupon.endDate).slice(0, 10)}`}</p>
      <div className="button-display">
        {iconsList.delete(() => {
          if (
            window.confirm(
              `are you would you like to delete ${prop.coupon.couponName}`
            )
          ) {
            CompanyApi.deleteCoupon(
              Number(prop.coupon.couponId),
              responseHandlerMethod
            );
          }
        })}

        {iconsList.update(() => {
          navigate(URL.companyUrl.updateCouponPage + `${prop.coupon.couponId}`);
        })}
      </div>
    </div>
  );
};

export default UpdateAndDeleteCoupon;
