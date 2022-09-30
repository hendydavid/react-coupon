import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../css-files/App.css";
import { useParams } from "react-router-dom";

function Customer() {
  let { username } = useParams();
  return <div className="app">hello {username}</div>;
}

export default Customer;
