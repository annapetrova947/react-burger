import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal");

export function Modal({ title, onClose, children }) {
  React.useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return createPortal(
    <div>
      <div className={styles.modal}>
        <div className={`${styles.header} ml-10 pt-10`}>
          {title && (
            <p className={`text text_type_main-large ${styles.title}`}>
              {title}
            </p>
          )}
          <button className={styles.close_button} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </div>,

    modalRoot,
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
