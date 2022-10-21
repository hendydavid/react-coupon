import { useState } from "react";
import { Link, NavLink, Route, Router, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Admin from "./Admin";
import Coupon from "./Coupon";
import Customer from "./Customer";
import HomePage from "./HomePage";
import Error from "./Error";

function MyApp() {
  const [backgroundColor, setBackground] = useState("black");
  function changeColor() {
    backgroundColor === "black"
      ? setBackground("white")
      : setBackground("black");
  }

  return (
    <BrowserRouter>
      <>
      <Link to={"coupon"}>Coupon</Link>
      <br />
      <Link to={"customer:i-came-from-link"}>Customer</Link>
      <br />
      {/* <Link to={"admin"}>Admin</Link> */}
      <NavLink
        to={"admin"}
        className={({ isActive }) => (isActive ? "link-active" : "link")}
      >
        Admin
      </NavLink>

      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route index element={<div>i am index default</div>} />
            <Route path="/admin" element={<Admin></Admin>} />
            <Route path="/coupon" element={<Coupon></Coupon>} />
            <Route path="/customer" element={<div>no-param!</div>} />
            <Route path="/customer/:username" element={<Customer></Customer>} />
            <Route path="*" element={<Error></Error>} />
          </Route>
        </Routes>
      </div>
      </>
    </BrowserRouter>
  );
}

export default MyApp;
