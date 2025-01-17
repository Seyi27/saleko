import React, { useEffect, useState } from "react";
import "./ForgotPasswordVerification.css";
import { useLocation, useNavigate } from "react-router-dom";
import PinInput from "react-pin-input";
import CustomButton from "../../custom-button/CustomButton";
import CloseModalContainer from "../close-auth-modal-container/CloseModalContainer";
import { useSelector } from "react-redux";
import { AuthValueProps } from "../../../types/types";
import { RootState } from "../../../store/store";

const ForgotPasswordVerification = ({
  handleCloseModal,
  handleAuthNavigate,
}: AuthValueProps) => {
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [sendCodeState, setSendCodeState] = useState(false);
  const [countDown, setCountDown] = useState(44);

  const fpSelectedValueType = useSelector(
    (state: RootState) => state.authValue.fpSelectedValueType
  );

  const fpEmailPhoneText = useSelector(
    (state: RootState) => state.authValue.fpEmailPhoneText
  );

  const handlePinSubmit = () => {
    if (pin !== "123456") {
      setPinError(true);
    } else {
      setPinError(false);
      handleAuthNavigate("forgot_password_reset");
    }
  };

  useEffect(() => {
    if (pin.length !== 6) {
      setDisabled(true);
    } else {
      setDisabled(false);
      setSendCodeState(true);
    }
  }, [pin]);

  useEffect(() => {
    if (countDown > 0) {
      const timer = setTimeout(() => {
        setCountDown((prev) => prev - 1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [countDown]);

  return (
    <>
      <CloseModalContainer
        handleCloseModal={handleCloseModal}
        handleAuthNavigate={()=>handleAuthNavigate("forgot_password_request")}
      />

      <div className="fp_verify_phone_email_container">
        <p className="fp_verify_confirm_phone_number">
          Confirm your{" "}
          {fpSelectedValueType == "phone" ? "phone number" : "email address"}
        </p>
        <p className="fp_verify_code_sent_text">
          Enter the code sent to the{" "}
          {fpSelectedValueType == "phone" ? "number" : "email"} {fpEmailPhoneText}
        </p>

        <div className="fp_verify_code_container">
          <span className="fp_verify_code_text">
            Verification Code<span style={{ color: "red" }}>*</span>
          </span>
          <PinInput
            length={6}
            initialValue=""
            //   secret
            //   secretDelay={100}
            onChange={(value, index) => {
              setPinError(false);
              setPin(value);
            }}
            type="numeric"
            inputMode="number"
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "20px",
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
          {pinError && (
            <span className="fp_verify_invalid_otp">Invalid OTP</span>
          )}
        </div>

        {/* Continue */}
        <CustomButton
          label="Continue"
          width={"100%"}
          height="55px"
          bgColor="#084C3F"
          textColor="white"
          fontSize={16}
          fontWeight={600}
          disabled={disabled}
          onClick={handlePinSubmit}
        />

        {sendCodeState ? (
          <CustomButton
            label="Send code again"
            width={"100%"}
            height="55px"
            bgColor="white"
            textColor="#084C3F"
            fontSize={13}
            fontWeight={600}
          />
        ) : (
          <div style={{ marginTop: "40px" }}>
            <p className="fp_verify_receive_verification_text">
              Didn't receive the verification code? It could take a
            </p>
            <p className="fp_verify_receive_verification_text_second">
              bit of time, request a new code in 
              <span style={{ color: "#084c3f", fontWeight: 600 }}>
                {countDown} seconds
              </span>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ForgotPasswordVerification;
