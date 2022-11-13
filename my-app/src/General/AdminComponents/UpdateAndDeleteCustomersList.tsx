import React, { useEffect, useState } from "react";
import UpdateAndDeleteCustomer from "./UpdateAndDeleteCustomer";
import { Customer } from "../Models/models";
import Pagination from "../Utils/Pagination";
import { getToken } from "../Utils/APIWrapper";
import { changeMessage } from "../Redux/ErrorMessage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeLoadingMode } from "../Redux/LoadingData";

const UpdateAndDeleteCustomersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getErrorMessage = (message: string) => {
    dispatch(changeMessage(message));
    navigate("error");
  };
  const setLoadingMode = (isLoading: boolean) => {
    dispatch(changeLoadingMode(isLoading));
  };

  const [customers, setCustomers] = useState<Customer[]>([]);

  const postsPerPageToShow = (): number => {
    return window.innerWidth > 700 ? 9 : 10;
  };

  const fetchCustomers = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", token: getToken() },
    };

    const response = await fetch(
      "http://localhost:8080/admin/getAllCustomers",
      requestOptions
    );

    if (response.ok) {
      const data = await response.json();
      setCustomers(data);
      setLoadingMode(false);
    } else if (!response.ok) {
      const error = await response.json();
      getErrorMessage(error.value);
      setLoadingMode(false);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(postsPerPageToShow());

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = customers.slice(indexOfFirstPost, indexOfLastPost);

  const changepageNumber = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setLoadingMode(true);
    fetchCustomers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let keyNumber = 1;

  return (
    <div>
      <div className="data-row">
        {currentPosts.map((customer) => (
          <UpdateAndDeleteCustomer
            fetchCustomers={fetchCustomers}
            customer={customer}
            key={keyNumber++}
          ></UpdateAndDeleteCustomer>
        ))}
      </div>

      <Pagination
        totalPosts={customers.length}
        postsPerPage={postsPerPage}
        setCurrentPage={changepageNumber}
        currentPage={currentPage}
      ></Pagination>
    </div>
  );
};

export default UpdateAndDeleteCustomersList;
