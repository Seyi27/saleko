import React, { useEffect, useState } from "react";
import "./ForgotPasswordRequest.css";
import CustomButton from "../../custom-button/CustomButton";
import { useNavigate } from "react-router-dom";
import CustomTextInput from "../../custom-textInput/CustomTextInput";
import CloseModalContainer from "../close-auth-modal-container/CloseModalContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  addFpEmailPhoneText,
  addFpNotification_reference,
  addFpSelectedValueType,
} from "../../../slice/authValueSlice";
import { AuthModalScreenProps } from "../../../types/types";
import { useSendOtpCodeMutation } from "../../../services/authApi";
import { RootState } from "../../../store/store";
import { showCustomToast } from "../../custom-toast/CustomToast";

const ForgotPasswordRequest = ({
  handleCloseModal,
  handleAuthNavigate,
}: AuthModalScreenProps) => {
  const dispatch = useDispatch();
  const [emailOrPhoneText, setEmailOrPhoneText] = useState("");
  const [emailOrPhoneTextError, setEmailOrPhoneTextError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [focusedTextinput, setFocusedTextinput] = useState(false);

  const [
    sendOtpCode,
    {
      data: sendOtpCodeData,
      isSuccess: sendOtpCodeSuccess,
      error: sendOtpCodeError,
      isError: sendOtpCodeIsError,
      isLoading: sendOtpCodeLoading,
    },
  ] = useSendOtpCodeMutation();

  const handleTextInput = (key: string, e: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const phoneRegex = /^\d{1,11}$/;
    const phoneRegex = /^\+234\d{10}$/;

    setEmailOrPhoneText(e.trim());
    dispatch(addFpEmailPhoneText(e.trim()));
    if (!e.trim()) {
      setEmailOrPhoneTextError("Field cannot be empty");
    } else if (!emailRegex.test(e.trim()) && !phoneRegex.test(e.trim())) {
      setEmailOrPhoneTextError("Enter a valid email or phone number.");
    } else {
      setEmailOrPhoneTextError(""); // Clear the error
    }
  };

  useEffect(() => {
    if (emailOrPhoneText && !emailOrPhoneTextError) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [emailOrPhoneText, emailOrPhoneTextError]);

  useEffect(() => {
    if (sendOtpCodeSuccess) {
      dispatch(
        addFpNotification_reference(sendOtpCodeData.data.notification_reference)
      );
      handleAuthNavigate("forgot_password_verification");
    }

    if (sendOtpCodeIsError && sendOtpCodeError) {
      if ("status" in sendOtpCodeError) {
        setFocusedTextinput(false); // to remove the placeholder when there is an error

        if (sendOtpCodeError.status == 400) {
          showCustomToast({
            message: "Username not found",
            type: "error",
          });

          setEmailOrPhoneText("");
        }
      }
    } 
  }, [sendOtpCodeSuccess, sendOtpCodeError]);

  const handleForgotFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+234\d{10}$/;
    let thisSelectedValue;

    if (emailRegex.test(emailOrPhoneText)) {
      // to check if the input is email
      thisSelectedValue = "email";
    } else if (phoneRegex.test(emailOrPhoneText)) {
      // to check if the input is phone number
      thisSelectedValue = "phone";
    } else {
      console.log("it is");
    }

    dispatch(addFpSelectedValueType(thisSelectedValue));
    sendOtpCode({
      username: emailOrPhoneText,
      mode: thisSelectedValue == "email" ? "email" : "phone_number",
    });
  };

  return (
    <>
      <CloseModalContainer
        handleCloseModal={handleCloseModal}
        handleAuthNavigate={() => handleAuthNavigate("login_form")}
      />

      <div className="forgot_password_request_container">
        <p className="forgot_password_request_text">Forgot Password?</p>
        <p className="forgot_password_request_instructions">
          No worries, we’ll send you reset instructions.
        </p>

        <form onSubmit={handleForgotFormSubmit} className="fp_request_form">
          <CustomTextInput
            type={"normal"}
            name={"emailOrPhoneText"}
            value={emailOrPhoneText}
            label={"Email Address or Phone Number*"}
            errorMessage={emailOrPhoneTextError}
            idAndHtmlFor={"emailOrPhoneText"}
            handleTextInput={handleTextInput}
            placeholder="e.g johndoe@gmail.com or +2348177777777"
            focused={focusedTextinput}
            setFocused={setFocusedTextinput}
          />

          <div style={{ margin: "20px" }} />

          {/* Continue Button */}
          <CustomButton
            label="Continue"
            width={"100%"}
            height="55px"
            bgColor="#084C3F"
            textColor="white"
            fontSize={15}
            fontWeight={600}
            disabled={buttonDisabled}
            onClick={handleForgotFormSubmit}
            loader={sendOtpCodeLoading}
          />
        </form>
      </div>
    </>
  );
};

export default ForgotPasswordRequest;
