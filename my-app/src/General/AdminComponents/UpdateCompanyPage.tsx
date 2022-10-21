import React, { useEffect, useRef, useState } from "react";
import Emailnpute from "../../Utils/Emailnpute";
import { Company } from "../Models/models";
import { useSelector } from "react-redux";
import { API } from "../../Utils/APIWrapper";

const UpdateCompanyPage = () => {
  const [emailFromState, setEmail] = useState("");
  const companyNameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const companyFromRedux = useSelector(
    (state: any) => state.companyUpdate.value
  );

  const company: Company = {
    companyId: 0,
    companyName: "",
    email: emailFromState,
    password: "",
    dateCreated: new Date(),
    coupons: [],
  };

  const updateCompanyHandler = (event: any) => {
    event.preventDefault();
    const company = {
      companyId:companyFromRedux.companyId,
      companyName:companyNameRef.current!.value,
      email: emailFromState,
      password: passRef.current!.value,
      dateCreated: new Date(),
      coupons: [],
    };
    API.updateCompany(company);
  };

  return (
    <form onSubmit={updateCompanyHandler}>
      <label>Company Name</label>
      <input
        type="text"
        ref={companyNameRef}
        defaultValue={companyFromRedux.companyName}
      />
      <label>Password</label>
      <input
        type="password"
        ref={passRef}
        defaultValue={companyFromRedux.password}
      />
      <Emailnpute
        functionHndler={updateCompanyHandler}
        setEmail={setEmail}
        inputValue={companyFromRedux.email}
        buttonValue={"update company"}
      ></Emailnpute>
    </form>
  );
};

export default UpdateCompanyPage;
