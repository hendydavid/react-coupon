import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./css-files/App.css";
import { useNavigate} from "react-router-dom";

function Coupon() {
  const nav = useNavigate();
  return (
    <div className="app">

     
      <button
        onClick={() => {
          nav("/admin");
        }}
      >
        Click Me
      </button>
      I am a coupon
    </div>
  );
}

export default Coupon;
