import React, { useEffect, useMemo, useState } from "react";
import "./CreateAccount.css";
import CustomButton from "../custom-button/CustomButton";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { countryCallingCodes } from "../../helpers/CountryCallingCodes";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNoError, setPhoneNoError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [selectedCode, setSelectedCode] = useState("+234");

  const [selectedValue, setSelectedValue] = useState("");
  const [emailPhoneText, setEmailPhoneText] = useState("");

  const navigate = useNavigate();

  const handleSelectionChange = (e: any) => {
    setSelectedCode(e.target.value);
  };

  const handleDropdown = (e: any) => {
    setSelectedValue(e.target.value);
  };

  const handleTextInput = (key: string, e: string) => {
    switch (key) {
      case "phone":
        setPhoneNo(e.trim());
        setEmailPhoneText(e.trim());
        if (!e.trim()) {
          setPhoneNoError("Phone Number cannot be empty");
        } else if (!/^\d+$/.test(e.trim())) {
          // if it is not numbers
          setPhoneNoError("Phone Number is not valid");
        } else if (!/^\d{11}$/.test(e.trim())) {
          setPhoneNoError("Invalid phone number format");
        } else {
          setPhoneNoError("");
        }
        break;
      case "email":
        setEmail(e.trim());
        setEmailPhoneText(e.trim());
        if (!e.trim()) {
          setEmailError("Email cannot be empty");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim())) {
          // if email is not valid
          setEmailError("Email is not valid");
        } else {
          setEmailError("");
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (selectedValue === "phone" && phoneNo && !phoneNoError) {
      setButtonDisabled(false);
    } else if (selectedValue === "email" && email && !emailError) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [selectedValue, emailError, phoneNoError, email, phoneNo]);

  const handleSubmit = (e: React.FormEvent) => {
    const routeData = {
      selectedValue: selectedValue,
      emailPhoneText: emailPhoneText,
    };

    e.preventDefault();
    navigate("/verification", { state: routeData });
  };

  return (
    <div className="create_form_container">
      <p className="create_account_text">Create Account</p>
      <p className="otp_verify_text">We will send an OTP verification to you</p>

      <form onSubmit={handleSubmit}>
        <div className="dropdown">
          <select
            value={selectedValue}
            onChange={handleDropdown}
            className="signup_dropdown"
          >
            <option value="" disabled selected hidden></option>
            <option value={"email"}>Email Address</option>
            <option value={"phone"}>Phone Number</option>
          </select>
          <label className={selectedValue?.length == 0 ? "" : "dropdown_label"}>
            Email or Phone No.*
          </label>
        </div>

        {selectedValue ? (
          selectedValue == "phone" ? (
            <div className="phone_input_box">
              <input
                type="text"
                value={phoneNo}
                onChange={(e) => handleTextInput("phone", e.target.value)}
                className={`phone_textinput ${
                  phoneNoError && "error_textInput"
                }`}
                maxLength={11}
              />
              <label
                className={`${phoneNo.length == 0 ? "" : "phone_label"} ${
                  phoneNoError && "error_label"
                }`}
              >
                Phone Number
              </label>
              {phoneNoError && (
                <span className="error_message">{phoneNoError}</span>
              )}
            </div>
          ) : (
            <div className="email_input_box">
              <input
                type="text"
                value={email}
                onChange={(e) => handleTextInput("email", e.target.value)}
                className={`email_textinput ${emailError && "error_textInput"}`}
              />
              <label
                className={`${email.length > 0 ? "email_label" : ""}  ${
                  emailError ? "error_label" : ""
                }`}
              >
                {" "}
                {/* ${emailError ? (email ? 'error_label' : '') : ''} */}
                Enter your email
              </label>
              {emailError && (
                <span className="error_message">{emailError}</span>
              )}
            </div>
          )
        ) : null}

        <div style={{ margin: "20px" }} />

        {/* Send Code Button */}
        <CustomButton
          label="Send Code"
          width={"100%"}
          height="55px"
          bgColor="#084C3F"
          textColor="white"
          fontSize={15}
          fontWeight={600}
          disabled={buttonDisabled}
          onClick={handleSubmit}
        />

        {/* Form Divider */}
        <div className="form_divider">
          <div className="divider" />
          <p>Or</p>
          <div className="divider" />
        </div>

        <div style={{ margin: "20px" }} />

        {/* Continue with Apple */}
        <CustomButton
          label="Continue with Apple"
          width={"100%"}
          height="55px"
          bgColor="white"
          borderColor="#DFDFDF"
          borderWidth="1px"
          icon={<FaApple size={16} />}
        />

        <div style={{ margin: "20px" }} />

        {/* Continue with Google */}
        <CustomButton
          label="Continue with Google"
          width={"100%"}
          height="55px"
          bgColor="white"
          borderColor="#DFDFDF"
          borderWidth="1px"
          icon={<FcGoogle size={16} />}
        />
      </form>
    </div>
  );
};

export default CreateAccount;
