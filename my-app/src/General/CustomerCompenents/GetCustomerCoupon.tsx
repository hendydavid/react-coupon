import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CouponDisplay from "../CompanyComponent/CouponDisplay";
import { changeMessage } from "../Redux/ErrorMessage";
import { changeLoadingMode } from "../Redux/LoadingCircleIcon";
import { API_URL, getToken } from "../Utils/APIWrapper";
import { optionsCategory } from "../Utils/Category";
import Pagination from "../Utils/Pagination";

const GetCustomerCoupon = () => {
  let counter = 1;
  const [customerCoupon, setCustomerCoupon] = useState([]);
  const getCustomerCoupon = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", token: getToken() },
    };
    setLoadingMode(true);
    const response = await fetch(
      `${API_URL}customers/getAllCustomerCoupon/`,
      requestOptions
    );

    if (response.ok) {
      const couponsOfCustomer = await response.json();
      setCustomerCoupon(couponsOfCustomer);
      setLoadingMode(false);
    } else if (!response.ok) {
      const error = await response.json();
      getErrorMessage(error.value);
      setLoadingMode(false);
    }
  };

  const [maxPrice, setPrice] = useState(0);
  const fetchCouponsByMaxPrice = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", token: getToken() },
    };
    if (maxPrice <= 0) {
      window.alert("please select price greater than zero");
    } else {
      setLoadingMode(true);
      const response = await fetch(
        `${API_URL}customers/getAllCustomerCoupon/customers/getCustomerCouponByMaxPrice/${maxPrice}`,
        requestOptions
      );

      if (response.ok) {
        const data = await response.json();
        setCustomerCoupon(data);
        setLoadingMode(false);
      } else if (!response.ok) {
        const error = await response.json();
        getErrorMessage(error.value);
        setLoadingMode(false);
      }
    }
  };

  const [categoryId, setCategory] = useState(0);
  const fetchCouponsByCategory = async () => {
    categoryId === 0 && setCategory(1);
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", token: getToken() },
    };
    setLoadingMode(true);
    const response = await fetch(
      `${API_URL}customers/getCustomerCouponByCategory/${categoryId}`,
      requestOptions
    );

    if (response.ok) {
      const data = await response.json();
      setCustomerCoupon(data);
      setLoadingMode(false);
    } else if (!response.ok) {
      const error = await response.json();
      getErrorMessage(error.value);
      setLoadingMode(false);
    }
  };

  //  pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = customerCoupon.slice(indexOfFirstPost, indexOfLastPost);

  const changepageNumber = (pageNumber: number) => setCurrentPage(pageNumber);

  // onFail and onSuccess handeling
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getErrorMessage = (message: string) => {
    dispatch(changeMessage(message));
    navigate("/error");
  };
  const setLoadingMode = (isLoading: boolean) => {
    dispatch(changeLoadingMode(isLoading));
  };
  useEffect(() => {
    console.log("i got here");
    getCustomerCoupon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="filter-menu">
        <div className="filter-option">
          <h4 className="title">Filter by max price</h4>
          <input
            type="number"
            onChange={(e) => {
              setPrice(Number(e.target.value));
              console.log(maxPrice);
            }}
          />
          <button className={"btn"} onClick={() => fetchCouponsByMaxPrice()}>
            Submit
          </button>
        </div>

        <div className="filter-option select-filter">
          <h4 className="title">filter by category</h4>
          <div className="select">
            <select
              id="format"
              onChange={(e) => {
                console.log("i am here");
                setCategory(Number(e.target.value));
              }}
            >
              {optionsCategory()}
            </select>
          </div>
          <button className={"btn"} onClick={() => fetchCouponsByCategory()}>
            Submit
          </button>
        </div>
      </div>

      <div>
        {customerCoupon.length <= 0 && (
          <div className="title">No Coupon Yet</div>
        )}
        <div className="coupon-data-row">
          {currentPosts.map((coupon) => (
            <CouponDisplay coupon={coupon} key={counter++}></CouponDisplay>
          ))}
        </div>
      </div>
      <Pagination
        totalPosts={customerCoupon.length}
        postsPerPage={postsPerPage}
        setCurrentPage={changepageNumber}
        currentPage={currentPage}
      ></Pagination>
    </>
  );
};

export default GetCustomerCoupon;
