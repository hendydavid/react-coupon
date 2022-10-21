import React, { useRef, useState } from "react";
import { API } from "../../Utils/APIWrapper";
import Emailnpute from "../../Utils/Emailnpute";

const AddCompany = () => {
  const [emailFromState, setEmail] = useState("");
  const companyNameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const addCompanyHandler = (event: any) => {
    event.preventDefault();
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
          buttonValue={"Add Company"}
        ></Emailnpute>
      </form>
    </>
  );
};

export default AddCompany;
