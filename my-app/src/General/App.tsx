import React, { useState } from "react";


import AddCompany from "./AdminComponents/AddCompany";
import CouponPage from "./CouponComponenets/CouponPage";

function App() {
  return (
    <>
      <AddCompany></AddCompany>
      <CouponPage couponId={7}></CouponPage>
    </>
  );
}

export default App;
