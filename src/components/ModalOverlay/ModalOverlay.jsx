import "./ModalOverlay.css";
import PropTypes from "prop-types";

export function ModalOverlay({ onClick }) {
  return <div className="overlay" onClick={onClick}></div>;
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
