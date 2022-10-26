import React from "react";
import { Outlet } from "react-router-dom";
import Routing from "./Routing";

const Main = () => {
  return (
    <div>
      <Routing></Routing>
      <Outlet />
    </div>
  );
};

export default Main;
