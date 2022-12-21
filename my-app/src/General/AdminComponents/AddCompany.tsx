import { SubmitHandler, useForm } from "react-hook-form";
import { API, APIResponseHandler } from "../Utils/APIWrapper";
import { Company } from "../Models/models";
import { IFormInputsCompany } from "./UpdateCompanyPage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeMessage } from "../Redux/ErrorMessage";



const AddCompany = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IFormInputsCompany>();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getErrorMessage = (message: string) => {
    dispatch(changeMessage(message));
    navigate("/error");
  };
  const responseHandlerMethod: APIResponseHandler = {
    onSuccess: () => {},
    onFail: (error: string) => getErrorMessage(error),
  };

  const reset = () => {
    resetField("companyName");
    resetField("email");
    resetField("password");
  };

  const onSubmit: SubmitHandler<IFormInputsCompany> = (data) => {
    const company: Company = {
      companyId: 0,
      companyName: data.companyName,
      email: data.email,
      password: data.password,
      dateCreated: new Date(),
      coupons: [],
    };

    API.addCompany(company, responseHandlerMethod);
    reset();
  };

  return (
    <>
      <h2 className="title">Please Add A New Company</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label> Company Name </label>
        <input {...register("companyName", { required: true })} />
        {errors.companyName && "company name is required"}

        <label> Email</label>
        <input
          {...register("email", { required: true, minLength: 8 })}
          type="email"
        />

        <label> Password</label>
        <input {...register("password", { required: true, minLength: 8 })} />
        {errors.password && "password must be with 8 digit minimum"}
        <input type="submit" className="btn" value={"Add Company"} />
      </form>
    </>
  );
};

export default AddCompany;
