import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../css-files/App.css";
import LoginPage from "./LoginPage";

function Error() {
  return (
    <div className="app">
     I am an error
     <a href="/admin">return home page </a>
    </div>
  );
}

export default Error;
