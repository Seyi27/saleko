import React, { useEffect, useState } from "react";
import "./TransactionPinModal.css";
import { BsX } from "react-icons/bs";
import PinInput from "react-pin-input";
import CustomButton from "../custom-button/CustomButton";
import { TransactionPinModalProp } from "../../types/types";

const TransactionPinModal = ({
  isOpen,
  closeModal,
  setOrderConfirmedModal,
}: TransactionPinModalProp) => {
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [pinDisabled, setPinDisabled] = useState(true);

  useEffect(() => {
    if (pin.length !== 4) {
      setPinDisabled(true);
    } else {
      setPinDisabled(false);
    }
  }, [pin]);

  if (!isOpen) return null; // If the modal is not open, don't render anything

  const handleOverlayClick = (e: any) => {
    // Close the modal when the overlay is clicked
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handlePinSubmit = () => {
    if (pin !== "1234") {
      setPinError(true);
    } else {
      setPinError(false);
      //   setOpenModal(false);
      closeModal();
      setOrderConfirmedModal(true);
    }
  };

  return (
    <div className="custom_input_modal_overlay" onClick={handleOverlayClick}>
      <div className="custom_input_modal_content">
        <div>
          <div className="custom_input_modal_header">
            <p>Transaction PIN</p>
            <BsX size={20} onClick={closeModal} style={{ cursor: "pointer" }} />
          </div>

          <hr style={{ border: "0.5px solid #C1C7DE" }} />

          <div className="pin_container">
            <p className="pin_text">Enter your 4-digit transaction PIN</p>

            <div>
              <PinInput
                length={4}
                initialValue=""
                secret
                //   secretDelay={100}
                onChange={(value, index) => {
                  setPinError(false);
                  setPin(value);
                }}
                type="numeric"
                inputMode="number"
                style={{
                  display: "flex",
                  gap: "20px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
                inputStyle={{
                  borderColor: pinError ? "red" : "#084C3F",
                  borderWidth: "2px",
                  borderRadius: "5px",
                }}
                //   inputFocusStyle={{ borderColor: "blue" }}
                onComplete={(value, index) => {}}
                autoSelect={true}
                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
              />
              {pinError && <span className="invalid_otp">Invalid OTP</span>}
            </div>

            <div style={{ marginTop: "20px", width: "100%" }}>
              <CustomButton
                label="Pay"
                width={"100%"}
                height="50px"
                bgColor="#084c3f"
                borderColor="#FFFFFF"
                borderWidth="1px"
                textColor="white"
                fontSize={14}
                fontWeight={700}
                disabled={pinDisabled}
                onClick={handlePinSubmit}
              />
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default TransactionPinModal;
