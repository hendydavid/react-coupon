import { useCallback, useState } from "react";
import CouponList from "../CouponComponenets/CouponList";
import couponList from "../CouponComponenets/CouponList";

const AllCustomerCoupons = () => {
  const [coupons, setCoupons] = useState([]);

  const allCouponsHandler = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", token: "token" },
    };

    try {
      const response = await fetch(
        "http://localhost:8080/customers/getAllCustomerCoupon",
        requestOptions
      );

      if (!response.ok) {
        console.log("error");
      } else {
        const data = await response.json();
        setCoupons(data);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          allCouponsHandler();
        }}
      >
        Click Me
      </button>
      <CouponList coupons={coupons} />
    </>
  );
};

export default AllCustomerCoupons;
