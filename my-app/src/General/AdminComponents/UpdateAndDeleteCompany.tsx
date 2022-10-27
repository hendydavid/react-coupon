import React from "react";
import { Company } from "../Models/models";
import { API } from "../../Utils/APIWrapper";
import { useNavigate } from "react-router-dom";
import { URL } from "../Routing";

type Prop = {
  company: Company;
  fetchCompanies: () => void;

};

const UpdateAndDeleteCompany = (prop: Prop) => {
  const naviaget = useNavigate();

 

  return (
    <div>
      <>
        company name: {prop.company.companyName}
        company email: {prop.company.email}
        company issue date: {prop.company.dateCreated}
        <button
          onClick={() => {
            if (
              window.confirm(
                `are you would you like to delete ${prop.company.companyName}`
              )
            ) {
              API.deleteCompany(Number(prop.company.companyId));
              prop.fetchCompanies();
            }
          }}
        >
          Delete
        </button>{" "}
        <button
          onClick={() => {
            naviaget(
              URL.adminUrl.updateCompaniesPage + `${prop.company.companyId}`
            );
          }}
        >
          Edit
        </button>
      </>
    </div>
  );
};

export default UpdateAndDeleteCompany;
