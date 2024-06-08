import styles from "./ModalOverlay.module.css";

type TModalOverlay = {
  onClick: () => void
}

export function ModalOverlay({ onClick }: TModalOverlay) {
  return <div className={styles.overlay} onClick={onClick}></div>;
}
