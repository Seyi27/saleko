import React from "react";
import "./CloseModalContainer.css";
import { BsChevronLeft, BsX } from "react-icons/bs";
import { CloseModalContainerProps } from "../../../types/types";

const CloseModalContainer = ({
  cancelIconOnly,
  handleCloseModal,
  handleAuthNavigate,
}: CloseModalContainerProps) => {
  return (
    <>
      {!cancelIconOnly ? (
        <div className="close_modal_container">
          <div
            className="close_modal_back_container"
            onClick={() => handleAuthNavigate?.("create_account")}
          >
            <BsChevronLeft color="#084C3F" size={15} />
            <span>Back</span>
          </div>

          <BsX
            size={25}
            style={{ cursor: "pointer" }}
            onClick={handleCloseModal}
          />
        </div>
      ) : (
        <div style={{textAlign:'right'}}>
          <BsX
            size={25}
            style={{ cursor: "pointer" }}
            onClick={handleCloseModal}
          />
        </div>
      )}
    </>
  );
};

export default CloseModalContainer;
