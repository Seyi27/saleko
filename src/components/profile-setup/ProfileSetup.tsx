import React, { useEffect, useState } from "react";
import "./ProfileSetup.css";
import CustomButton from "../custom-button/CustomButton";
import PasswordChecklist from "react-password-checklist";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons from react-icons
import CustomModal from "../custom-modal/CustomModal";
import { useLocation } from "react-router-dom";
import CustomTextInput from "../custom-textInput/CustomTextInput";

const ProfileSetup = () => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [secondNameError, setSecondNameError] = useState("");
  const [phoneNoError, setPhoneNoError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [toggleVisibility, setToggleVisibility] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [termsChecked, setTermsChecked] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();

  // Access passed data from location.state
  const { selectedValue } = location.state;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleToggle = () => {
    setToggleVisibility(!toggleVisibility);
  };

  const handleCheckboxChange = () => {
    setTermsChecked(!termsChecked);
  };

  const handleTextInput = (key: string, e: string) => {
    switch (key) {
      case "firstName":
        setFirstName(e.trim());
        if (!e.trim()) {
          setFirstNameError("First Name cannot be empty");
        } else {
          setFirstNameError("");
        }
        break;
      case "secondName":
        setSecondName(e.trim());
        if (!e.trim()) {
          setSecondNameError("Second Name cannot be empty");
        } else {
          setSecondNameError("");
        }
        break;
      case "phone":
        setPhoneNo(e.trim());
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
        if (!e.trim()) {
          setEmailError("Email cannot be empty");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim())) {
          // if email is not valid
          setEmailError("Email is not valid");
        } else {
          setEmailError("");
        }
        break;
      case "password":
        setPassword(e.trim());
        if (!e.trim()) {
          setPasswordError("Password cannot be empty");
        } else {
          setPasswordError("");
        }
        break;
      default:
        break;
    }
  };

  // Function to check if the form is valid and enable/disable the button
  const checkFormValidity = () => {
    if (
      firstName &&
      secondName &&
      phoneNo &&
      (email || phoneNo) &&
      password &&
      !firstNameError &&
      !secondNameError &&
      !phoneNoError &&
      !emailError &&
      !passwordError &&
      termsChecked
    ) {
      setButtonDisabled(false); // Enable button
    } else {
      setButtonDisabled(true); // Disable button
    }
  };

  // Trigger form validation whenever any input changes
  useEffect(() => {
    checkFormValidity();
  }, [
    firstName,
    secondName,
    phoneNo,
    email,
    password,
    firstNameError,
    secondNameError,
    phoneNoError,
    emailError,
    passwordError,
    termsChecked,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openModal();
  };

  return (
    <>
      <div className="profile_setup_form_container">
        <p className="setup_profile_text">Set up your profile</p>

        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="first_name_input_box">
            <input
              type="text"
              value={firstName}
              onChange={(e) => handleTextInput("firstName", e.target.value)}
              className={`first_name_textinput ${
                firstNameError && "error_textInput"
              }`}
            />
            <label
              className={`${firstName.length > 0 ? "first_name_label" : ""}  ${
                firstNameError ? "error_label" : ""
              }`}
            >
              Enter your first name*
            </label>
            {firstNameError && (
              <span className="error_message">{firstNameError}</span>
            )}
          </div>

          {/* Second Name */}
          <div className="second_name_input_box">
            <input
              type="text"
              value={secondName}
              onChange={(e) => handleTextInput("secondName", e.target.value)}
              className={`second_name_textinput ${
                secondNameError && "error_textInput"
              }`}
            />
            <label
              className={`${
                secondName.length > 0 ? "second_name_label" : ""
              }  ${secondNameError ? "error_label" : ""}`}
            >
              Enter your second name*
            </label>
            {secondNameError && (
              <span className="error_message">{secondNameError}</span>
            )}
          </div>

          {selectedValue == "phone" ? (
            // Phone Number
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
            // Email Address
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
                Enter your email
              </label>
              {emailError && (
                <span className="error_message">{emailError}</span>
              )}
            </div>
          )}
          {/* Password */}
          <div className="password_input_box">
            <div
              className={`password_textinput_container ${
                passwordError && "error_textInput"
              }`}
            >
              <input
                type={toggleVisibility ? "text" : "password"}
                value={password}
                onChange={(e) => handleTextInput("password", e.target.value)}
                className="password_textinput"
              />
              <span onClick={handleToggle}>
                {toggleVisibility ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
            <label
              className={`${password.length > 0 ? "password_label" : ""}  ${
                passwordError ? "error_label" : ""
              }`}
            >
              Enter Password*
            </label>
            {passwordError && (
              <span className="error_message">{passwordError}</span>
            )}
          </div>

          {/* Password Checklist */}
          {password && (
            <div className="password_checklist_container">
              <PasswordChecklist
                rules={[
                  "minLength",
                  "capital",
                  "lowercase",
                  "number",
                  "specialChar",
                ]}
                minLength={8}
                value={password}
                onChange={(isValid) => {}}
                messages={{
                  minLength: "8 characters",
                  number: "Number",
                  capital: "Uppercase",
                  specialChar: "Special Characters",
                  lowercase: "Lowercase",
                }}
                className="password_checklist"
                hideIcon={true}
                validTextColor="white"
                invalidTextColor="white"
              />
            </div>
          )}

          <div style={{ margin: "20px" }} />

          <div className="terms_conditions">
            <input
              type="checkbox"
              checked={termsChecked}
              onChange={handleCheckboxChange}
              className="checkbox"
            />
            <span style={{ color: "#8E8E8E", fontSize: "12px" }}>
              I accept the{" "}
              <span style={{ color: "#084C3F", fontWeight: 600 }}>
                Terms & conditions and Privacy Notice.
              </span>
            </span>
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
            onClick={handleSubmit}
          />
        </form>
      </div>

      <CustomModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        label="signup"
      />
    </>
  );
};

export default ProfileSetup;
