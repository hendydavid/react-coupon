import React, { useRef, useState } from "react";
import validator from "validator";
import Alert from "@mui/material/Alert";
import { Stack } from "@mui/system";

type Prop = {

  functionHndler: (e: any) => any;
  setEmail: (email: string) => void;
  inputValue?: string;
  buttonValue?: string;
};

const Emailnpute = (prop: Prop) => {
 
  const [display, setDisplay] = useState("none");
  const [isDisable, setDisable] = useState(true);
  const emailRef = useRef<HTMLInputElement>(null);

  const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!validator.isEmail(e.target.value)) {
      setDisplay("block");
      setDisable(true);
    } else {
      prop.setEmail(e.target.value);
      setDisplay("none");
      setDisable(false);
    }
  };

  return (
    <>
      <label>Email</label>
      <input
        defaultValue={prop.inputValue}
        onChange={validateEmail}
        type="email"
        name="email"
        ref={emailRef}
      />
      <div style={{ display: display }}>
        <Stack sx={{ width: "inherit" }} spacing={2} marginTop={2}>
          <Alert severity="warning">Please Enter A Valid Email</Alert>
        </Stack>
      </div>
      <button disabled={isDisable} onClick={prop.functionHndler} type="submit">
        {prop.buttonValue}
      </button>
    </>
  );
};

export default Emailnpute;
