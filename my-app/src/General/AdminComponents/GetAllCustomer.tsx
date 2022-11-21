import React, { useEffect, useState } from "react";
import Pagination from "../Utils/Pagination";
import { Customer } from "../Models/models";
import CustomerDisplay from "./CustomerDisplay";
import { getToken } from "../Utils/APIWrapper";
import { changeMessage } from "../Redux/ErrorMessage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeLoadingMode } from "../Redux/LoadingData";
import PaginationList from "../Utils/PagninationList";

const GetAllCustomer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getErrorMessage = (message: string) => {
    dispatch(changeMessage(message));
    navigate("error");
  };
  const setLoadingMode = (isLoading: boolean) => {
    dispatch(changeLoadingMode(isLoading));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [customersList, setCustomers] = useState([]);
  const [totalPosts, setTotalPost] = useState(0);

  let keyNumber = 1;
  const fetchCustomer = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", token: getToken() },
    };

    const response = await fetch(
      `http://localhost:8080/admin/getAllCustomers?pageNum=${currentPage-1}`,
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      setCustomers(data.content);
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
    fetchCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div>
      <div className="data-row">
        {customersList.map((customer) => (
          <CustomerDisplay
            customer={customer}
            key={keyNumber++}
          ></CustomerDisplay>
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

export default GetAllCustomer;
