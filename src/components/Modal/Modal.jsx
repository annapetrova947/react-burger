import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import { createPortal } from "react-dom";
import "./Modal.css";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal");

export function Modal({ title, onClose, children, isOpen }) {
  React.useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return createPortal(
    <>
      {isOpen && (
        <div>
          <div className="modal">
            <div className="modal__header ml-10 pt-10">
              {title && (
                <p className="text text_type_main-large mr-10 ml-10 modal__title">
                  {title}
                </p>
              )}
              <button className="modal__close-button" onClick={() => onClose()}>
                <CloseIcon />
              </button>
            </div>
            {children}
          </div>
          <ModalOverlay onClick={() => onClose()} />
        </div>
      )}
    </>,

    modalRoot,
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
