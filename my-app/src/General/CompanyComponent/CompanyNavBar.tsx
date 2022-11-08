import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { keysAndValyeUrlForCompany } from "../Routing";
import Footer from "../shared/Footer";
import Header from "../shared/Header";
import { getToken } from "../Utils/APIWrapper";

const CompanyNavBar = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", token: getToken() },
    };
    fetch("http://localhost:8080/companies/getCompanyName", requestOptions)
      .then((res) => res.text())
      .then((text) => setUserName(text));
  }, []);

  return (
    <div>
      <Header
        pages={keysAndValyeUrlForCompany()}
        userInfo={{
          firstName: userName && userName,
          type: "company",
        }}
      ></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default CompanyNavBar;
