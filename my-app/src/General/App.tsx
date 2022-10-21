import React, { useState } from "react";
import MaterialUi from "./material-ui-learning/MaterialUi";
import AddCompany from "./AdminComponents/AddCompany";
import CouponPage from "./CouponComponenets/CouponPage";
import AllCustomerCoupons from "./CustomerCompenents/AllCustomerCoupons";
import CouponsByCategory from "./CustomerCompenents/CouponsByCategory";
import UpdateCompanyPage from "./AdminComponents/UpdateCompanyPage";
import UpdateCompanyList from "./AdminComponents/UpdateCompanyList";

const App = () => {
  return (
    <>
      {/* <MaterialUi />
      <AddCompany></AddCompany> */}
      {/* <CouponPage couponId={7}></CouponPage>*/}
      <CouponPage couponId={8}></CouponPage>
      <AllCustomerCoupons></AllCustomerCoupons>
      <CouponsByCategory categoryId={2}></CouponsByCategory>
      <UpdateCompanyPage></UpdateCompanyPage>
       <UpdateCompanyList></UpdateCompanyList>
    </>
  );
};

export default App;
