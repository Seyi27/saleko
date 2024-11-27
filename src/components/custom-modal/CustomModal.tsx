import React from "react";
import "./CustomModal.css";
import CustomButton from "../custom-button/CustomButton";
import { CustomModalProps } from "../../types/types";
import { SalekoSuccessGif } from "../../assets/images";

const CustomModal = ({ isOpen, closeModal, label, onclick }: CustomModalProps) => {
  if (!isOpen) return null; // If the modal is not open, don't render anything

  const handleOverlayClick = (e: any) => {
    // Close the modal when the overlay is clicked
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  let contentBody = null;

  switch (label) {
    case "signup":
      contentBody = (
        <>
          <img
            src={SalekoSuccessGif}
            className="modal_image"
          />
          <p className="header_text">Welcome to Saleko!</p>
          <p className="body_text">
            Your account has been successfully created. Start exploring unique
            items from trusted vendors right away!
          </p>

          <CustomButton
            label="Go to Homepage"
            width={"100%"}
            height="55px"
            bgColor="#084C3F"
            textColor="white"
            fontSize={15}
            fontWeight={600}
            onClick={closeModal}
          />
        </>
      );
      break;

    case "password_reset":
      contentBody = (
        <>
          <img
            src={SalekoSuccessGif}
            className="modal_image"
          />
          <p className="header_text">Password Reset Successfully</p>
          <p className="body_text">
            The password has been successfully reset, you can log in back with a
            new password
          </p>

          <CustomButton
            label="Login"
            width={"100%"}
            height="55px"
            bgColor="#084C3F"
            textColor="white"
            fontSize={15}
            fontWeight={600}
            onClick={onclick}
          />
        </>
      );
      break;
    default:
    // contentBody = <Text>No content available</Text>;
  }
  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        {contentBody} {/* Display any content passed to the modal */}
      </div>
    </div>
  );
};

export default CustomModal;
