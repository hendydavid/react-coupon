import React from "react";
import "../css-files/App.css";

type Props = {
  postsPerPage: number;
  totalPosts: number;
  setCurrentPage: (currentPage: number) => void;
  currentPage: number;
};
var counter = 0;
const itemToShow: number = 8;
const PaginationList = (props: Props) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const setPagePages = (): JSX.Element[] => {
    const listOfCurrentPages: JSX.Element[] = [];
    let lastPage: number[] = [];
    if (props.currentPage === pageNumbers.length) {
      lastPage = pageNumbers.slice(
        props.currentPage - 1,
        props.currentPage + itemToShow
      );
    } else {
      lastPage = pageNumbers.slice(
        props.currentPage,
        props.currentPage + itemToShow
      );
    }

    for (
      let i = props.currentPage - 2;
      i <= lastPage[lastPage.length - 1] - 1;
      i++
    ) {
      listOfCurrentPages.push(
        <li
          key={counter++}
          className={props.currentPage === i ? "selected-item" : "page-item"}
          onClick={() => props.setCurrentPage(i)}
        >
          {i}
        </li>
      );
      if (
        i === lastPage[lastPage.length - 1] - 1 &&
        pageNumbers.length - lastPage[0] >= itemToShow
      ) {
        listOfCurrentPages.push(
          <li key={counter++} className={"page-item"}>
            .....
          </li>
        );
      }
    }
    return listOfCurrentPages;
  };
  const setFirstPages = (): JSX.Element[] => {
    const listOfCurrentPages: JSX.Element[] = [];
    const lastPage = pageNumbers.slice(1, itemToShow);

    for (let i = 0; i <= lastPage.length - 2; i++) {
      listOfCurrentPages.push(
        <li
          key={counter++}
          className={
            props.currentPage === lastPage[i] ? "selected-item" : "page-item"
          }
          onClick={() => props.setCurrentPage(lastPage[i])}
        >
          {lastPage[i]}
        </li>
      );
      if (
        i === lastPage.length - 2 &&
        pageNumbers.length - lastPage[0] >= itemToShow
      ) {
        listOfCurrentPages.push(
          <li key={counter++} className={"page-item"}>
            .....
          </li>
        );
      }
    }

    return listOfCurrentPages;
  };

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.length >= 1 && (
          <li
            key={counter++}
            className={props.currentPage === 1 ? "selected-item" : "page-item"}
            onClick={() => props.setCurrentPage(1)}
          >
            {1}
          </li>
        )}

        {pageNumbers.length > 2 && props.currentPage >= 5 && setPagePages()}

        {pageNumbers.length > 2 && props.currentPage <= 4 && setFirstPages()}

        {pageNumbers.length > 1 && (
          <li
            key={counter++}
            className={
              props.currentPage === pageNumbers.length
                ? "selected-item"
                : "page-item"
            }
            onClick={() => props.setCurrentPage(pageNumbers.length)}
          >
            {pageNumbers[pageNumbers.length - 1]}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default PaginationList;
