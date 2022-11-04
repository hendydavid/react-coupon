import React from "react";
import { Company } from "../Models/models";
import { API } from "../Utils/APIWrapper";
import { useNavigate } from "react-router-dom";
import { URL } from "../Routing";
import { iconsList } from "../Utils/Icon";
import "../css-files/App.css"

type Prop = {
  company: Company;
  fetchCompanies: () => void;
};

const UpdateAndDeleteCompany = (prop: Prop) => {
  const navigate = useNavigate();
  let company = prop.company;

  return (
    <div className="data-display">
      {iconsList.company("")}
      <h4>Name:</h4>
      <p>{company.companyName}</p>
      <h4>Email:</h4>
      <p>{company.email}</p>
      <h4>Company Created Date:</h4>
      <p>{`${String(company.dateCreated).slice(0, 10)}`}</p>
      <div className="button-display">
        {iconsList.delete(() => {
          if (
            window.confirm(
              `are you would you like to delete ${prop.company.companyName}`
            )
          ) {
            API.deleteCompany(Number(prop.company.companyId), {
              fetchData: prop.fetchCompanies,
              errorRouting: (errorMessage: string) => {
                navigate(URL.adminUrl.errorMessage + errorMessage);
              },
            });
          }
        })}

        {iconsList.update(() => {
          navigate(
            URL.adminUrl.updateCompaniesPage + `${prop.company.companyId}`
          );
        })}
      </div>
    </div>
  );
};

export default UpdateAndDeleteCompany;
