import Header from "../Header";
import { useState, useEffect } from "react";
import { Company, Coupon } from "../Models/models";
import React from "react";

type Props = {
  couponId: number;
};

const CouponPage = (props: Props) => {
  const baseCompany: Company = {
    companyId: 0,
    companyName: "",
    email: "",
    password: "",
    dateCreated: new Date(),
    coupons: [],
  };

  const baseCoupon: Coupon = {
    couponId: 0,
    couponName: "",
    description: "",
    company: baseCompany,
    customers: [],
    amount: 0,
    price: 0,
    categoryId: 0,
    imageURL: "",
  };

  const [coupon, setCoupon] = useState<Coupon>(baseCoupon);

  const getCouponByIdHandler = async (couponId: number) => {
    const myToken = "get from redux";

    const requestOptions = {
      method: "Get",
      headers: { "Content-Type": "application/json", token: myToken },
    };

    const response = await fetch(
      "http://localhost:8080/customers/getCouponById/" + { couponId },
      requestOptions
    );
    if (!response.ok) {
      const error = await response.json();
      console.log(JSON.stringify(error));
    }
    const couponFromDB = await response.json();
    setCoupon(couponFromDB);
  };

  const purchaseCouponHandler = (couponId: number) => {

    const myToken = "get from redux";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token: myToken},
      body: ''
    };

    fetch(
      "http://localhost:8080/customers/addCustomerPurchase/" + { couponId },
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          console.log(0);
         
        } else {
          console.log(1);
          
        }
      })
      
      .catch((error) => {
        console.log(error);
      });
  };


  //   useEffect(() => {
  //     getCouponByIdHandler(coupon.couponId);
  //   }, []);

  return (
    <>
      <Header />
      <div>
        <img src={coupon.imageURL} alt="" />
        price : {coupon.price}
        <button
          onClick={() => {
            purchaseCouponHandler(coupon.couponId);
          }}
        >
          purchase this coupon
        </button>
      </div>
    </>
  );
};

export default CouponPage;
