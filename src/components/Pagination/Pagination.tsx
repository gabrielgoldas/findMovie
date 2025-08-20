import React, { useState } from "react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = (props: PaginationProps) => {
  const { totalPages, onPageChange, currentPage } = props;

  const handleChangePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const getVisiblePages = () => {
    const maxVisiblePages = 5;
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 2);

      pages.push(1);

      if (start > 2) pages.push("...");

      for (let i = start; i < end; i++) pages.push(i);

      if (end < totalPages - 1) pages.push("...");

      pages.push(totalPages);
    }
    return pages;
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
        {getVisiblePages().map((page, index) => {
          return (
            <button
              key={index}
              className={`${styles.buttonPage} ${styles.btn} ${
                page === currentPage ? styles.active : ""
              }`}
              onClick={() => typeof page === "number" && handleChangePage(page)}
              disabled={typeof page !== "number"}
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
