import React, { useEffect, useState } from "react";
import "./ProfileSetup.css";
import CustomButton from "../../custom-button/CustomButton";
import PasswordChecklist from "react-password-checklist";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons from react-icons
import CustomModal from "../../custom-modal/CustomModal";
import { useLocation } from "react-router-dom";
import CustomTextInput from "../../custom-textInput/CustomTextInput";

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
      // phoneNo &&
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
          <CustomTextInput
            type={"normal"}
            name={"firstName"}
            value={firstName}
            label={"Enter your first name*"}
            errorMessage={firstNameError}
            idAndHtmlFor={"first_name"}
            handleTextInput={handleTextInput}
          />

          {/* Second Name */}
          <CustomTextInput
            type={"normal"}
            name={"secondName"}
            value={secondName}
            label={"Enter your last name*"}
            errorMessage={secondNameError}
            idAndHtmlFor={"second_name"}
            handleTextInput={handleTextInput}
          />

          {selectedValue == "phone" ? (
            // Phone Number
            <CustomTextInput
              type={"phoneNo"}
              name={"phone"}
              value={phoneNo}
              label={"Phone Number"}
              errorMessage={phoneNoError}
              idAndHtmlFor={"phone"}
              handleTextInput={handleTextInput}
            />
          ) : (
            // Email Address
            <CustomTextInput
              type={"normal"}
              name={"email"}
              value={email}
              label={"Enter your email"}
              errorMessage={emailError}
              idAndHtmlFor={"email"}
              handleTextInput={handleTextInput}
            />
          )}

          {/* Password */}
          <CustomTextInput
            type={"password"}
            name={"password"}
            value={password}
            label={"Enter password*"}
            errorMessage={passwordError}
            idAndHtmlFor={"password_Input"}
            handleTextInput={handleTextInput}
          />

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
