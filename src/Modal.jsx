import React from "react";
import "./Modal.css";
import { ReactFormGenerator } from "react-form-builder2";

const Modal = ({ handleCloseModal, data, handleSubmit, undo, redo }) => {
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <ReactFormGenerator data={data} answer_data={{ data }} />
        <div className="modal-button-container">
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>
          <button onClick={handleCloseModal} className="close-button">
            {" "}
            close
          </button>
          <button className="undo-button btn btn-primary" onClick={undo}>
            Undo
          </button>
          <button className="redo-button btn btn-primary" onClick={redo}>
            Redo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
