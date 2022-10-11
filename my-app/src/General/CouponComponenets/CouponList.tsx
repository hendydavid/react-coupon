
import { Coupon } from "../Models/models";
import CouponShow from "./CouponShow";


type Props = {
    coupons: Coupon[]
}

const CouponList = (props: Props) => {
    return (
        <ul>
            {props.coupons.map((c) =>
                <CouponShow
                    image={c.imageURL}
                    description={c.description}
                    price={c.price}
                />
            )}
        </ul>
    );
}

export default CouponList;
