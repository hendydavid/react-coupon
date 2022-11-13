import React from "react";
import "../css-files/App.css";

type Props = {
  postsPerPage: number;
  totalPosts: number;
  setCurrentPage: (currentPage: number) => void;
  currentPage: number;
};

const Pagination = (props: Props) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={
              props.currentPage === number ? "selected-item" : "page-item"
            }
            onClick={() => props.setCurrentPage(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;