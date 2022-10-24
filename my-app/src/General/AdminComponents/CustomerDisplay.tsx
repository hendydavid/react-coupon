import React from "react";
import { Customer } from "../Models/models";

type Props = {
  customer: Customer;
};

const CustomerDisplay = (props: Props) => {
  const customer = props.customer;

  return (
    <div>
      {customer.firstName},{customer.lastName},
      {"the total coupon has been purchased is:" + customer.coupons.length},
      {customer.email}
    </div>
  );
};

export default CustomerDisplay;

// type Prop = {
//     company: Company;
//   };
//   const CompanyDisplay = (prop: Prop) => {
//     const company = prop.company;
//     return (
//       <div>
//         {company.companyName},
//         {"the total coupon has been created is:" + company.coupons.length},
//         {company.email}
//         {`company create in ${company.dateCreated}`}
//       </div>
//     );
//   };

//   export default CompanyDisplay;
