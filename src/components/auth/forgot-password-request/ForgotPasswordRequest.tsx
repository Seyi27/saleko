import React, { useEffect, useState } from "react";
import "./ForgotPasswordRequest.css";
import CustomButton from "../../custom-button/CustomButton";
import { useNavigate } from "react-router-dom";
import CustomTextInput from "../../custom-textInput/CustomTextInput";
import CloseModalContainer from "../close-auth-modal-container/CloseModalContainer";
import { useDispatch } from "react-redux";
import { addFpEmailPhoneText, addFpSelectedValueType } from "../../../slice/authValueSlice";
import { AuthModalScreenProps } from "../../../types/types";

const ForgotPasswordRequest = ({
  handleCloseModal,
  handleAuthNavigate,
}: AuthModalScreenProps) => {
  const [emailOrPhoneText, setEmailOrPhoneText] = useState("");
  const [emailOrPhoneTextError, setEmailOrPhoneTextError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const dispatch = useDispatch();

  const handleTextInput = (key: string, e: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{1,11}$/;

    setEmailOrPhoneText(e.trim());
    dispatch(addFpEmailPhoneText(e.trim()))
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

  const handleForgotFormSubmit = (e: React.FormEvent) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{1,11}$/;
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

    dispatch(addFpSelectedValueType(thisSelectedValue))

    e.preventDefault();
    handleAuthNavigate("forgot_password_verification");
  };

  return (
    <>
      <CloseModalContainer
        handleCloseModal={handleCloseModal}
        handleAuthNavigate={()=>handleAuthNavigate("login_form")}
      />

      <div className="forgot_password_request_container">
        <p className="forgot_password_request_text">Forgot Password?</p>
        <p className="forgot_password_request_instructions">
          No worries, we’ll send you reset instructions.
        </p>

        <form onSubmit={handleForgotFormSubmit}>
          <CustomTextInput
            type={"normal"}
            name={"emailOrPhoneText"}
            value={emailOrPhoneText}
            label={"Email Address or Phone Number*"}
            errorMessage={emailOrPhoneTextError}
            idAndHtmlFor={"emailOrPhoneText"}
            handleTextInput={handleTextInput}
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
          />
        </form>
      </div>
    </>
  );
};

export default ForgotPasswordRequest;
