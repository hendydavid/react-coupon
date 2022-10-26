import React from "react";
import { Outlet } from "react-router-dom";

const AdminNavBar = () => {
  return (
    <>
      <div> Here Will BeAdmin Nav Bar</div>
      <Outlet></Outlet>
    </>
  );
};

export default AdminNavBar;
