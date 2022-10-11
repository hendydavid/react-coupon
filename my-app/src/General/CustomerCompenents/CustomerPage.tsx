import Header from "../Header";
import AllCustomerCoupons from "./AllCustomerCoupons";
import allCustomerCoupons from './AllCustomerCoupons';
import CouponsByCategory from './CouponsByCategory';
import CouponsByMaxPrice from './CouponsByMaxPrice';


const CustomerPage = () => {
    let categoryId = 0;
    let maxPrice = 0;
    return (
        <>
        <Header />
        <AllCustomerCoupons />
        <CouponsByCategory categoryId={categoryId}/>
        <CouponsByMaxPrice price={maxPrice}/>
        </>

        /*
     
       list of alll action agter login (with routing )
    
      getAllcustomerCoupons
      addPurchase
      getCustomerCouponsByCategory
      getCustomerCouponsByMaxPrice
      getCustomerDetails
    
       
       */
      );
}