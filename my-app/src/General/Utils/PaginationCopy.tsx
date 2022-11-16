import React from "react";
import "../css-files/App.css";

type Props = {
  postsPerPage: number;
  totalPosts: number;
  setCurrentPage: (currentPage: number) => void;
  currentPage: number;
};
let i = 0;
const Pagination = (props: Props) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const setPageNumbers = (): JSX.Element[] => {
    const listOfCurrentPages: JSX.Element[] = [];
    const lastPage = pageNumbers.slice(
      props.currentPage,
      props.currentPage + 8
    );
    for (
      let i = props.currentPage - 2;
      i++;
      i <= lastPage[lastPage.length - 1] - 1
    ) {
      listOfCurrentPages.push(
        <li
          key={++i}
          className={props.currentPage === i ? "selected-item" : "page-item"}
          onClick={() => props.setCurrentPage(i)}
        >
          {i}
        </li>
      );
      if (i === lastPage[lastPage.length - 1] - 1) {
        listOfCurrentPages.push(
          <li
            key={++i}
            className={props.currentPage === i ? "selected-item" : "page-item"}
            onClick={() => props.setCurrentPage(i)}
          >
            .....
          </li>
        );
      }
    }
    return listOfCurrentPages;
  };
  const setFirstNumbers = (): JSX.Element[] => {
    const listOfCurrentPages: JSX.Element[] = [];
    const lastPage = pageNumbers.slice(
      2,
      props.currentPage + 8
    );
    for (let i = 2; i++; i <= lastPage[lastPage.length - 1] - 1) {
      listOfCurrentPages.push(
        <li
          key={++i}
          className={props.currentPage === i ? "selected-item" : "page-item"}
          onClick={() => props.setCurrentPage(i)}
        >
          {i}
        </li>
      );
    }
    return listOfCurrentPages;
  };

  return (
    <nav>
      <ul className="pagination">
        <li
          key={++i}
          className={props.currentPage === 1 ? "selected-item" : "page-item"}
          onClick={() => props.setCurrentPage(1)}
        >
          {pageNumbers[0]}
        </li>

        {pageNumbers.length > 2 && props.currentPage >= 5 && setPageNumbers()}

        {pageNumbers.length > 2 && props.currentPage <= 4 && setFirstNumbers()}

        {pageNumbers.length > 1 && (
          <li
            key={++i}
            className={props.currentPage === 1 ? "selected-item" : "page-item"}
            onClick={() => props.setCurrentPage(1)}
          >
            {pageNumbers[pageNumbers.length - 1]}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
