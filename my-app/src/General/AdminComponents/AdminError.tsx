import React from "react";
import { useParams } from "react-router-dom";

const AdminError = () => {
  let { errorMessage } = useParams();

  return <div className="error">your error is: {errorMessage}</div>;
};

export default AdminError;
