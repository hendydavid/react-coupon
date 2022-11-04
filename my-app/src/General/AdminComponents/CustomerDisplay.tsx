import { Customer } from "../Models/models";
import { iconsList } from "../Utils/Icon";

type Props = {
  customer: Customer;
};

const CustomerDisplay = (props: Props) => {
  const customer = props.customer;

  return (
    <div className="data-display">
      {iconsList.customer("")}
      <h4>Name:</h4>
      <p>
        {`${customer.firstName}`} {`${customer.firstName}`}
      </p>
      <h4>the total coupon has been purchased:</h4>
      <p>{customer.coupons.length}</p>
      <h4>Email:</h4>
      <p>{customer.email}</p>
    </div>
  );
};

export default CustomerDisplay;
