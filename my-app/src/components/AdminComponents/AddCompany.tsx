import React, { useRef, useState } from "react";
import { Bool } from "reselect/es/types";

const AddCompany = () => {
  const [isDisable, setDisable] = useState(true);
  const showMessage = (showMessage: Boolean) => {
    showMessage &&
      window.alert("your email is not vaid please insert a vaid email");
  };

  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const isValidEmail = (email: any): Boolean => {
    if (email && email.match(emailPattern)) {
      setDisable(false);
      return true;
    } else {
      showMessage(true);
      return false;
    }
  };

  

  const companyNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const date = new Date();
  const myToken = "myToken";

  const addCompanyHandler = async (event: any) => {
    event.preventDefault();

    
      const company = {
        companyId: 0,
        companyName: companyNameRef.current?.value,
        email: emailRef.current?.value,
        password: passRef.current?.value,
        dateCreated: date,
        coupons: [],
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", token: myToken },
        body: JSON.stringify(company),
      };

      const response = await fetch(
        "http://localhost:8080/admin/addCompany",
        requestOptions
      );
      if (!response.ok) {
        console.log(JSON.stringify(response.json));
      }

      console.log(JSON.stringify(company));
    
  };

  return (
    <>
      <h2>Please Add A New Company</h2>
      <form onSubmit={addCompanyHandler}>
        <label>Company Name</label>
        <input type="text" ref={companyNameRef} />
        <label>Email</label>
        <input type="email" name="email" ref={emailRef} />
        <label>Password</label>
        <input type="password" ref={passRef} />

        <button disabled={isDisable} onClick={addCompanyHandler}>
          Add Company
        </button>
      </form>
    </>
  );
};

export default AddCompany;
