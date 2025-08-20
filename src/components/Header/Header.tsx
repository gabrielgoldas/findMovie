import React from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
  isFavorite: boolean;
}

const Header = (props: HeaderProps) => {
  const { title, isFavorite } = props;

  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.imgContainer}>
        <a href="/">
          <img src="/logo.png" alt="Logo" />
        </a>
        <h1>{title}</h1>
      </div>
      <div className={styles.searchContainer}>
        {!isFavorite ? (
          <button
            className={styles.favoritesBtn}
            onClick={() => navigate("/favoritos")}
          >
            Favoritos
          </button>
        ) : (
          ""
        )}
        <input type="text" placeholder="Procure por um filme" />
        <button className={styles.searchButton}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
