import React, { useEffect, useState } from "react";
import UpdateAndDeleteCompany from "./UpdateAndDeleteCompany";
import { useDispatch } from "react-redux";
import Pagination from "../Utils/Pagination";
import { getToken } from "../Utils/APIWrapper";
const UpdateAndDeleteCompanyList = () => {

  const postsPerPageToShow = (): number => {
    return window.innerWidth > 700 ? 9 : 10;
  };

  const [companies, setCompanies] = useState([]);

  const fetchCompanies = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", token: getToken() },
    };
    const response = await fetch(
      "http://localhost:8080/admin/getAllCompanies",
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      setCompanies(data);
    } else {
      console.log(response.json());
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(postsPerPageToShow());

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = companies.slice(indexOfFirstPost, indexOfLastPost);

  const changepageNumber = (pageNumber: number) => setCurrentPage(pageNumber);

  let keyNumber = 1;
  useEffect(() => {
    fetchCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="data-row">
        {currentPosts.map((company) => (
          <UpdateAndDeleteCompany
            company={company}
            fetchCompanies={() => fetchCompanies()}
            key={keyNumber++}
          ></UpdateAndDeleteCompany>
        ))}
      </div>

      <Pagination
        totalPosts={companies.length}
        postsPerPage={postsPerPage}
        setCurrentPage={changepageNumber}
        currentPage={currentPage}
      ></Pagination>
    </div>
  );
};

export default UpdateAndDeleteCompanyList;
