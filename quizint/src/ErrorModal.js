import React from "react";

import "./Styles.css";

const ErrorModal = ({ message, onClose }) => {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Error</p>
          <button className="delete" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">{message}</section>
        <footer className="modal-card-foot">
          <button className="button is-danger" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ErrorModal;
