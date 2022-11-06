import LoginPage from "../LoginPage";
import { Company, Customer } from "../Models/models";

interface DeleteAndUpdatePromise {
  fetchData: () => void;
  errorRouting: (message: string) => void;
}
interface LoginInfo {
  email: string;
  password: string;
  forwardLogin: () => void;
  forwardError: () => void;
}

const API_URL = "http://localhost:8080/";

const Login = async (loginDetails: LoginInfo) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", token: "token" },
    body: JSON.stringify(loginDetails),
  };

  const response = await fetch(API_URL + "admin/loginAdmin", requestOptions);

  if (!response.ok) {
    loginDetails.forwardError();
    console.log(JSON.stringify(response.json()));
    let token = await response.text();
    console.log(token);
    window.localStorage.setItem("token", token);
  } else {
    console.log(response.text());
    loginDetails.forwardLogin();
  }
};

const addCompanyHandler = async (company: any) => {
  const myToken = "get from redux";

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", token: myToken },
    body: JSON.stringify(company),
  };

  const response = await fetch(API_URL + "admin/addCompany", requestOptions);

  if (!response.ok) {
    const error = await response.json();
    console.log(JSON.stringify(error));
  }
};

const updateCompanyHandler = async (company: any) => {
  const myToken = "get from redux";

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", token: myToken },
    body: JSON.stringify(company),
  };

  const response = await fetch(API_URL + "admin/updateCompany", requestOptions);

  if (!response.ok) {
    const error = await response.json();
    console.log(JSON.stringify(error));
  }
};

const deleteCompanyHandler = async (
  companyId: number,
  fetching: DeleteAndUpdatePromise
) => {
  const myToken = "get from redux";

  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", token: myToken },
  };

  const response = await fetch(
    API_URL + "admin/deleteCompany/" + companyId,
    requestOptions
  );

  if (!response.ok) {
    const error = await response.json();
    fetching.errorRouting(error.value);
    console.log(JSON.stringify(error.value));
  } else {
    fetching.fetchData();
  }
};

const addCustomerHandler = async (customer: Customer) => {
  const myToken = "get from redux";

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", token: myToken },
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
  const myToken = "get from redux";

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", token: myToken },
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
  const myToken = "get from redux";

  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", token: myToken },
    body: JSON.stringify(customer),
  };

  fetch(API_URL + "admin/deleteCustomer/" + customer.customerId, requestOptions)
    .then((res) => res.text())
    .then((text) => {
      if (text === "false") {
        fetching.fetchData();
      }
    })
    .catch((error) => {
      fetching.errorRouting(JSON.stringify(error));
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
  login: Login,
};
