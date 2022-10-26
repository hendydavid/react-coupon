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
import GetAllCustomer from "./AdminComponents/GetAllCustomer";
import AddCompany from "./AdminComponents/AddCompany";
import AddCustomer from "./AdminComponents/AddCustomer";

export const URL = {
  adminUrl: {
    
    main: "/admin",
    addCustomer: "/admin/addCustomer",
    addCompany: "/admin/addCompany",
    getAllCompany: "/admin/getAllCompanies",
    getAllCustomer: "/admin/getAllCustomers",
    editAndDeleteCustomers: "/admin/editAndDeleteCustomers/",
    editAndDeleteCompanies: "/admin/editAndDeleteCompanies/",
    updateCustomersPage: "/admin/updateCustomersPage/",
    updateCompaniesPage: "/admin/updateCompaniesPage/",
  },

  customersUrl: {},
  companyUrl: {},
};

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
            path="/admin/addCustomer"
            element={<AddCustomer></AddCustomer>}
          />
          <Route path="/admin/addCompany" element={<AddCompany></AddCompany>} />
          <Route
            path="/admin/updateCompaniesPage/:companyId"
            element={<UpdateCompanyPage></UpdateCompanyPage>}
          />
          <Route
            path="/admin/updateCustomersPage/:customerId"
            element={<UpdateCustomerPage></UpdateCustomerPage>}
          />
          <Route
            path="/admin/editAndDeleteCustomers/"
            element={
              <UpdateAndDeleteCustomersList></UpdateAndDeleteCustomersList>
            }
          />

          <Route
            path="/admin/editAndDeleteCompanies/"
            element={<UpdateAndDeleteCompanyList></UpdateAndDeleteCompanyList>}
          />

          <Route
            path="/admin/getAllCompanies"
            element={<GetAllCompany></GetAllCompany>}
          />
          <Route
            path="/admin/getAllCustomers"
            element={<GetAllCustomer></GetAllCustomer>}
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
