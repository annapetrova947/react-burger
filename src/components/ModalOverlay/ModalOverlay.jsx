import styles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

export function ModalOverlay({ onClick }) {
  return <div className={styles.overlay} onClick={onClick}></div>;
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
