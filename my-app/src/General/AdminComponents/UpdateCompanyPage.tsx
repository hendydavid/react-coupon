import React, { useEffect, useRef, useState } from "react";
import Emailnpute from "../../Utils/Emailnpute";
import {useSelector } from "react-redux";
import { API } from "../../Utils/APIWrapper";
import { useParams } from "react-router-dom";
import { Company } from "../Models/models";

const UpdateCompanyPage = () => {
  const companyFromRedux = useSelector(
    (state: any) => state.companyUpdate.value
  );

  let { companyId } = useParams();
  const [company, setCompany] = useState<Company>();
  const [emailFromState, setEmail] = useState("");

  const companyNameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const emptyCompany: Company = {
    companyId: 0,
    companyName: "",
    email: "",
    password: "",
    dateCreated: new Date(),
    coupons: [],
  };
  const updateCompanyHandler = (event: any) => {
    event.preventDefault();
    const mycompany = {
      companyId: Number(company!.companyId),
      companyName: companyNameRef.current!.value,
      email: emailFromState,
      password: passRef.current!.value,
      dateCreated: new Date(),
      coupons: [],
    };
    API.updateCompany(mycompany);
    setCompany(emptyCompany);
  };

  useEffect(() => {
    setCompany(
      companyFromRedux.find((c: Company) => c.companyId === Number(companyId))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  return (
    <form onSubmit={updateCompanyHandler}>
      {company && company!.companyName}
      <div className="form">
        <label>Company Name</label>
        <input
          type="text"
          ref={companyNameRef}
          defaultValue={company && company!.companyName}
        />
        <label>Password</label>
        <input type="password" ref={passRef} defaultValue={company?.password} />
        <Emailnpute
          functionHndler={updateCompanyHandler}
          setEmail={setEmail}
          inputValue={company && company!.email}
          buttonValue={"update company"}
        ></Emailnpute>
      </div>
    </form>
  );
};

export default UpdateCompanyPage;
