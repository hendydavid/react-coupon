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
import PopUp from "./shared/PopUp";
import { PagesLinks } from "./Models/models";
import LoginPage from "./LoginPage";

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

function createSpaceToCapitalLetter(word: string): string {
  const result = word.replace(/[A-Z]/g, " $&").trim();
  // console.log(result); // 👉️
  return result;
}

export const keysAndValyeUrlForAdmin = (): PagesLinks[] => {
  const keysAndValyues = {
    main: "/admin",
    addCustomer: "/admin/addCustomer",
    addCompany: "/admin/addCompany",
    getAllCompany: "/admin/getAllCompanies",
    getAllCustomer: "/admin/getAllCustomers",
    editAndDeleteCustomers: "/admin/editAndDeleteCustomers/",
    editAndDeleteCompanies: "/admin/editAndDeleteCompanies/",
  };

  const pageAndLink: PagesLinks[] = [];

  let values = Object.values(keysAndValyues);
  let keys = Object.keys(keysAndValyues);

  for (let i = 0; i < values.length; i++) {
    pageAndLink.push({
      key: createSpaceToCapitalLetter(keys[i]),
      value: values[i],
    });
  }
  return pageAndLink;
};

const Routing = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<LoginPage></LoginPage>}
        />

        <Route path="*" element={<Error></Error>} />
        {/* here is goin the admin routing  --- the above is just example*/}
        <Route path="/admin" element={<AdminNavBar></AdminNavBar>}>
          <Route index element={<div>i am index default</div>} />
          <Route path="/admin/error/:errorMessage" element={<PopUp></PopUp>} />
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
