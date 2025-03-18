import React, { useEffect, useState } from "react";
import "./ForgotPasswordVerification.css";
import { useLocation, useNavigate } from "react-router-dom";
import PinInput from "react-pin-input";
import CustomButton from "../../custom-button/CustomButton";
import CloseModalContainer from "../close-auth-modal-container/CloseModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { AuthModalScreenProps } from "../../../types/types";
import { RootState } from "../../../store/store";
import {
  useSendOtpCodeMutation,
  useVerifyOtpMutation,
} from "../../../services/authApi";
import { showCustomToast } from "../../custom-toast/CustomToast";
import {
  addFpNotification_reference,
  addFpTempOtpForPasswordReset,
} from "../../../slice/authValueSlice";

const ForgotPasswordVerification = ({
  handleCloseModal,
  handleAuthNavigate,
}: AuthModalScreenProps) => {
  const dispatch = useDispatch();
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [sendCodeState, setSendCodeState] = useState(false);
  const [countDown, setCountDown] = useState(40);

  const fpSelectedValueType = useSelector(
    (state: RootState) => state.authValue.fpSelectedValueType
  );

  const fpEmailPhoneText = useSelector(
    (state: RootState) => state.authValue.fpEmailPhoneText
  );

  const fpNotificationRef = useSelector(
    (state: RootState) => state.authValue.fpNotification_reference
  );

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const [sendOtpCode, { isLoading: sendOtpCodeLoading }] =
    useSendOtpCodeMutation();

  useEffect(() => {
    if (countDown > 0) {
      const timer = setTimeout(() => {
        setCountDown((prev) => prev - 1);
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (countDown == 0) {
      setSendCodeState(true);
    }
  }, [countDown]);

  // submit and verify pin
  const handlePinSubmit = async () => {
    try {
      const verifyOtpBody = {
        otp: pin,
        reference_code: fpNotificationRef,
        sent_to: fpEmailPhoneText,
      };

      const response = await verifyOtp(verifyOtpBody).unwrap();

      if (response) {
        setPinError(false);
        dispatch(addFpTempOtpForPasswordReset(response.data.data.otp));
        handleAuthNavigate("forgot_password_reset");

        showCustomToast({
          message: "Verification successfull",
          type: "success",
        });
      }
    } catch (error: any) {
      if (error?.status === 400 || error?.status === 422) {
        setPinError(true);
        showCustomToast({
          message: "Invalid Verification Code",
          type: "error",
        });
      }
    }
  };

  // to resend otp
  const handleResendCode = async () => {
    try {
      const response = await sendOtpCode({
        username: fpEmailPhoneText,
        mode: fpSelectedValueType == "email" ? "email" : "phone_number",
      }).unwrap();

      if (response) {
        dispatch(
          addFpNotification_reference(response.data.data.notification_reference)
        );
        setSendCodeState(false);
        setCountDown(40);
      }
    } catch (error) {
      showCustomToast({
        message: "Kindly check your internet connection.",
        type: "error",
      });
    }
  };

  return (
    <>
      <CloseModalContainer
        handleCloseModal={handleCloseModal}
        handleAuthNavigate={() => handleAuthNavigate("forgot_password_request")}
      />

      <div className="fp_verify_phone_email_container">
        <p className="fp_verify_confirm_phone_number">
          Confirm your{" "}
          {fpSelectedValueType == "phone" ? "phone number" : "email address"}
        </p>
        <p className="fp_verify_code_sent_text">
          Enter the code sent to the{" "}
          {fpSelectedValueType == "phone" ? "number" : "email"}{" "}
          {fpEmailPhoneText}
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
            }}
            //   inputFocusStyle={{ borderColor: "blue" }}
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
          loader={isLoading}
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
            loader={sendOtpCodeLoading}
            onClick={handleResendCode}
            loaderColor={true}
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
