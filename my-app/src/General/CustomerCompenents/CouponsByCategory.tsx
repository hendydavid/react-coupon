import { useState, useCallback } from "react";
import CouponList from "../CouponComponenets/CouponList";

type Props = {
  categoryId: number;
};

const CouponsByCategory = (props: Props) => {
  const [coupons, setCoupons] = useState([]);

  const couponByCategoryHandler = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", token: "token" },
    };

    try {
      const response = await fetch(
        "http://localhost:8080/customers/getCustomerCouponByCategory/" +
          props.categoryId,
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
          couponByCategoryHandler();
        }}
      >
        Click Me For Coupon Category
      </button>
      <CouponList coupons={coupons} />
    </>
  );
};

export default CouponsByCategory;
