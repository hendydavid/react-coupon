import React, { useEffect, useState } from "react";
import CompanyDisplay from "./CompanyDisplay";

const GetAllCompany = () => {
  const [companies, setCompany] = useState([]);

  const fetchCompany = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", token: "token" },
    };

    const response = await fetch(
      "http://localhost:8080/admin/getAllCompanies",
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      setCompany(data);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchCompany();
  }, []);

  let keyNumber = 1;

  return (
    <div>
      {companies.map((company) => (
        <CompanyDisplay company={company} key={keyNumber++}></CompanyDisplay>
      ))}
    </div>
  );
};
export default GetAllCompany;
