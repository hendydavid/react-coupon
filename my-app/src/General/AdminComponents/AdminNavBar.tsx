import React from "react";
import { Outlet } from "react-router-dom";
import { keysAndValyeUrlForAdmin } from "../Routing";
import Footer from "../shared/Footer";
import Header from "../shared/Header";

const AdminNavBar = () => {
  return (
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
  );
};

export default AdminNavBar;
