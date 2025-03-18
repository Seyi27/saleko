import React from "react";
import "./Filter.css";
import { BsX } from "react-icons/bs";
import CustomButton from "../custom-button/CustomButton";

const Filter = ({ isOpen, closeModal }: any) => {
  if (!isOpen) return null; // If the modal is not open, don't render anything

  const handleOverlayClick = (e: any) => {
    // Close the modal when the overlay is clicked
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="filter_modal_overlay" onClick={handleOverlayClick}>
      <div className="filter_modal_content">
        <div className="filter_modal_header">
          <p>Filter</p>
          <BsX size={24} onClick={closeModal} style={{ cursor: "pointer" }} />
        </div>

        <div className="filter_btn_body_container">
          <div>
            <p>Categories</p>
          </div>
        </div>

        <div className="filter_btn_bottom_container">
          <CustomButton
            label="Reset"
            width={"150px"}
            height="40px"
            bgColor="white"
            textColor="#084C3F"
            fontSize={12}
            fontWeight={600}
            borderColor="#084C3F"
            borderWidth="1"
            borderRadius="5px"
            //   onClick={() =>
            //     setSelectedCategories((prev) => ({
            //       ...prev,
            //       [selectedFilter]: new Set(),
            //     }))
            //   }
          />

          <CustomButton
            label="Show 1000+ Results"
            width={"150px"}
            height="40px"
            bgColor="#084C3F"
            textColor="white"
            fontSize={12}
            fontWeight={600}
            borderRadius="5px"
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
