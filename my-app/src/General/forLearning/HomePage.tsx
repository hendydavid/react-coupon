import React from "react";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
         <Outlet /> 
      Main Home-Page
    

    </div>
  );
};
export default HomePage;
