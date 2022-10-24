import React from "react";
import { Company } from "../Models/models";

type Prop = {
  company: Company;
};
const CompanyDisplay = (prop: Prop) => {
  const company = prop.company;
  return (
    <div>
      {company.companyName},
      {"the total coupon has been created is:" + company.coupons.length},
      {company.email}
      {`company create in ${company.dateCreated}`}
    </div>
  );
};

export default CompanyDisplay;
