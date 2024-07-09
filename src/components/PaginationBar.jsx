import React from "react";
import { Pagination } from "react-bootstrap";

function PaginationBar({ currentPage, totalPages, handlePageChange }) {
  return (
    <Pagination>
      <Pagination.First onClick={() => handlePageChange(1)} />
      <Pagination.Prev
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      <Pagination.Item onClick={() => handlePageChange(1)} active={currentPage === 1}>
        {1}
      </Pagination.Item>
      {currentPage > 3 && <Pagination.Ellipsis />}

      {currentPage > 2 && (
        <Pagination.Item onClick={() => handlePageChange(currentPage - 1)}>
          {currentPage - 1}
        </Pagination.Item>
      )}
      {currentPage > 1 && (
        <Pagination.Item onClick={() => handlePageChange(currentPage)}>
          {currentPage}
        </Pagination.Item>
      )}
      <Pagination.Item active>{currentPage}</Pagination.Item>

      {currentPage < totalPages && (
        <Pagination.Item onClick={() => handlePageChange(currentPage + 1)}>
          {currentPage + 1}
        </Pagination.Item>
      )}
      {currentPage < totalPages - 1 && (
        <Pagination.Item onClick={() => handlePageChange(currentPage + 2)}>
          {currentPage + 2}
        </Pagination.Item>
      )}

      {currentPage < totalPages - 2 && <Pagination.Ellipsis />}
      {currentPage < totalPages && (
        <Pagination.Item onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </Pagination.Item>
      )}

      <Pagination.Next
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last onClick={() => handlePageChange(totalPages)} />
    </Pagination>
  );
}

export default PaginationBar;
