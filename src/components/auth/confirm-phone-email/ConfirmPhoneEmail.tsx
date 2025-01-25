import React, { useEffect, useState } from "react";
import "./ConfirmPhoneEmail.css";
import CustomButton from "../../custom-button/CustomButton";
import PinInput from "react-pin-input";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsChevronLeft, BsX } from "react-icons/bs";
import CloseModalContainer from "../close-auth-modal-container/CloseModalContainer";
import { AuthModalScreenProps } from "../../../types/types";
import { RootState } from "../../../store/store";
import { useVerifyOtpMutation } from "../../../services/authApi";
import { showCustomToast } from "../../custom-toast/CustomToast";

const ConfirmPhoneEmail = ({
  handleCloseModal,
  handleAuthNavigate,
}: AuthModalScreenProps) => {
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [sendCodeState, setSendCodeState] = useState(false);
  const [countDown, setCountDown] = useState(44);

  const selectedDropdownValue = useSelector(
    (state: RootState) => state.authValue.selectedDropdownValue
  );
  const emailPhoneText = useSelector(
    (state: RootState) => state.authValue.emailPhonenumberText
  );

  const userNotificationRef = useSelector(
    (state: RootState) => state.createAccountData.notification_reference
  );

  const [verifyOtp, { data, isSuccess, isError, error, isLoading }] =
    useVerifyOtpMutation();

  useEffect(() => {
    if (isSuccess) {
      setPinError(false);
      handleAuthNavigate("profile_setup");

      showCustomToast({
        message: "Verification Code successfull",
        type: "success",
      });
    }
    if (isError && error) {
      if ("status" in error) {
        if (error.status == 400 || error.status == 422) {
          setPinError(true)
          showCustomToast({
            message: "Invalid Verification Code",
            type: "error",
          });
        }
      }
    }
  }, [data, isSuccess, isError, error]);

  console.log("confirm data", data);

  const handlePinSubmit = () => {
    const verifyOtpBody = {
      otp: pin,
      reference_code: userNotificationRef,
      sent_to: emailPhoneText,
    };

    verifyOtp(verifyOtpBody);
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
        handleAuthNavigate={() => handleAuthNavigate("create_account")}
      />

      <div className="verify_phone_email_container">
        <p className="confirm_phone_number">
          Confirm your{" "}
          {selectedDropdownValue == "phone" ? "phone number" : "email address"}
        </p>
        <p className="code_sent_text">
          Enter the code sent to the{" "}
          {selectedDropdownValue == "phone" ? "number" : "email"}{" "}
          {emailPhoneText}
        </p>

        <div className="verify_code_container">
          <span className="verify_code_text">
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
              if (value.length === 6) {
                setDisabled(false);
                setSendCodeState(true);
              } else {
                setDisabled(true);
              }
            }}
            onComplete={(value) => {
              setPinError(false);
              setPin(value);
              setDisabled(false); // Enable the button after completion
              setSendCodeState(true);
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
              width: "40px",
              height: "40px",
            }}
            //   inputFocusStyle={{ borderColor: "blue" }}
            autoSelect={true}
            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
          />
          {pinError && <span className="invalid_otp">Invalid OTP</span>}
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
          loader={isLoading}
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
            <p className="receive_verification_text">
              Didn't receive the verification code? It could take a
            </p>
            <p className="receive_verification_text_second">
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

export default ConfirmPhoneEmail;
