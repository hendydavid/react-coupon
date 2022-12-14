import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { changeMessage } from "../Redux/ErrorMessage";
import { keysAndValyeUrlForCustomer } from "../Routing";
import Footer from "../shared/Footer";
import Header from "../shared/Header";
import PopUp from "../shared/PopUp";
import { API_URL, getToken, getType } from "../Utils/APIWrapper";

const CustomerNavBar = () => {
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const unauthorizedAccess = (): JSX.Element => {
    dispatch(changeMessage("you are not allow to access this page"));
    return <PopUp pageToNavigate={"/"}></PopUp>;
  };
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", token: getToken() },
    };
    fetch(`${API_URL}customers/getFirstAndLastName`, requestOptions)
      .then((res) => res.text())
      .then((text) => setUserName(text));
  }, []);

  return (
    <>
      {!getType("CUSTOMER")? (
        unauthorizedAccess()
      ) : (
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
      )}
    </>
  );
};

export default CustomerNavBar;
