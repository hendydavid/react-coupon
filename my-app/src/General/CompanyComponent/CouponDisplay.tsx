import { Coupon } from "../Models/models";
import { iconsList } from "../Utils/Icon";

type Props = {
  coupon: Coupon;
};

const CouponDisplay = (props: Props) => {
  let coupon = props.coupon;

  return (
    <div className="data-display">
      {iconsList.coupon("")}
      <h4>Name:</h4>
      <p>{coupon.couponName}</p>
      <h4>Coupon price:</h4>
      <p>{coupon.price}</p>
      <h4>Coupon description:</h4>
      <p>{coupon.description}</p>
      <h4>Amount of coupons available : </h4>
      <p>{coupon.amount}</p>
      <h4>Coupon current expiration date:</h4>
      <p>{`${String(coupon.endDate).slice(0, 10)}`}</p>
    </div>
  );
};

export default CouponDisplay;
