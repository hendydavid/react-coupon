import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "./forLearning/Admin";
import Coupon from "./forLearning/Coupon";
import Customer from "./forLearning/Customer";
import HomePage from "./forLearning/HomePage";
import Error from "./forLearning/Error";
import GetAllCompany from "./AdminComponents/GetAllCompany";
import AdminNavBar from "./AdminComponents/AdminNavBar";
import UpdateCompanyPage from "./AdminComponents/UpdateCompanyPage";
import UpdateAndDeleteCompanyList from "./AdminComponents/UpdateAndDeleteCompanyList";
import UpdateCustomerPage from "./AdminComponents/UpdateCustomerPage";
import UpdateAndDeleteCustomersList from "./AdminComponents/UpdateAndDeleteCustomersList";

const Routing = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<div>i am index default</div>} />
          <Route path="/Stamadmin" element={<Admin></Admin>}></Route>
        </Route>
        <Route path="/customer" element={<div>no-param!</div>} />{" "}
        <Route path="/customer/:username" element={<Customer></Customer>} />
        <Route path="*" element={<Error></Error>} />
        <Route path="/coupon" element={<Coupon></Coupon>} />


        {/* here is goin the admin routing  --- the above is just example*/}
        <Route path="/admin" element={<AdminNavBar></AdminNavBar>}>
         
          <Route
            path="/admin/updateCompanyPage/:companyId"
            element={<UpdateCompanyPage></UpdateCompanyPage>}
          />

          <Route
            path="/admin/updateCustomerPage/:customerId"
            element={<UpdateCustomerPage></UpdateCustomerPage>}
          />

          <Route
            path="/admin/editAndDeleteCustomers/"
            element={<UpdateAndDeleteCustomersList></UpdateAndDeleteCustomersList>}
          />

          <Route
            path="/admin/editAndDeleteCompanies/"
            element={<UpdateAndDeleteCompanyList></UpdateAndDeleteCompanyList>}
          />

          <Route
            path="/admin/getAllCompany"
            element={<GetAllCompany></GetAllCompany>}
          />
        </Route>
      
      </Routes>
    </>
  );
};

export default Routing;

{
  /* <AddCompany></AddCompany>
<CouponPage couponId={7}></CouponPage>
<AllCustomerCoupons></AllCustomerCoupons>
<CouponsByCategory categoryId={2}></CouponsByCategory>
<UpdateCompanyPage></UpdateCompanyPage>
<GetAllCompany></GetAllCompany>
<GetAllCustomer></GetAllCustomer>
<UpdateAndDeleteCustomersList></UpdateAndDeleteCustomersList>
<UpdateAndDeleteCompanyList></UpdateAndDeleteCompanyList>
<UpdateCustomerPage></UpdateCustomerPage>
<UpdateAndDeleteCustomersList></UpdateAndDeleteCustomersList> */
}
