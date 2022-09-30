import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import Admin from "./Admin";
import Coupon from "./Coupon";
import "../css-files/App.css";
import Customer from "./Customer";
import Error from "./Error";
import HomePage from "./HomePage";

function App() {
  return (
    <Router>
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
      </>
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
    </Router>
  );
}

export default App;
