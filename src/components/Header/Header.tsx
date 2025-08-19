import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.imgContainer}>
        <a href="/">
          <img src="/logo.png" alt="Logo" />
        </a>
      </div>
      <div className={styles.searchContainer}>
        <input type="text" placeholder="Procure por um filme" />
        <button className={styles.searchButton}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
