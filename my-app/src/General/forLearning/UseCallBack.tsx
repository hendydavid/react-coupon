import { ResultType } from "@remix-run/router/dist/utils";
import React, { useCallback, useEffect, useState } from "react";

const UseCallBack = () => {
  const [input, setInpute] = useState("");
  const [result, setResult] = useState(0);
  const [num1] = useState(5);
  const [num2] = useState(11);

  const sum = useCallback(() => num1 + num2, [num1, num2]);

  //   const sum = () => [num1+ num2];

  useEffect(() => {
    console.log(`your sum is:${sum()}`);
    setResult(sum());
  }, [sum]);

  return (
    <div>
      useCallBack
      <input
        onChange={(e) => {
          setInpute(e.target.value);
        }}
        value={input}
      ></input>
    </div>
  );
};

export default UseCallBack;
