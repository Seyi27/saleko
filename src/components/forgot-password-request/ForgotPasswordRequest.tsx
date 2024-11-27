import React, { useEffect, useState } from "react";
import "./ForgotPasswordRequest.css";
import CustomButton from "../custom-button/CustomButton";
import { useNavigate } from "react-router-dom";

const ForgotPasswordRequest = () => {
  const [emailOrPhoneText, setEmailOrPhoneText] = useState("");
  const [emailOrPhoneTextError, setEmailOrPhoneTextError] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const navigate = useNavigate();

  const handleTextInput = (e: string) => {
    setEmailOrPhoneText(e.trim());
    setSubmittedValue(e.trim());
    if (!e.trim()) {
      setEmailOrPhoneTextError("Field cannot be empty");
    } else {
      setEmailOrPhoneTextError("");
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
    const routeData = {
      selectedValue: "phone",
      emailPhoneText: submittedValue,
    };

    e.preventDefault();
    navigate("/forgot-password/verification", { state: routeData });
  };

  return (
    <div className="forgot_password_request_container">
      <p className="forgot_password_request_text">Forgot Password?</p>
      <p className="forgot_password_request_instructions">
        No worries, we’ll send you reset instructions.
      </p>

      <form onSubmit={handleForgotFormSubmit}>
        <div className="email_phone_input_box">
          <input
            type="text"
            value={emailOrPhoneText}
            onChange={(e) => handleTextInput(e.target.value)}
            className={`email_phone_textinput ${
              emailOrPhoneTextError && "error_textInput"
            }`}
          />
          <label
            className={`${
              emailOrPhoneText.length == 0 ? "" : "email_phone_label"
            } ${emailOrPhoneTextError && "error_label"}`}
          >
            Email Address or Phone Number*
          </label>
          {emailOrPhoneTextError && (
            <span className="error_message">{emailOrPhoneTextError}</span>
          )}
        </div>

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
  );
};

export default ForgotPasswordRequest;
