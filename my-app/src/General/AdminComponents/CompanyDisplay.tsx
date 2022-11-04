import React from "react";
import { Company } from "../Models/models";
import { iconsList } from "../Utils/Icon";

type Prop = {
  company: Company;
};
const CompanyDisplay = (prop: Prop) => {
  const company = prop.company;
  return (
 
      <div className="data-display">
        {iconsList.company("")}
        <h4>Name:</h4>
        <p>{company.companyName}</p>
        <h4>the total coupon has been created:</h4>
        <p>{company.coupons.length + " coupons"}</p>
        <h4>Email:</h4>
        <p>{company.email}</p>
        <h4>Company Created Date:</h4>
        <p>{`${String(company.dateCreated).slice(0, 10)}`}</p>
      
    </div>
  );
};

export default CompanyDisplay;
