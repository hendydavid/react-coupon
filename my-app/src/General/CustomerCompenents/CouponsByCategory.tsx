import {useState, useCallback } from "react";
import CouponList from "../CouponComponenets/CouponList";


type Props = {
    categoryId : number
}

const CouponsByCategory = (props: Props) =>{

    const [coupons, setCoupons] = useState([]);

    const couponsByCategoryHandler = useCallback(async (categoryId : number) => {
        try {
            
            const response = await fetch("http://localhost:8080/customer/getCustomerCouponByCategory/" + {categoryId});
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

export default CouponsByCategory;