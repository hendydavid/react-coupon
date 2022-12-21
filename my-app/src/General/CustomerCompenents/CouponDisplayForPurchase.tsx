import { Coupon } from "../Models/models";
import { iconsList } from "../Utils/Icon";
import "../css-files/App.css";
import { getKeyByValue } from "../Utils/Category";
import { API_URL, getToken } from "../Utils/APIWrapper";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeMessage } from "../Redux/ErrorMessage";
import { changeLoadingMode } from "../Redux/LoadingCircleIcon";
type Props = {
  coupon: Coupon;
};
const formatter = new Intl.NumberFormat("he-IL", {
  style: "currency",
  currency: "ILS",
});
const CouponDisplayForPurchase = (props: Props) => {
  let coupon = props.coupon;

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

  const addCouponPurchased = async (couponId: number) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token: getToken() },
      body: "",
    };
    setLoadingMode(true);
    const response = await fetch(
      `${API_URL}customers/addCouponPurchase/${couponId}`,
      requestOptions
    );

    if (response.ok) {
      setLoadingMode(false);
    } else if (!response.ok) {
      const error = await response.json();
      getErrorMessage(error.value);
      setLoadingMode(false);
    }
  };

  return (
    <div className="purchased">
      <div className="coupon-and-image">
        <img
          src={`https://picsum.photos/id/${Math.round(
            Math.random() * 120
          )}/200/299`}
          alt=""
        />
        <div
          className="data-display"
          style={{ display: "flex", flexDirection: "column", width: "300px" }}
        >
          {iconsList.coupon("30")}
          <h4>Name:</h4>
          <p>{coupon.couponName}</p>
          <h4>Coupon price:</h4>
          <p>{coupon.price}</p>
          <h4>Coupon category:</h4>
          <p>{getKeyByValue(coupon.categoryId)}</p>
          <h4>Coupon description:</h4>

          <p>{coupon.description}</p>

          <h4>Amount of coupons available : </h4>
          <p>{coupon.amount}</p>
          <h4>Coupon current expiration date:</h4>
          <p>{`${String(coupon.endDate).slice(0, 10)}`}</p>
        </div>
      </div>
      <button
        className="btn btn-buy"
        onClick={() => {
          if (
            window.confirm(
              "you confirm to purchase this coupon for " +
                formatter.format(coupon.price)
            )
          ) {
            addCouponPurchased(coupon.couponId);
          }
        }}
      >
        Buy It Now!
      </button>
    </div>
  );
};

export default CouponDisplayForPurchase;
