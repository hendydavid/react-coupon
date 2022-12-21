import React from "react";
import { Company } from "../Models/models";
import { API, APIResponseHandler } from "../Utils/APIWrapper";
import { useNavigate } from "react-router-dom";
import { URL } from "../Routing";
import { iconsList } from "../Utils/Icon";
import { changeMessage } from "../Redux/ErrorMessage";
import { useDispatch } from "react-redux";

import "../css-files/App.css";

type Prop = {
  company: Company;
  fetchCompanies: () => void;
};

const UpdateAndDeleteCompany = (prop: Prop) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getErrorMessage = (message: string) => {
    dispatch(changeMessage(message));
    navigate("/error");
  };

  const responseHandlerMethod: APIResponseHandler = {
    onSuccess: () => {
      prop.fetchCompanies();
    },
    onFail: (error: string) => getErrorMessage(error),
  };

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
            API.deleteCompany(
              Number(prop.company.companyId),
              responseHandlerMethod
            );
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
