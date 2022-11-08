import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { keysAndValyeUrlForCustomer } from "../Routing";
import Footer from "../shared/Footer";
import Header from "../shared/Header";
import { getToken } from "../Utils/APIWrapper";

const CustomerNavBar = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", "token": getToken() },
    };
    fetch("http://localhost:8080/customers/getFirstAndLastName", requestOptions)
      .then((res) => res.text())
      .then((text) => setUserName(text));
  }, []);

  return (
    <div>
      <Header
        pages={keysAndValyeUrlForCustomer()}
        userInfo={{
          firstName: userName && userName,
          type: "customer",
        }}
      ></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default CustomerNavBar;
