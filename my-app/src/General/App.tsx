import "./css-files/App.css";
import Main from "./Main";
import { iconsList } from "../Utils/Icon";
import { useState } from "react";
import { API } from "../Utils/APIWrapper";

const App = () => {
  return (
    <div className="container">
      {/* <div className="stam">
        {iconsList.delete(10)}
        {iconsList.edit(10)}
      </div> */}

      <Main></Main>
      <div></div>
    </div>
  );
};

export default App;
