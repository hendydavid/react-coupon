import React, { useEffect, useState } from "react";
import UpdateAndDeleteCompany from "./UpdateAndDeleteCompany";
import { useDispatch } from "react-redux";
import { getToken,API_URL } from "../Utils/APIWrapper";
import { useNavigate } from "react-router-dom";
import { changeMessage } from "../Redux/ErrorMessage";
import { changeLoadingMode } from "../Redux/LoadingCircleIcon";
import PaginationList from "../Utils/PagninationList";
const UpdateAndDeleteCompanyList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getErrorMessage = (message: string) => {
    dispatch(changeMessage(message));
    navigate("/error");
  };

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
      `${API_URL}admin/getAllCompanies?pageNum=${currentPage - 1}`,
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

  let keyNumber = 1;
  useEffect(() => {
    fetchCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div>
      <div className="data-row">
        {companiesList.map((company) => (
          <UpdateAndDeleteCompany
            company={company}
            fetchCompanies={() => fetchCompanies()}
            key={keyNumber++}
          ></UpdateAndDeleteCompany>
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

export default UpdateAndDeleteCompanyList;
