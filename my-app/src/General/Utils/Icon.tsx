import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import { BiPurchaseTag } from "react-icons/bi";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import StoreSharpIcon from "@mui/icons-material/StoreSharp";
import Person2SharpIcon from "@mui/icons-material/Person2Sharp";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { CiFacebook } from "react-icons/ci";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SendIcon from "@mui/icons-material/Send";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const User = (size: number): JSX.Element => {
  return (
    <div className="icon">
      <BsPersonCircle size={size}></BsPersonCircle>
    </div>
  );
};

export const Coupon = (size: any): JSX.Element => {
  return (
    <div className="icon">
      <BiPurchaseTag size={size}></BiPurchaseTag>
    </div>
  );
};

export const EditIcon = (size: number): JSX.Element => {
  return (
    <div className="edit">
      <MdModeEditOutline size={size} className={"edit"}></MdModeEditOutline>
    </div>
  );
};
export const DeleteIcon = (size: number): JSX.Element => {
  return (
    <div className="delete">
      <RiDeleteBinLine size={size}></RiDeleteBinLine>
    </div>
  );
};

export const AdminIcon = (style: any): JSX.Element => {
  return (
    <div className="delete">
      <AdminPanelSettingsIcon className="icon" sx={{ display: style, mr: 1 }} />
    </div>
  );
};

export const companyIcon = (style: any): JSX.Element => {
  return (
    <div className="delete">
      <StoreSharpIcon className="icon" sx={{ display: style, mr: 1 }} />
    </div>
  );
};

export const customerIcon = (style: any): JSX.Element => {
  return (
    <div className="delete">
      <Person2SharpIcon className="icon" sx={{ display: style, mr: 1 }} />
    </div>
  );
};

export const twitterIcon = (size: number): JSX.Element => {
  return (
    <div className="delete">
      <AiFillTwitterCircle size={size}></AiFillTwitterCircle>
    </div>
  );
};
export const facbookeIcon = (size: number): JSX.Element => {
  return (
    <div className="delete">
      <CiFacebook size={size}></CiFacebook>
    </div>
  );
};
export const instegramIcon = (size: number): JSX.Element => {
  return (
    <div className="delete">
      <AiOutlineInstagram size={size}></AiOutlineInstagram>
    </div>
  );
};

export const deleteButton = (onClick: () => void): JSX.Element => {
  return (
    <div>
      <Button
        variant="contained"
        startIcon={<DeleteForeverIcon />}
        onClick={onClick}
        size={"small"}
      >
        Delete
      </Button>
    </div>
  );
};
export const updateButton = (onClick: () => void): JSX.Element => {
  return (
    <div>
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={onClick}
        size={"small"}
      >
        Update
      </Button>
    </div>
  );
};

export const loadingButton = (): JSX.Element => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
};

export const iconsList = {
  userIcon: User,
  coupon: Coupon,
  admin: AdminIcon,
  company: companyIcon,
  customer: customerIcon,
  twitter: twitterIcon,
  instegram: instegramIcon,
  facebooke: facbookeIcon,
  delete: deleteButton,
  update: updateButton,
};
