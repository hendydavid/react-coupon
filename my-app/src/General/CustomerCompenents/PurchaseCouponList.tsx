import React, { useEffect, useState } from "react";
import { getToken } from "../Utils/APIWrapper";
import { changeMessage } from "../Redux/ErrorMessage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeLoadingMode } from "../Redux/LoadingData";
import CouponDisplayForPurchase from "./CouponDisplayForPurchase";
import PaginationList from "../Utils/PagninationList";

const PurchaseCouponsList = () => {
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
  const [couponList, setCoupons] = useState([]);
  const [totalPosts, setTotalPost] = useState(0);

  const fetchCoupons = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", token: getToken() },
    };

    const response = await fetch(
      `http://localhost:8080/customers/getAllCoupons?pageNum=${currentPage - 1}`,
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

  useEffect(() => {
    setLoadingMode(true);
    fetchCoupons();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  let keyNumber = 1;

  return (
    <div>
      {couponList.length <= 0 && <div className="btn">No Coupon Yet.. </div>}

      <div>
        <div className="coupon-purchase">
          {couponList.map((coupon) => (
            <CouponDisplayForPurchase
              coupon={coupon}
              key={keyNumber++}
            ></CouponDisplayForPurchase>
          ))}
        </div>

        <PaginationList
          postsPerPage={8}
          totalPosts={totalPosts}
          setCurrentPage={(pageNumber: number) => setCurrentPage(pageNumber)}
          currentPage={currentPage}
        ></PaginationList>
      </div>
    </div>
  );
};

export default PurchaseCouponsList;
