import { type } from "@testing-library/user-event/dist/type";
import React, { useRef, useState } from "react";
import validator from "validator";

type Prop = {
  functionHndler: (e: any) => any;
  setEmail: (email:string)=>void;
};

const Emailnpute = (prop: Prop) => {
  const [display, setDisplay] = useState("none");
  const [isDisable, setDisable] = useState(true);
  const emailRef = useRef<HTMLInputElement>(null);

  const validateEmail = (e: any) => {
    if (!validator.isEmail(e.target.value)) {
      setDisplay("block");
      setDisable(true);
    } else {
      prop.setEmail(e.target.value)
      setDisplay("none");
      setDisable(false);
    }
  };

  return (
    <>
      <label>Email</label>
      <input
        onChange={validateEmail}
        type="email"
        name="email"
        ref={emailRef}
      />
      <p style={{ display: display }}>Please Enter A valid Email </p>
      <button disabled={isDisable} onClick={prop.functionHndler} type="submit">
        Add Company
      </button>
    </>
  );
};

export default Emailnpute;
