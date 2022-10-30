import React from "react";
import { Route, Routes } from "react-router-dom";
import Error from "./forLearning/Error";
import GetAllCompany from "../General/AdminComponents/GetAllCompany";
import AdminNavBar from "./AdminComponents/AdminNavBar";
import UpdateCompanyPage from "./AdminComponents/UpdateCompanyPage";
import UpdateAndDeleteCompanyList from "./AdminComponents/UpdateAndDeleteCompanyList";
import UpdateCustomerPage from "./AdminComponents/UpdateCustomerPage";
import UpdateAndDeleteCustomersList from "./AdminComponents/UpdateAndDeleteCustomersList";
import GetAllCustomer from "./AdminComponents/GetAllCustomer";
import AddCompany from "./AdminComponents/AddCompany";
import AddCustomer from "./AdminComponents/AddCustomer";
import AdminError from "./AdminComponents/AdminError";

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
    errorMessage: "/admin/error/",
  },

  customersUrl: {},
  companyUrl: {},
};

const Routing = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<div>here is the login page --- first page </div>}
        />

        <Route path="*" element={<Error></Error>} />
        {/* here is goin the admin routing  --- the above is just example*/}
        <Route path="/admin" element={<AdminNavBar></AdminNavBar>}>
          <Route index element={<div>i am index default</div>} />
          <Route path="/admin/error/:errorMessage" element={<AdminError></AdminError>} />
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
