import React, { useEffect, useState } from "react";
import Pagination from "../Utils/Pagination";
import { Customer } from "../Models/models";
import CustomerDisplay from "./CustomerDisplay";
import { getToken } from "../Utils/APIWrapper";

const GetAllCustomer = () => {
  const postsPerPageToShow = (): number => {
    return window.innerWidth > 700 ? 9 : 10;
  };
  const [customersList, setCustomers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(postsPerPageToShow());

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = customersList.slice(indexOfFirstPost, indexOfLastPost);

  let keyNumber = 1;
  const fetchCustomer = async () => {
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
    } else {
      const error = await response.json();
      console.log(error.value);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  return (
    <div>
      <div className="data-row">
        {currentPosts.map((customer) => (
          <CustomerDisplay
            customer={customer}
            key={keyNumber++}
          ></CustomerDisplay>
        ))}
      </div>
      <Pagination
        totalPosts={customersList.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      ></Pagination>
    </div>
  );
};

export default GetAllCustomer;
