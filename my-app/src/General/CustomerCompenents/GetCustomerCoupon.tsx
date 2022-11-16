import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeMessage } from "../Redux/ErrorMessage";
import { changeLoadingMode } from "../Redux/LoadingData";
import { getToken } from "../Utils/APIWrapper";

const GetCustomerCoupon = () => {
  const [cutomerCoupon, setCustomerCoupon] = useState();

  const getCustomerCoupon = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", token: getToken() },
      body: "",
    };
    setLoadingMode(true);
    const response = await fetch(
      "http://localhost:8080/customers/getAllCustomerCoupon/",
      requestOptions
    );

    if (response.ok) {
      setLoadingMode(false);
    } else if (!response.ok) {
      const error = await response.json();
      getErrorMessage(error.value);
      setLoadingMode(false);
    }
  };

  // onFail and onSuccess handeling
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getErrorMessage = (message: string) => {
    dispatch(changeMessage(message));
    navigate("error");
  };
  const setLoadingMode = (isLoading: boolean) => {
    dispatch(changeLoadingMode(isLoading));
  };

  return <div>GetCustomerCoupon</div>;
};

export default GetCustomerCoupon;
