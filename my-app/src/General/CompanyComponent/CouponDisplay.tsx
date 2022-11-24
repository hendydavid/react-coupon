import { Coupon } from "../Models/models";
import { iconsList } from "../Utils/Icon";
import "../css-files/App.css";
import { getKeyByValue } from "../Utils/Category";
type Props = {
  coupon: Coupon;
};

const CouponDisplay = (props: Props) => {
  let coupon = props.coupon;

  return (
    <div style={{ display: "flex", alignItems: "center", margin: "auto" ,paddingBottom:'3px'}}  className="couponWraper">
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
  );
};

export default CouponDisplay;
