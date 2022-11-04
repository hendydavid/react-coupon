import React from "react";
import PopUp from "../shared/PopUp";

function Error() {
  return (
    <div className="app">
      <PopUp message="Somthing Went Wrong..."></PopUp>
      <a href="/">return home page </a>
    </div>
  );
}

export default Error;
