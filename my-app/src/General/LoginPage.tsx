import { SubmitHandler, useForm } from "react-hook-form";
import { API,API_URL } from "../General/Utils/APIWrapper";
import { URL } from "./Routing";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { changeMessage } from "./Redux/ErrorMessage";
import { useDispatch } from "react-redux";

type LoginInfo = {
  email: string;
  password: string;
  checkBox: boolean;
};
type Colors = {
  adminColor?: string;
  customerColor?: string;
  companyColor?: string;
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeMessageRedux = (message: string) => {
    dispatch(changeMessage(message));
    navigate("error");
  };

  const [isDisable, setDisable] = useState(true);
  const [colors, setColors] = useState<Colors>();
  const [accountType, setAccountType] = useState("");

  const succsessNavigate = (path: string) => {
    navigate(path);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<LoginInfo>();

  const reset = () => {
    resetField("email");
    resetField("password");
  };

  const onSubmit: SubmitHandler<LoginInfo> = (data) => {
    if (accountType === "ADMIN") {
      API.adminLogin({
        email: data.email,
        password: data.password,
        forwardError: changeMessageRedux,
        forwardLogin: () => {
          succsessNavigate(URL.adminUrl.main);
          window.localStorage.setItem("type", "ADMIN");
        },
      });
    } else if (accountType === "COMPANY") {
      API.companyLogin({
        email: data.email,
        password: data.password,
        forwardError: changeMessageRedux,
        forwardLogin: () => {
          succsessNavigate(URL.companyUrl.main);
          window.localStorage.setItem("type", "COMPANY");
        },
      });
    } else {
      API.customerLogin({
        email: data.email,
        password: data.password,
        forwardError: changeMessageRedux,
        forwardLogin: () => {
          succsessNavigate(URL.customersUrl.main);
          window.localStorage.setItem("type", "CUSTOMER");
        },
      });
    }

    reset();
  };

  return (
    <div className="login-page">
      <h1 className="title">Welcome To Coupon Shoppoer</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="login form ">
        <label> Please Enter Your Email </label>

        <input
          {...register("email", { required: true, minLength: 8 })}
          type="email"
        />
        <label> Password</label>
        <input
          {...register("password", { required: true, minLength: 8 })}
          type={"password"}
        />
        {errors.password && "password must be with 8 digit minimum"}
        <label>Please Select Account Type </label>
        <div className="button-display-login">
          <button
            style={{ background: colors?.adminColor && colors?.adminColor }}
            type="button"
            onClick={() => {
              setAccountType("ADMIN");
              setDisable(false);
              setColors({ adminColor: "#1bf79f" });
            }}
          >
            Admin
          </button>

          <button
            style={{ background: colors?.companyColor && colors?.companyColor }}
            type="button"
            onClick={() => {
              setAccountType("COMPANY");
              setDisable(false);
              setColors({ companyColor: "#1bf79f" });
            }}
          >
            Company
          </button>

          <button
            style={{
              background: colors?.customerColor && colors?.customerColor,
            }}
            type="button"
            onClick={() => {
              setColors({ customerColor: "#1bf79f" });
              setAccountType("CUSTOMER");
              setDisable(false);
            }}
          >
            Customer
          </button>
        </div>

        <input
          type="submit"
          className="btn login-btn"
          value={"Login"}
          disabled={isDisable}
        />
      </form>
    </div>
  );
};

export default LoginPage;
