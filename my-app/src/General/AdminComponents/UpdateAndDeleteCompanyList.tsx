import React, { useEffect, useState } from "react";
import { Company } from "../Models/models";
import UpdateAndDeleteCompany from "./UpdateAndDeleteCompany";

const UpdateAndDeleteCompanyList = () => {
 const [reloading,setLoading] = useState(true) 
 let keyNumber =1;
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
  let counter = 1;
  return (
    <div>
      {companies.map((company) => (
       <UpdateAndDeleteCompany company={company} key={keyNumber++}></UpdateAndDeleteCompany>
      ))}
    </div>
  );
};

export default UpdateAndDeleteCompanyList;
