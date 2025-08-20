import React, { useState } from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
  isFavorite: boolean;
  onSearch?: (query: string, page: number) => void;
}

const Header = (props: HeaderProps) => {
  const { title, isFavorite, onSearch = () => {} } = props;

  const [search, setSearch] = useState<string>("");

  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.imgContainer}>
        <a href="/">
          <img src="/logo.png" alt="Logo" />
        </a>
        <h1>{title}</h1>
      </div>

      {!isFavorite ? (
        <div className={styles.searchContainer}>
          <button
            className={styles.favoritesBtn}
            onClick={() => navigate("/favoritos")}
          >
            Favoritos
          </button>
          <input
            type="text"
            placeholder="Procure por um filme"
            onChange={(ev) => setSearch(ev.target.value)}
            value={search}
          />
          <button
            className={styles.searchButton}
            onClick={() => onSearch(search, 1)}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      ) : (
        ""
      )}
    </header>
  );
};

export default Header;
