import React, { useRef, useState } from "react";
import { Bool } from "reselect/es/types";
import { API } from "../../Utils/APIWrapper";
import validator from "validator";
import Emailnpute from "../../Utils/Emailnpute";

const AddCompany = () => {
  const [display, setDisplay] = useState("none");
  const [isDisable, setDisable] = useState(true);
  const [emailFromState, setEmail] = useState("");

  const companyNameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const validateEmail = (e: any) => {
    if (!validator.isEmail(e.target.value)) {
      setDisplay("block");
      console.log("i am here not V ");
      setDisable(true);
    } else {
      setDisplay("none");
      setDisable(false);
    }
  };

  const addCompanyHandler = (event: any) => {
    event.preventDefault();
    let i: string = "";
    i = companyNameRef.current!.value;
    const company = {
      companyId: 0,
      companyName: companyNameRef.current!.value,
      email: emailFromState,
      password: passRef.current!.value,
      dateCreated: new Date(),
      coupons: [],
    };

    API.addCompany(company);
  };


  return (
    <>
      <h2>Please Add A New Company</h2>
      <form onSubmit={addCompanyHandler}>
        <label>Company Name</label>
        <input type="text" ref={companyNameRef} />
        <label>Password</label>
        <input type="password" ref={passRef} />
        <Emailnpute
          functionHndler={addCompanyHandler}
          setEmail={setEmail}
        ></Emailnpute>
      </form>
    </>
  );
};

export default AddCompany;
