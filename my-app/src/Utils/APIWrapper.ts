
const API_URL = "http://localhost:8080/admin";

const addCompanyHandler = async (company:any) => {

  const myToken = "get from redux";

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", token: myToken },
    body: JSON.stringify(company),
  };

  const response = await fetch(API_URL + "/addCompany", requestOptions);

  if (!response.ok) {
    const error = await response.json();
    console.log(JSON.stringify(error));
  }

  // console.log(JSON.stringify(company));
};


export const API = {
  addCompany: addCompanyHandler
}

export const ROUTS = {
  addCompany: "add/company/route"
}