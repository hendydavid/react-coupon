import React, { useState } from "react";
type Prop = {
  id?: Number;
  isActive: Boolean;
};

const AllCouponOfCompany = (prop: Prop) => {
 
  const showData = ()=>{
  return <div>
    show Data
  </div>
  }
  
  return (
  
    <div>
      {prop.isActive? showData(): "nothing"}
    </div>
  );

};

export default AllCouponOfCompany;
