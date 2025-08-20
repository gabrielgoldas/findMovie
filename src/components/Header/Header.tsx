import React from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.imgContainer}>
        <a href="/">
          <img src="/logo.png" alt="Logo" />
        </a>
      </div>
      <div className={styles.searchContainer}>
        <button
          className={styles.favoritesBtn}
          onClick={() => navigate("/favoritos")}
        >
          Favoritos
        </button>
        <input type="text" placeholder="Procure por um filme" />
        <button className={styles.searchButton}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
