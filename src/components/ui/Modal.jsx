import React from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.scss";

const Backdrop = ({handleHideCart}) => {
  return <div onClick={handleHideCart} className={classes.backdrop}></div>;
};

const ModalOverlay = ({ children }) => {
  return <div className={classes["modal-overlay"]}>{children}</div>;
};

const portalElement = document.getElementById("overlays");

const Modal = ({ children, handleHideCart }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop handleHideCart={handleHideCart} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;