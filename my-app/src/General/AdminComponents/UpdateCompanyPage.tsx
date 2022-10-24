import React, { useEffect, useRef, useState } from "react";
import Emailnpute from "../../Utils/Emailnpute";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../Utils/APIWrapper";
import { reverseCompanyState } from "../Redux/UpdateCompanySlice";

const UpdateCompanyPage = () => {
  const [emailFromState, setEmail] = useState("");
  const companyNameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const companyFromRedux = useSelector(
    (state: any) => state.companyUpdate.value
  );

  const updateCompanyHandler = (event: any) => {
    event.preventDefault();
    const company = {
      companyId: companyFromRedux.companyId,
      companyName: companyNameRef.current!.value,
      email: emailFromState,
      password: passRef.current!.value,
      dateCreated: new Date(),
      coupons: [],
    };
    API.updateCompany(company);
    dispatch(reverseCompanyState());
  };

  return (
    <form onSubmit={updateCompanyHandler}>
      <div className="form">
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
      </div>
    </form>
  );
};

export default UpdateCompanyPage;
