import React from "react";
import { useDispatch } from "react-redux";
import { Company } from "../Models/models";
import { changeCompany } from "../Redux/UpdateCompanySlice";
import { API } from "../../Utils/APIWrapper";
import { useNavigate } from "react-router-dom";
import { URL } from "../Routing";

type Prop = { company: Company };

const UpdateAndDeleteCompany = (prop: Prop) => {
  const dispatch = useDispatch();
  const naviaget = useNavigate();

  const dispachCompany = (myCompany: Company) => {
    dispatch(changeCompany(prop.company));
  };

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
