import React from "react";
import styles from "./Alert.module.css";

interface AlertProps {
  message: string;
  onClose: () => void;
}

const Alert = (props: AlertProps) => {
  const { message, onClose } = props;

  return (
    <div id="custom-alert" className={styles.alertContainer}>
      <p>{message}</p>
      <button className="btnDefault" onClick={onClose}>
        Fechar
      </button>
    </div>
  );
};

export default Alert;
