import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../Utils/APIWrapper";

export default function Error() {
  const [modal, setModal] = useState(true);
  const navigate = useNavigate();
  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    setModal(true);
  }, []);

  return (
    <>
      {modal && (
        <div id="my-modal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span
                className="close"
                onClick={() => {
                  if (getToken().length > 10) {
                    toggleModal();
                    navigate(-1);
                  } else {
                    toggleModal();
                    navigate("/");
                  }
                }}
              >
                &times;
              </span>
              <h2>Something went wrong</h2>
            </div>
            <div className="modal-body">
              <h4>Error:</h4>
              <p>Please enter A valid url!</p>
            </div>
            <div className="modal-footer">
              <h3>
                <Link to={"/"}></Link>
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
