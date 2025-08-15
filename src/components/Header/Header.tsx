import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.imgContainer}>
        <img src="/logo.png" alt="Logo" />
      </div>

      <div className={styles.title}>
        <h1>Upcoming Movies</h1>
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
