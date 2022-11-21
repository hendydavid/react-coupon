import React, { useEffect, useState } from "react";
import Pagination from "../Utils/Pagination";
import CompanyDisplay from "./CompanyDisplay";
import { APIResponseHandler, getToken } from "../Utils/APIWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeMessage } from "../Redux/ErrorMessage";
import { changeLoadingMode } from "../Redux/LoadingData";
import PaginationList from "../Utils/PagninationList";

const GetAllCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getErrorMessage = (message: string) => {
    dispatch(changeMessage(message));
    navigate("error");
  };

  const loadingMode = useSelector((state: any) => state.loadingData.value);

  const setLoadingMode = (isLoading: boolean) => {
    dispatch(changeLoadingMode(isLoading));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [companiesList, setCompanies] = useState([]);
  const [totalPosts, setTotalPost] = useState(0);

  const fetchCompanies = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", token: getToken() },
    };

    const response = await fetch(
      `http://localhost:8080/admin/getAllCompanies?pageNum=${currentPage - 1}`,
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      setCompanies(data.content);
      setTotalPost(data.totalElements);
      setLoadingMode(false);
    } else {
      const error = await response.json();
      getErrorMessage(error.value);
      setLoadingMode(false);
    }
  };

  useEffect(() => {
    setLoadingMode(true);
    fetchCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  let keyNumber = 1;

  return (
    <div>
      <div className="data-row">
        {companiesList.map((company) => (
          <CompanyDisplay company={company} key={keyNumber++}></CompanyDisplay>
        ))}
      </div>

      <PaginationList
        postsPerPage={8}
        totalPosts={totalPosts}
        setCurrentPage={(pageNumber: number) => setCurrentPage(pageNumber)}
        currentPage={currentPage}
      ></PaginationList>
    </div>
  );
};
export default GetAllCompany;
