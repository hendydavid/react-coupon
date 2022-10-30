import { Customer } from "../Models/models";

type Props = {
  customer: Customer;
};

const CustomerDisplay = (props: Props) => {
  const customer = props.customer;

  return (
    <div>
      {customer.firstName},{customer.lastName},
      {"the total coupon has been purchased is:" + customer.coupons.length},
      {customer.email}
    </div>
  );
};

export default CustomerDisplay;
