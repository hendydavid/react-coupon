import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllCouponOfCompany from "./AllCouponOfCompany";

function Admin() {
  const [active, setActive] = useState(false);

  const showMeData = (): JSX.Element => {
    return <AllCouponOfCompany isActive={true}></AllCouponOfCompany>;
  };

  return (
    <>


      I am an admin
      {active && showMeData}
     
      <button
        onClick={() => {
          setActive(!active);
        }}
      >
        show me data
      </button>
      
      <div>stam to check </div>
    

    </>
  );
}

export default Admin;
