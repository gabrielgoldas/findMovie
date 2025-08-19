import React from "react";
import styles from "./Loading.module.css";
import SpinnerIcon from "../Spinner/Spinner";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <SpinnerIcon size={48} color="#eb5e28" />
    </div>
  );
};

export default Loading;
