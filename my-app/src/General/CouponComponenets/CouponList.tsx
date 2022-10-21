import { Coupon } from "../Models/models";
import CouponShow from "./CouponShow";

type Props = {
  coupons: Coupon[];
};

const CouponList = (props: Props) => {
  var i =0;
  return (
    <>
      {props.coupons.length === 0 ? (
        <div>No Coupons Yet</div>
      ) : (
        <ul>
          {props.coupons.map((c) => (
            <CouponShow
              key={i++}
              image={c.imageURL}
              description={c.description}
              price={c.price}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default CouponList;
