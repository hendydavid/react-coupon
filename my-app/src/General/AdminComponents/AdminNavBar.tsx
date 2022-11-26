import React from "react";
import { Outlet } from "react-router-dom";
import { keysAndValyeUrlForAdmin } from "../Routing";
import Footer from "../shared/Footer";
import Header from "../shared/Header";
import { useDispatch } from "react-redux";
import {getType } from "../Utils/APIWrapper";
import { changeMessage } from "../Redux/ErrorMessage";
import PopUp from "../shared/PopUp";
const AdminNavBar = () => {
  const dispatch = useDispatch();
  const unauthorizedAccess = (): JSX.Element => {
    dispatch(changeMessage("you are not allow to access this page"));
    return <PopUp pageToNavigate={"/"}></PopUp>;
  };

  return (
    <>
      {!getType("ADMIN") ? (
        unauthorizedAccess()
      ) : (
        <div>
          <Header
            pages={keysAndValyeUrlForAdmin()}
            userInfo={{
              firstName: "Admin",
              type: "admin",
            }}
          ></Header>
          <Outlet></Outlet>
          <Footer></Footer>
        </div>
      )}
    </>
  );
};

export default AdminNavBar;
