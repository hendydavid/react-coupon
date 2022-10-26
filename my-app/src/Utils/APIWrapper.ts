import { Company, Customer } from "../General/Models/models";

const API_URL = "http://localhost:8080/";

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

const deleteCompanyHandler = async (companyId: number) => {
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
    console.log(JSON.stringify(error));
  }
};

const addCustomerHandler = async (customer: Customer) => {
  const myToken = "get from redux";

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", token: myToken },
    body: JSON.stringify(customer),
  };

  const response = await fetch(
    API_URL + "admin/addCustomer",
    requestOptions
  );

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

const deleteCustomerHandler = async (customer: Customer) => {
  const myToken = "get from redux";

  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", token: myToken },
    body: JSON.stringify(customer),
  };

  const response = await fetch(
    API_URL + "admin/deleteCustomer/" + customer.customerId,
    requestOptions
  );

  if (!response.ok) {
    const error = await response.json();
    console.log(JSON.stringify(error));
  }
};

export const API = {
  
  addCompany: addCompanyHandler,
  updateCompany: updateCompanyHandler,
  deleteCompany: deleteCompanyHandler,
  
  addCustomer: addCustomerHandler,
  deleteCustomer: deleteCustomerHandler,
  updateCustomer: updateCustomerHandler,
};
