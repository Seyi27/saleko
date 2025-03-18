import React, { useState } from "react";
import {
  BsArrowLeft,
  BsArrowRight,
  BsChevronBarLeft,
  BsChevronCompactLeft,
  BsChevronCompactRight,
} from "react-icons/bs";
import "./Pagination.css";

const Pagination = ({
  itemsPerPage,
  currentPage,
  setCurrentPage,
  data,
}: any) => {
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total pages

  // Calculate the current range of items being displayed
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  // Function to handle page change
  const handlePageChange = (pageNumber: any) => {
    if (pageNumber < 1 || pageNumber > totalPages) return; // Ensure the page number is within bounds
    setCurrentPage(pageNumber);
  };

  const generatePaginationNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3; // Number of visible pages (1, 2, 3...)

    // Always show the first page
    pageNumbers.push(1);

    // Display pages close to the current page (e.g., 2, 3, 4)
    if (currentPage > 2) pageNumbers.push(currentPage - 1);
    pageNumbers.push(currentPage);
    if (currentPage <= totalPages - 1) pageNumbers.push(currentPage + 1);

    // Show "..." if there are more pages after the current range
    if (currentPage < totalPages - 3) {
      pageNumbers.push("...");
    }

    // Add the last page number if necessary
    if (totalPages > maxVisiblePages && currentPage <= totalPages - 1) {
      pageNumbers.push(totalPages);
    }

    // Remove duplicate page numbers
    return Array.from(new Set(pageNumbers));
  };

  return (
    <>
      <div className="pagination_container">
        <div className="pagination_controls">
          
          {/* Previous Button */}
          <button
            className="pagination_button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <BsArrowLeft color="#8E8E8E" size={16} />
            Previous
          </button>

          {/* Page Numbers */}
          <div>
            {generatePaginationNumbers().map((item, index) => {
              if (item === "...") {
                return (
                  <span key={index} className="pagination_ellipsis">
                    ...
                  </span>
                );
              }
              return (
                <button
                  key={index}
                  className={`pagination_number ${
                    currentPage === item ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(item)}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            className="pagination_button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <BsArrowRight color="#8E8E8E" size={16} />
          </button>
        </div>
      </div>

      {/* For mobile view */}
      <div className="pagination_container_mobile">
        <div className="pagination_controls_mobile">
          <div
            className={`${
              currentPage === 1 && "pagination_disabled"
            } pagination_row`}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <BsChevronCompactLeft color="#8E8E8E" size={18} />

            <p>Previous</p>
          </div>

          <hr
            style={{
              width: "0",
              height: "20px",
              border: "0.5px solid #A0B1C4",
            }}
          />

          <div className="pagination_row">
            <p className="pagination_number_mobile">{endIndex} </p>

            <p>out of {totalItems}</p>
          </div>

          <hr
            style={{
              width: "0",
              height: "20px",
              border: "0.5px solid #A0B1C4",
            }}
          />

          <div
            className={`${
              currentPage === totalPages && "pagination_disabled"
            } pagination_row`}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <p>Next</p>

            <BsChevronCompactRight color="#8E8E8E" size={18} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
