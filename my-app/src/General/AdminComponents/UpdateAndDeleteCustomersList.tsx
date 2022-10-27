import React, { useEffect, useState } from "react";
import UpdateAndDeleteCustomer from "./UpdateAndDeleteCustomer";
import { Customer } from "../Models/models";
import { useDispatch } from "react-redux";
import { changeCustomer } from "../Redux/UpdateCustomerSlice";
import Pagination from "../../Utils/Pagination";

const UpdateAndDeleteCustomersList = () => {
  const [reLoading, setReloading] = useState(false);

  const dispatch = useDispatch();
  const [customers, setCustomers] = useState<Customer[]>([]);

  const fetchCustomers = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", token: "token" },
    };

    const response = await fetch(
      "http://localhost:8080/admin/getAllCustomers",
      requestOptions
    );

    if (response.ok) {
      const data = await response.json();
      setCustomers(data);
      dispatch(changeCustomer(data));
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = customers.slice(indexOfFirstPost, indexOfLastPost);

  const changepageNumber = (pageNumber: number) => setCurrentPage(pageNumber);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchCustomers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customers]);

  let keyNumber = 1;

  return (
    <div>
      {currentPosts.map((customer) => (
        <UpdateAndDeleteCustomer
          fetchCustomers={fetchCustomers}
          customer={customer}
          key={keyNumber++}
        ></UpdateAndDeleteCustomer>
      ))}
      <Pagination
        totalPosts={customers.length}
        postsPerPage={postsPerPage}
        setCurrentPage={changepageNumber}
      ></Pagination>
    </div>
  );
};

export default UpdateAndDeleteCustomersList;
