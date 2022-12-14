export interface Coupon {
  couponId: number;
  couponName: string;
  description: string;
  company?: Company|any;
  customers: Customer[]|any;
  amount: number;
  price: number;
  categoryId: number;
  imageURL: string;
  startDate?: Date;
  endDate?: Date;
}

export interface Customer {
  customerId: Number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  coupons: Coupon[];
}

export interface Company {
  companyId: Number;
  companyName: string;
  email: string;
  password: string;
  dateCreated: Date;
  coupons: Coupon[];
}

export interface PagesLinks {
  key: string;
  value: string;
}
