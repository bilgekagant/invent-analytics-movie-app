// src/components/PaginationComponent.js
import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const maxPageNumbersToShow = 5;
  const halfPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

  let startPage = Math.max(currentPage - halfPageNumbersToShow, 1);
  let endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);

  if (endPage - startPage < maxPageNumbersToShow - 1) {
    startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <Pagination>
        <PaginationItem disabled={currentPage <= 1}>
          <PaginationLink first onClick={() => onPageChange(1)} />
        </PaginationItem>
        <PaginationItem disabled={currentPage <= 1}>
          <PaginationLink previous onClick={() => onPageChange(currentPage - 1)} />
        </PaginationItem>
        {pageNumbers.map((number) => (
          <PaginationItem key={number} active={number === currentPage}>
            <PaginationLink onClick={() => onPageChange(number)}>
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem disabled={currentPage >= totalPages}>
          <PaginationLink next onClick={() => onPageChange(currentPage + 1)} />
        </PaginationItem>
        <PaginationItem disabled={currentPage >= totalPages}>
          <PaginationLink last onClick={() => onPageChange(totalPages)} />
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
