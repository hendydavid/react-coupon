import React from "react";
import { useNavigate } from "react-router-dom";

type Prop = {
  message: string;
};

const message = (prop: Prop) => {
  return <>{prop.message.length === 0 && ""}</>;
};

export default message;
