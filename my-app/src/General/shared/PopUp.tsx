import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../css-files/popUp.css";
import message from "../Utils/message";
type Message = { message?: string };
export default function PopUp(message: Message) {
  const [modal, setModal] = useState(true);
  const { errorMessage } = useParams();
  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <h2>Hello Modal</h2>
            <p>{errorMessage && errorMessage}</p>
            <p>{message.message && message.message}</p>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
