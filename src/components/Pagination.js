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

function Pagination({ currentPage, setCurrentPage, totalPage }) {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    setPageNumbers([
      1,
      ...(totalPage > 1 ? [2, totalPage - 1, totalPage] : []),
    ]);
  }, [totalPage]);

  return (
    <PaginationButtons>
      <a onClick={() => setCurrentPage(1)}>
        <BsChevronDoubleLeft size={20} />
      </a>
      <a
        onClick={() => setCurrentPage((prev) => (prev !== 1 ? prev - 1 : prev))}
      >
        <BsChevronLeft size={20} />
      </a>
      {pageNumbers.map((number, index) =>
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
      <a
        onClick={() =>
          setCurrentPage((prev) => (prev !== totalPage ? prev + 1 : prev))
        }
      >
        <BsChevronRight size={20} />
      </a>
      <a onClick={() => setCurrentPage(totalPage)}>
        <BsChevronDoubleRight size={20} />
      </a>
    </PaginationButtons>
  );
}

export default Pagination;
