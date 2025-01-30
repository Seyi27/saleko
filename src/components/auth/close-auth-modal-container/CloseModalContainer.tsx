import React from "react";
import "./CloseModalContainer.css";
import { BsChevronLeft, BsX } from "react-icons/bs";
import { CloseModalContainerProps } from "../../../types/types";
import saleko_green from '../../../assets/images/svg/saleko_green.svg'

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

          <img src={saleko_green} className="saleko_green_logo"/>

          <BsX
            size={25}
            style={{ cursor: "pointer" }}
            onClick={handleCloseModal}
          />
        </div>
      ) : (
        <div className="close_modal_container">
          <img src={saleko_green} className="saleko_green_logo"/>
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
