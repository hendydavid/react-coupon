import React, { useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../css-files/popUp.css";

type Props = {
  pageToNavigate?: string;
};

export default function PopUp(prop: Props) {
  const navigate = useNavigate();
  const [modal, setModal] = useState(true);

  const message = useSelector((state: any) => state.errorMessage.value);

  const toggleModal = () => {
    setModal(!modal);
    if (prop.pageToNavigate) {
      navigate(prop.pageToNavigate);
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      {modal && (
        <div id="my-modal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span
                className="close"
                onClick={() => {
                  toggleModal();
                }}
              >
                &times;
              </span>
              <h2>Something went wrong</h2>
            </div>
            <div className="modal-body">
              <h4>Error:</h4>
              <p>{message}</p>
            </div>
            <div className="modal-footer">
              <h3>
                <a href="/">return to login page</a>
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
