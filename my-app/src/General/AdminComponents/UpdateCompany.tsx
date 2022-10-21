import React from "react";
import { useDispatch } from "react-redux";
import { Company } from "../Models/models";
import { changeCompamy } from "../Redex/UpdateCompanySlice";

type Prop = { company: Company };

const UpdateCompany = (prop: Prop) => {
  const dispatch = useDispatch();
  const dispachCompany = (myCompany: Company) => {
    dispatch(changeCompamy(prop.company));
  };

  return (
    <div>
      <>
        company name: {prop.company.companyName}
        company email: {prop.company.email}
        company issue date: {prop.company.dateCreated}
        <button>Delete</button>{" "}
        <button
          onClick={() => {
            dispachCompany(prop.company);
          }}
        >
          Edit
        </button>
      </>
    </div>
  );
};

export default UpdateCompany;
