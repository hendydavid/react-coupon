import Header from "../Header"
import { useState, useEffect } from 'react';
import { Coupon } from '../Models/models';
import React from "react";

type Props = {
    couponId: number,
    purchaseCoupon: (couponId: number) => any
}


const CouponPage = (props: Props) => {

    const baseCoupon : Coupon = {
        couponId : 0,
        couponName: "",
        description: "",
        company: 0,
        customers: [],
        amount: 0,
        price: 0,
        categoryId: 0
    }

    const [coupon, setCoupon] = useState<Coupon>(baseCoupon);

    const getCouponByIdHandler = async (couponId: number) => {
        const myToken = "get from redux";

        const requestOptions = {
            method: "Get",
            headers: { "Content-Type": "application/json", token: myToken },
            body: JSON.stringify(couponId),
        };

        const response = await fetch("http://localhost:8080/customer/getCouponById/" + { couponId }, requestOptions);
        if (!response.ok) {
            const error = await response.json();
            console.log(JSON.stringify(error));
        }
        const couponFromDB = await response.json();
        setCoupon(couponFromDB);
    }

    const purchaseCouponHandler = async (couponId: number) => {
        const myToken = "get from redux";

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", token: myToken },
            body: JSON.stringify(couponId),
        };

        const response = await fetch("http://localhost:8080/customer/addCustomerPurchase/" + { couponId }, requestOptions);

        if (!response.ok) {
            const error = await response.json();
            console.log(JSON.stringify(error));
        }
    }
    useEffect(() => {
        purchaseCouponHandler(coupon.couponId);
    }, []);

    return (
        <React.Fragment>
            <Header />
            <div>
                <img src={coupon.imageURL} alt="image" />
                price = {coupon.price}
                <button onClick={purchaseCouponHandler(coupon.couponId)}>purchase this coupon</button>
            </div>



        </React.Fragment>
    );
}

export default CouponPage;