import React, { useEffect, useState } from "react";
import UpdateAndDeleteCompany from "./UpdateAndDeleteCompany";
import { useDispatch } from "react-redux";
import { changeCompany } from "../Redux/UpdateCompanySlice";
import Pagination from "../../Utils/Pagination";

const UpdateAndDeleteCompanyList = () => {
  
  const dispatch = useDispatch();

  const [companies, setCompany] = useState([]);

  const fetchCompanies = async () => {
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
      dispatch(changeCompany(data));
      setCompany(data);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = companies.slice(indexOfFirstPost, indexOfLastPost);

  const changepageNumber = (pageNumber: number) => setCurrentPage(pageNumber);

  let keyNumber = 1;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companies]);

  return (
    <div>
      {currentPosts.map((company) => (
        <UpdateAndDeleteCompany
          company={company}
          fetchCompanies={fetchCompanies}
          key={keyNumber++}
        ></UpdateAndDeleteCompany>
      ))}
      <Pagination
        totalPosts={companies.length}
        postsPerPage={postsPerPage}
        setCurrentPage={changepageNumber}
      ></Pagination>
    </div>
  );
};

export default UpdateAndDeleteCompanyList;
