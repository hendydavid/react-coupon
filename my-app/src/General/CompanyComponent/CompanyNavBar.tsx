import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { changeMessage } from "../Redux/ErrorMessage";
import { keysAndValyeUrlForCompany } from "../Routing";
import Footer from "../shared/Footer";
import Header from "../shared/Header";
import PopUp from "../shared/PopUp";
import { getToken, getType } from "../Utils/APIWrapper";
import { useDispatch } from "react-redux";

const CompanyNavBar = () => {
  const dispatch = useDispatch();
  const unauthorizedAccess = (): JSX.Element => {
    dispatch(changeMessage("you are not allow to access this page"));
    return <PopUp pageToNavigate={"/"}></PopUp>;
  };

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
    <>
      {!getType("COMPANY") ? (
        unauthorizedAccess()
      ) : (
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
      )}
    </>
  );
};

export default CompanyNavBar; 