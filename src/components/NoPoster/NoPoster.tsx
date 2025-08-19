import React from "react";
import styles from "./NoPoster.module.css";

interface NoPosterProps {
  title: string;
}

const NoPoster = (props: NoPosterProps) => {
  const { title } = props;
  return (
    <div className={styles.noPoster}>
      <h1>{title}</h1>
      <h3>404</h3>
      <p>Poster Not Found</p>
    </div>
  );
};

export default NoPoster;
