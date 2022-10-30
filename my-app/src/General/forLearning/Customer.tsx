import React from "react";
import { useParams } from "react-router-dom";

function Customer() {
  let { username } = useParams();
  return <div
  
  className="app">hello {username}
  </div>;
}

export default Customer;
