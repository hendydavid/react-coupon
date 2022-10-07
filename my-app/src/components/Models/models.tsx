export interface Coupon {
  couponId: Number;
  couponName: String;
  description: String;
  company: Number;
  customers: Customer[];
  amount: Number;
  price: Number;
  categoryId: Number;
  imageURL?: String;
  startDate: Date;
  endDate: Date;
}

export interface Customer {
  customerId: Number;
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  coupons: Coupon[];
}

export interface Company {
    companyId:Number,
    companyName:String
    email:String
    password:String
    dateCreated:Date
    coupons:Coupon[], 
}
