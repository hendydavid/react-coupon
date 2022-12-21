import { Company, Coupon, Customer } from "../Models/models";

interface LoginInfo {
  email: string;
  password: string;
  forwardLogin: () => void;
  forwardError: (error: string) => void;
}

export type APIResponseHandler = {
  onSuccess: () => void;
  onFail: (error: string) => void;
};

const DefaultAPIResponseHandler: APIResponseHandler = {
  onSuccess: () => {},
  onFail: (err) => {},
};

export const getToken = (): string => {
  let token = String(window.localStorage.getItem("token"));
  return token;
};
export const getType = (type: string): boolean => {
  let typeFromStorage = String(window.localStorage.getItem("type"));
  return typeFromStorage === type;
};
export const API_URL = "https://davidhendy-coupon-project.herokuapp.com/";

const adminLogin = async (loginDetails: LoginInfo) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", token: "token" },
    body: JSON.stringify(loginDetails),
  };

  const response = await fetch(API_URL + "admin/loginAdmin", requestOptions);

  if (response.ok) {
    let token = await response.text();
    window.localStorage.setItem("token", token);
    loginDetails.forwardLogin();
  } else if (!response.ok) {
    let error = await response.json();
    loginDetails.forwardError(error.value);
  }
};
const customerLogin = async (loginDetails: LoginInfo) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", token: "token" },
    body: JSON.stringify(loginDetails),
  };

  const response = await fetch(
    API_URL + "customers/loginCustomer",
    requestOptions
  );

  if (response.ok) {
    let token = await response.text();
    window.localStorage.setItem("token", token);
    loginDetails.forwardLogin();
  } else if (!response.ok) {
    const error = await response.json();
    loginDetails.forwardError(error.value);
  }
};
const companyLogin = async (loginDetails: LoginInfo) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", token: "token" },
    body: JSON.stringify(loginDetails),
  };

  const response = await fetch(
    API_URL + "companies/loginCompany",
    requestOptions
  );

  if (response.ok) {
    let token = await response.text();
    window.localStorage.setItem("token", token);
    loginDetails.forwardLogin();
  } else if (!response.ok) {
    const error = await response.json();
    loginDetails.forwardError(error.value);
  }
};

const addCompanyHandler = async (
  company: Company,
  responseHandler: APIResponseHandler = DefaultAPIResponseHandler
) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", token: getToken() },
    body: JSON.stringify(company),
  };

  const response = await fetch(API_URL + "admin/addCompany", requestOptions);
  if (response.ok) {
    responseHandler.onSuccess();
  } else if (!response.ok) {
    const error = await response.json();
    responseHandler.onFail(error.value);
    console.log(error);
  }
};

const updateCompanyHandler = async (
  company: Company,
  responseHandler: APIResponseHandler = DefaultAPIResponseHandler
) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", token: getToken() },
    body: JSON.stringify(company),
  };

  const response = await fetch(API_URL + "admin/updateCompany", requestOptions);

  if (!response.ok) {
    const error = await response.json();
    responseHandler.onFail(error.value);
  }
};

const deleteCompanyHandler = async (
  companyId: number,
  responseHandler: APIResponseHandler = DefaultAPIResponseHandler
) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", token: getToken() },
  };

  const response = await fetch(
    API_URL + "admin/deleteCompany/" + companyId,
    requestOptions
  );

  if (response.ok) {
    responseHandler.onSuccess();
  } else {
    const error = await response.json();
    responseHandler.onFail(error.value);
  }
};

const addCustomerHandler = async (
  customer: Customer,
  responseHandler: APIResponseHandler = DefaultAPIResponseHandler
) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", token: getToken() },
    body: JSON.stringify(customer),
  };

  const response = await fetch(API_URL + "admin/addCustomer", requestOptions);

  if (!response.ok) {
    const error = await response.json();
    responseHandler.onFail(error.value);
    return 1;
  }
  return 0;
};

const updateCustomerHandler = async (
  customer: Customer,
  responseHandler: APIResponseHandler = DefaultAPIResponseHandler
) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", token: getToken() },
    body: JSON.stringify(customer),
  };

  const response = await fetch(
    API_URL + "admin/updateCustomer",
    requestOptions
  );

  if (!response.ok) {
    const error = await response.json();
    responseHandler.onFail(error.value);
  }
};

const deleteCustomerHandler = async (
  customer: Customer,
  responseHandler: APIResponseHandler = DefaultAPIResponseHandler
) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", token: getToken() },
    body: "",
  };

  const response = await fetch(
    API_URL + "admin/deleteCustomer/" + customer.customerId,
    requestOptions
  );
  if (response.ok) {
    const data = await response.text();
    data === "false" && responseHandler.onSuccess();
  } else {
    const error = await response.json();
    responseHandler.onFail(error.value);
  }
};

export const API = {
  // admin components
  addCompany: addCompanyHandler,
  updateCompany: updateCompanyHandler,
  deleteCompany: deleteCompanyHandler,

  addCustomer: addCustomerHandler,
  deleteCustomer: deleteCustomerHandler,
  updateCustomer: updateCustomerHandler,
  adminLogin: adminLogin,
  companyLogin: companyLogin,
  customerLogin: customerLogin,
};

const addCoupon = async (
  coupon: Coupon,
  responseHandler: APIResponseHandler = DefaultAPIResponseHandler
) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", token: getToken() },
    body: JSON.stringify(coupon),
  };

  const response = await fetch(API_URL + "companies/addCoupon", requestOptions);
  if (response.ok) {
  } else {
    const error = await response.json();
    responseHandler.onFail(error.value);
  }
};
const deleteCouponHandler = async (
  couponId: number,
  responseHandler: APIResponseHandler = DefaultAPIResponseHandler
) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", token: getToken() },
    body: "",
  };

  const response = await fetch(
    API_URL + "companies/deleteCoupon/" + couponId,
    requestOptions
  );
  if (response.ok) {
    responseHandler.onSuccess();
  } else {
    const error = await response.json();
    responseHandler.onFail(error.value);
  }
};
const updateCouponHandler = async (
  coupon: Coupon,
  responseHandler: APIResponseHandler = DefaultAPIResponseHandler
) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", token: getToken() },
    body: JSON.stringify(coupon),
  };

  const response = await fetch(
    API_URL + "companies/updateCoupon",
    requestOptions
  );

  if (!response.ok) {
    const error = await response.json();
    responseHandler.onFail(error.value);
  }
};

export const CompanyApi = {
  // compsny components
  addCoupon: addCoupon,
  deleteCoupon: deleteCouponHandler,
  updateCoupon: updateCouponHandler,
};
