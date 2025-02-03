import styled from "styled-components";
import {
  BsChevronLeft,
  BsChevronRight,
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
} from "react-icons/bs";
import { useEffect, useState } from "react";
import { breakpoints } from "../constant";

const PaginationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin: 32px 0;
  flex-wrap: wrap;

  a {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 1.6rem;

    transition: all 0.125s ease-in-out;

    &:hover {
      color: black;
      background-color: #ffdd95;
      transition: all 0.125s ease-in-out;
    }
  }

  @media only screen and (max-width: ${breakpoints.medium}) {
    gap: 16px;
    a {
      width: 35px;
      height: 35px;
      font-size: 1.4rem;
    }
  }
`;

const ActivePage = styled.a`
  color: black;
  background-color: #ffdd95;
`;

function Pagination({
  currentPage,
  setCurrentPage,
  totalPage,
  setOffset,
  totalAnime,
  loading,
}) {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    if (!loading) {
      if (totalPage < 5) {
        setPageNumbers(Array.from({ length: totalPage }, (_, i) => i + 1));
      } else {
        if (currentPage <= 2) {
          setPageNumbers([1, 2, 3, 4, 5]);
        } else if (currentPage >= totalPage - 4) {
          setPageNumbers(
            Array.from({ length: 5 }, (_, i) => i + totalPage - 4)
          );
        } else if (currentPage > 2) {
          setPageNumbers([
            currentPage - 2,
            currentPage - 1,
            currentPage,
            ...(currentPage + 1 < totalPage && [currentPage + 1]),
            ...(currentPage + 2 < totalPage && [currentPage + 2]),
          ]);
        }
      }
      setOffset(((currentPage - 1) * 10) % totalAnime);
    }
  }, [currentPage, totalPage]);

  const handleClick = (page) => {
    if (!loading) {
      let newPage = currentPage;
      if (page === "first") newPage = 1;
      else if (page === "last") newPage = totalPage;
      else if (page === "previous") newPage = Math.max(1, currentPage - 1);
      else if (page === "next") newPage = Math.min(totalPage, currentPage + 1);
      setCurrentPage(newPage);
    }
  };

  return (
    <PaginationButtons>
      <a onClick={() => handleClick("first")}>
        <BsChevronDoubleLeft size={20} />
      </a>
      <a onClick={() => handleClick("previous")}>
        <BsChevronLeft size={20} />
      </a>
      {pageNumbers.map((number) =>
        currentPage == number ? (
          <ActivePage key={number} onClick={() => setCurrentPage(number)}>
            {number}
          </ActivePage>
        ) : (
          <a key={number} onClick={() => setCurrentPage(number)}>
            {number}
          </a>
        )
      )}
      <a onClick={() => handleClick("next")}>
        <BsChevronRight size={20} />
      </a>
      <a onClick={() => handleClick("last")}>
        <BsChevronDoubleRight size={20} />
      </a>
    </PaginationButtons>
  );
}

export default Pagination;
