import React, { useEffect, useState } from "react";
import { Company } from "../Models/models";
import UpdateCompany from "./UpdateCompany";


const UpdateCompanyList = () => {
  const companyArray = [
    {
      companyId: 0,
      companyName: "",
      email: "emailFromState",
      password: "",
      dateCreated: new Date(),
      coupons: [],
    },
  ];
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
  let counter =1;   
  return (
    <div>
      {companies.map((company) => (
        <UpdateCompany company={company} key={counter++}></UpdateCompany>
      ))}
    </div>
  );
};

export default UpdateCompanyList;
