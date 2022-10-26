import React, { useState } from "react";
import MaterialUi from "./material-ui-learning/MaterialUi";
import AddCompany from "./AdminComponents/AddCompany";
import CouponPage from "./CouponComponenets/CouponPage";
import AllCustomerCoupons from "./CustomerCompenents/AllCustomerCoupons";
import CouponsByCategory from "./CustomerCompenents/CouponsByCategory";
import UpdateCompanyPage from "./AdminComponents/UpdateCompanyPage";
import GetAllCompany from "./AdminComponents/GetAllCompany";
import "./css-files/App.css";
import AddCustomer from "./AdminComponents/AddCustomer";
import GetAllCustomer from "./AdminComponents/GetAllCustomer";
import UpdateAndDeleteCustomersList from "./AdminComponents/UpdateAndDeleteCustomersList";
import UpdateAndDeleteCompanyList from "./AdminComponents/UpdateAndDeleteCompanyList";
import UpdateCustomerPage from "./AdminComponents/UpdateCustomerPage";
import UseCallBack from "./forLearning/UseCallBack";
import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import Coupon from "./forLearning/Coupon";
import Customer from "./forLearning/Customer";
import Admin from "./forLearning/Admin";
import Error from "./forLearning/Error";
import HomePage from "./forLearning/HomePage";
import Main from "./Main";
import UseFormHook from "./forLearning/UseFormHook";

const App = () => {
  return (
    <div className="container">
      {/* <MaterialUi />
      <AddCompany></AddCompany>
      <CouponPage couponId={7}></CouponPage>
      <AllCustomerCoupons></AllCustomerCoupons>
      <CouponsByCategory categoryId={2}></CouponsByCategory>
      <UpdateCompanyPage></UpdateCompanyPage>
      <GetAllCompany></GetAllCompany>
      <GetAllCustomer></GetAllCustomer>
      <UpdateAndDeleteCustomersList></UpdateAndDeleteCustomersList>
      <UpdateAndDeleteCompanyList></UpdateAndDeleteCompanyList>
      <UpdateCustomerPage></UpdateCustomerPage>
      <UpdateAndDeleteCustomersList></UpdateAndDeleteCustomersList>
      */}
      <div>
        Hello
        <UseFormHook></UseFormHook>
        <Main></Main>
      </div>
    </div>
  );
};

export default App;
