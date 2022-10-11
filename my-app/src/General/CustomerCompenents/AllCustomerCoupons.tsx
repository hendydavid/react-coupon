import { useCallback, useState } from "react";
import CouponList from "../CouponComponenets/CouponList";
import couponList from '../CouponComponenets/CouponList';


const AllCustomerCoupons = () => {

    const [coupons, setCoupons] = useState([])

    const allCouponsHandler = useCallback(async () => {
        try {
            
            const response = await fetch("http://localhost:8080/customer/getAllCustomerCoupon");
            if(!response.ok){
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            setCoupons(data);
        } catch (error : any) {
            console.log(error.message);
        }
    }, []);

    return(
        <CouponList coupons = {coupons}/>
    )
}

export default AllCustomerCoupons