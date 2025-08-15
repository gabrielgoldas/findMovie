import React, { useState } from "react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = (props: PaginationProps) => {
  const { totalPages, onPageChange } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <>
      <div className={styles.containerPagination}>
        <button
          className={`${styles.directionBtn} ${styles.btn}`}
          onClick={() => handleChangePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i className="fa-solid fa-angle-left"></i>
        </button>
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              className={`${styles.buttonPage} ${styles.btn} ${
                page === currentPage ? styles.active : ""
              }`}
              onClick={() => handleChangePage(page)}
            >
              {page}
            </button>
          );
        })}
        <button
          className={`${styles.directionBtn} ${styles.btn}`}
          onClick={() => handleChangePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </>
  );
};

export default Pagination;
