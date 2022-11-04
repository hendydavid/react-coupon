import React, { useCallback, useEffect, useState } from "react";
import UpdateAndDeleteCompany from "./UpdateAndDeleteCompany";
import { useDispatch, useSelector } from "react-redux";
import { changeCompany } from "../Redux/UpdateCompanySlice";
import Pagination from "../Utils/Pagination";

const UpdateAndDeleteCompanyList = () => {
  const dispatch = useDispatch();
  const postsPerPageToShow = (): number => {
    return window.innerWidth > 700 ? 9 : 10;
  };

  const [companies, setCompanies] = useState([]);

  const fetchCompanies = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", token: "token" },
    };

    //   "http://localhost:8080/admin/getAllCompanies",
    //   requestOptions
    // );

    fetch("http://localhost:8080/admin/getAllCompanies", requestOptions)
      .then((response) => response.json())

      .then((resJson) => {
        setCompanies(resJson);
        dispatch(changeCompany(companies));
      })

      .catch((error) =>
        console.log("error beem occured" + JSON.stringify(error))
      );

    // if (response.ok) {
    //   const data = await response.json();
    //   setCompanies(data);
    //   dispatch(changeCompany(data));
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    console.log("render again");
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
