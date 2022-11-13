import React, { useEffect, useState } from "react";
import UpdateAndDeleteCoupon from "./UpdateAndDeleteCoupon";
import { Coupon } from "../Models/models";
import Pagination from "../Utils/Pagination";
import { getToken } from "../Utils/APIWrapper";
import { changeMessage } from "../Redux/ErrorMessage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeLoadingMode } from "../Redux/LoadingData";

const UpdateAndDeleteCouponsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getErrorMessage = (message: string) => {
    dispatch(changeMessage(message));
    navigate("error");
  };
  const setLoadingMode = (isLoading: boolean) => {
    dispatch(changeLoadingMode(isLoading));
  };

  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const postsPerPageToShow = (): number => {
    return window.innerWidth > 700 ? 9 : 10;
  };

  const fetchCoupons = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", token: getToken()}
    };

    const response = await fetch(
      "http://localhost:8080/companies/getAllCoupons",
      requestOptions
    );

    if (response.ok) {
      const data = await response.json();
      setCoupons(data);
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
  const currentPosts = coupons.slice(indexOfFirstPost, indexOfLastPost);

  const changepageNumber = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setLoadingMode(true);
    fetchCoupons();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let keyNumber = 1;

  return (
    <div>
      <div className="data-row">
        {currentPosts.map((coupon) => (
          <UpdateAndDeleteCoupon
            fetchCoupons={fetchCoupons}
            coupon={coupon}
            key={keyNumber++}
          ></UpdateAndDeleteCoupon>
        ))}
      </div>

      <Pagination
        totalPosts={coupons.length}
        postsPerPage={postsPerPage}
        setCurrentPage={changepageNumber}
        currentPage={currentPage}
      ></Pagination>
    </div>
  );
};

export default UpdateAndDeleteCouponsList;
