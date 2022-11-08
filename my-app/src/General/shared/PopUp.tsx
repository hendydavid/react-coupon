import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css-files/popUp.css";
import { changeMessage, clearMessage } from "../Redux/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";

export default function PopUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(true);
  const defaultMessage = "Something went wrong please try again";
  const errorMessage = useSelector((state: any) => state.errorMessage.value);

  const toggleModal = () => {
    setModal(!modal);
    navigate(-1);
    dispatch(clearMessage());
  };

  return (
    <>
      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <p>{errorMessage ? errorMessage : defaultMessage}</p>

            <button
              className="close-modal"
              onClick={() => {
                toggleModal();
              }}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
