import { Company, Customer } from "../Models/models";

interface DeleteAndUpdatePromise {
  fetchData: () => void;
  errorRouting: () => void;
}
interface LoginInfo {
  email: string;
  password: string;
  forwardLogin: () => void;
  forwardError: (message: string) => void;
}

export const getToken = (): any => {
  let token = window.localStorage.getItem("token");
  return token;
};

const API_URL = "http://localhost:8080/";

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

  const response = await fetch(API_URL + "admin/loginAdmin", requestOptions);

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
  onSuccess: () => void = () => {}
) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", token: getToken() },
    body: JSON.stringify(company),
  };

  const response = await fetch(API_URL + "admin/addCompany", requestOptions);
  if (response.ok) {
    onSuccess();
  } else if (!response.ok) {
    const error = await response.json();
    console.log(error);
  }
};

const updateCompanyHandler = async (
  company: Company,
  chagngeMessage: (m: string) => void
) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", token: getToken() },
    body: JSON.stringify(company),
  };

  const response = await fetch(API_URL + "admin/updateCompany", requestOptions);

  if (!response.ok) {
    const error = await response.json();
    chagngeMessage(error.value);
  }
};

const deleteCompanyHandler = async (
  companyId: number,
  fetching: DeleteAndUpdatePromise
) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", token: getToken() },
  };

  const response = await fetch(
    API_URL + "admin/deleteCompany/" + companyId,
    requestOptions
  );

  if (!response.ok) {
    const error = await response.json();
    fetching.errorRouting();
  } else {
    fetching.fetchData();
  }
};

const addCustomerHandler = async (customer: Customer) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", token: getToken() },
    body: JSON.stringify(customer),
  };

  const response = await fetch(API_URL + "admin/addCustomer", requestOptions);

  if (!response.ok) {
    const error = await response.json();
    console.log(JSON.stringify(error));
    return 1;
  }
  return 0;
};

const updateCustomerHandler = async (customer: Customer) => {
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
    console.log(JSON.stringify(error));
  }
};

const deleteCustomerHandler = (
  customer: Customer,
  fetching: DeleteAndUpdatePromise
) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", token: getToken() },
    body: JSON.stringify(customer),
  };

  fetch(API_URL + "admin/deleteCustomer/" + customer.customerId, requestOptions)
    .then((res) => res.text())
    .then((text) => {
      if (text === "false") {
        fetching.fetchData();
      }
    })
    .catch(() => {
      fetching.errorRouting();
    });

  // const response = await fetch(
  //   API_URL + "admin/deleteCustomer/" + customer.customerId,
  //   requestOptions
  // );
  // if (response.ok) {
  //   const res = await response.text();
  //   let isFalse = res;
  //   console.log("your res is : " + isFalse);
  //   console.log(JSON.stringify(res));
  // } else if (!response.ok) {
  //   const error = await response.json();
  //   console.log(JSON.stringify(error));
  // }
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
