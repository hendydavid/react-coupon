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

export const API = {
  addCompany: addCompanyHandler,
  updateCompany: updateCompanyHandler,
};


