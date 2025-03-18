import React from "react";
import "./CustomModal.css";
import CustomButton from "../custom-button/CustomButton";
import { CustomModalProps } from "../../types/types";
import { SalekoSuccessGif } from "../../assets/images";
import order_confirmed_img from "../../assets/images/svg/order_confirmed_img.svg";
import order_confirmed_check from "../../assets/images/svg/order_confimed_check.svg";
import { BsX } from "react-icons/bs";
import { formatPrice } from "../../helpers/helper";

const CustomModal = ({
  isOpen,
  closeModal,
  label,
  onclick,
  item,
  quantity,
}: CustomModalProps) => {
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
          <img src={SalekoSuccessGif} className="modal_image" />
          <p className="header_text">Welcome to Saleko!</p>
          <p className="body_text">
            Your account has been successfully created. Start exploring unique
            items from trusted vendors right away!
          </p>

          <CustomButton
            label="Login"
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

    case "login":
      contentBody = (
        <>
          <img src={SalekoSuccessGif} className="modal_image" />
          <p className="header_text">Welcome to Saleko!</p>
          <p className="body_text">You have successfully logged in.</p>

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
          <img src={SalekoSuccessGif} className="modal_image" />
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
            onClick={closeModal}
          />
        </>
      );
      break;

    case "order_confirmed":
      contentBody = (
        <div>
          <img src={order_confirmed_img} className="order_confirmed_image" />
          <div className="order_confirmed_container">
            <p>Your order as been confirmed</p>
            <img
              src={order_confirmed_check}
              className="order_confirmed_check_image"
            />
          </div>
          <p className="order_confirmed_id">
            Order ID: <span style={{ color: "#4F4F4F" }}>SALURUI</span>
          </p>

          <CustomButton
            label="Done"
            width={"100%"}
            height="55px"
            bgColor="#084C3F"
            textColor="white"
            fontSize={12}
            fontWeight={600}
            onClick={closeModal}
          />
        </div>
      );
      break;

    case "confirm_negotiation_modal":
      contentBody = (
        <div>
          <div className="confirm_negotiation_modal_header">
            <p>Transaction PIN</p>
            <BsX size={20} onClick={closeModal} style={{ cursor: "pointer" }} />
          </div>

          <hr style={{ border: "0.5px solid #C1C7DE" }} />

          <div>
            <p className="confirm_negotiation_accept_price_text">Are you sure you want to accept this negotiated price?</p>

            <div className="confirm_negotiation_item_body_container">
              <img
                src={item?.productImages?.[0].medium_image_url}
                className="confirm_negotiation_item_image"
              />

              <div>
                <p className="confirm_negotiation_item_name">{item?.name}</p>

                <p className="confirm_negotiation_item_quantity">
                  Qty: {quantity}
                </p>

                <div className="confirm_negotiation_item_price_row">
                  <p
                    style={{
                      color: "#999999",
                      textDecorationLine: "line-through",
                      margin: 0,
                    }}
                  >
                    ₦{formatPrice(item?.price ?? 0)}
                  </p>
                  <p style={{ color: "red", margin: 0 }}>₦650,000</p>
                </div>
              </div>
            </div>
          </div>

          <div className="confirm_negotiation_button_row">
            <CustomButton
              label="Cancel"
              width={"100%"}
              height="50px"
              bgColor="white"
              textColor="#084C3F"
              borderWidth="1px"
              borderColor="#084C3F"
              fontSize={12}
              fontWeight={600}
              onClick={closeModal}
            />

            <CustomButton
              label="Done"
              width={"100%"}
              height="50px"
              bgColor="#084C3F"
              textColor="white"
              fontSize={12}
              fontWeight={600}
              onClick={onclick}
            />
          </div>
        </div>
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
