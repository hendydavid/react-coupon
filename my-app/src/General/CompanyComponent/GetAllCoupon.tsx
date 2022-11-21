import React, { useEffect, useState } from "react";
import { Coupon } from "../Models/models";
import Pagination from "../Utils/Pagination";
import { getToken } from "../Utils/APIWrapper";
import { changeMessage } from "../Redux/ErrorMessage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeLoadingMode } from "../Redux/LoadingData";
import CouponDisplay from "./CouponDisplay";
import { optionsCategory } from "../Utils/Category";
import PaginationList from "../Utils/PagninationList";

const FetchType = {
  allCoupon: "All-Coupon-Fetching",
  categoryCoupon: "Category-Coupon-Fetching",
  dateCoupon: "Dates-Coupon-Fetching",
  maxPriceCoupon: "Max-Price-Coupon-Fetchin",
};

const GetAllCoupons = () => {
  const [fetchType, setFetchType] = useState(FetchType.allCoupon);
  //  pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [couponList, setCoupons] = useState([]);
  const [totalPosts, setTotalPost] = useState(0);

  const fetchCoupon = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", token: getToken() },
    };

    const response = await fetch(
      `http://localhost:8080/companies/getAllCoupons?pageNum=${
        currentPage - 1
      }`,
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      setCoupons(data.content);
      setTotalPost(data.totalElements);
      setLoadingMode(false);
    } else {
      const error = await response.json();
      getErrorMessage(error.value);
      setLoadingMode(false);
    }
  };

  let counter = 0;

  // filtering function
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
        `http://localhost:8080/companies/getCompanyCouponByMaxPrice/${maxPrice}?pageNum=${
          currentPage - 1
        }`,
        requestOptions
      );

      if (response.ok) {
        const data = await response.json();
        setCoupons(data.content);
        setTotalPost(data.totalElements);
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
      `http://localhost:8080/companies/getCompanyCouponByCategory/${categoryId}?pageNum=${
        currentPage - 1
      }`,
      requestOptions
    );

    if (response.ok) {
      const data = await response.json();
      setCoupons(data.content);
      setTotalPost(data.totalElements);
      setLoadingMode(false);
    } else if (!response.ok) {
      const error = await response.json();
      getErrorMessage(error.value);
      setLoadingMode(false);
    }
  };

  const initDates = { date1: new Date(), date2: new Date() };
  const [dates, setDates] = useState(initDates);
  const fetchCouponsByDate = async () => {
    if (dates.date1.getTime() >= dates.date2.getTime()) {
      window.alert("start date greater than end date");
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", token: getToken() },
        body: JSON.stringify(dates),
      };
      setLoadingMode(true);
      const response = await fetch(
        `http://localhost:8080/companies/getCouponsBetweenDates?pageNum=${
          currentPage - 1
        }`,
        requestOptions
      );

      if (response.ok) {
        const data = await response.json();
        setCoupons(data.content);
        setTotalPost(data.totalElements);
        setLoadingMode(false);
      } else if (!response.ok) {
        const error = await response.json();
        getErrorMessage(error.value);
        setLoadingMode(false);
      }
    }
  };

  // onFail and onSuccess handeling
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getErrorMessage = (message: string) => {
    dispatch(changeMessage(message));
    navigate("error");
  };
  const setLoadingMode = (isLoading: boolean) => {
    dispatch(changeLoadingMode(isLoading));
  };

  useEffect(() => {
    setLoadingMode(true);
    switch (fetchType) {
      case FetchType.allCoupon:
        fetchCoupon();
        break;
      case FetchType.categoryCoupon:
        fetchCouponsByCategory();
        break;
      case FetchType.dateCoupon:
        fetchCouponsByDate();
        break;
      case FetchType.maxPriceCoupon:
        fetchCouponsByMaxPrice();
        break;
    }
    fetchCoupon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <>
      {couponList.length <= 0 && <div>No Coupon Yet</div>}
      <div className="filter-menu">
        <div className="filter-option">
          <div style={{ display: "flex" }}>
            <div>
              <h4 className="title">start date</h4>
              <input
                className="btn"
                onChange={(e) => {
                  setDates((prev) => ({
                    ...prev,
                    date1: new Date(e.target.value.replace("-", ",")),
                  }));
                }}
                type="date"
              />
            </div>
            <div>
              <h4 className="title">end date</h4>
              <input
                className="btn"
                type="date"
                onChange={(e) => {
                  setDates((prev) => ({
                    ...prev,
                    date2: new Date(e.target.value.replace("-", ",")),
                  }));
                }}
              />
            </div>
          </div>

          <button
            className={"btn"}
            onClick={() => {
              setFetchType(FetchType.dateCoupon);
              setCurrentPage(1);
              fetchCouponsByDate();
            }}
          >
            Submit
          </button>
        </div>

        <div className="filter-option">
          <h4 className="title">Filter by max price</h4>
          <input
            type="number"
            onChange={(e) => {
              setPrice(Number(e.target.value));
              console.log(maxPrice);
            }}
          />
          <button
            className={"btn"}
            onClick={() => {
              setFetchType(FetchType.maxPriceCoupon);
              setCurrentPage(1);
              fetchCouponsByMaxPrice();
            }}
          >
            Submit
          </button>
        </div>

        <div className="filter-option">
          <h4 className="title">Get All Coupon</h4>

          <button
            className={"btn"}
            onClick={() => {
              setFetchType(FetchType.allCoupon);
              setCurrentPage(1);
              fetchCoupon();
            }}
          >
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
          <button
            className={"btn"}
            onClick={() => {
              setFetchType(FetchType.categoryCoupon);
              setCurrentPage(1);
              fetchCouponsByCategory();
            }}
          >
            Submit
          </button>
        </div>
      </div>

      <div>
        <div className="coupon-data-row">
          {couponList.map((coupon) => (
            <CouponDisplay coupon={coupon} key={counter++}></CouponDisplay>
          ))}
        </div>

        <PaginationList
          postsPerPage={8}
          totalPosts={totalPosts}
          setCurrentPage={(pageNumber: number) => setCurrentPage(pageNumber)}
          currentPage={currentPage}
        ></PaginationList>
      </div>
    </>
  );
};

export default GetAllCoupons;
