import React, { useEffect, useState } from "react";
import "./ProfileSetup.css";
import CustomButton from "../../custom-button/CustomButton";
import PasswordChecklist from "react-password-checklist";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons from react-icons
import CustomModal from "../../custom-modal/CustomModal";
import { useLocation } from "react-router-dom";
import CustomTextInput from "../../custom-textInput/CustomTextInput";
import { useDispatch, useSelector } from "react-redux";
import CloseModalContainer from "../close-auth-modal-container/CloseModalContainer";
import { AuthModalScreenProps } from "../../../types/types";
import { RootState } from "../../../store/store";
import { useCompleteSignupMutation } from "../../../services/authApi";
import { addUser } from "../../../slice/userDetailsSlice";
import { showCustomToast } from "../../custom-toast/CustomToast";
import { addActiveScreen } from "../../../slice/authValueSlice";

const ProfileSetup = ({
  handleCloseModal,
  handleAuthNavigate,
  handleOpenSignupModal,
}: AuthModalScreenProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneNoError, setPhoneNoError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [selectedCode, setSelectedCode] = useState("+234");

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [termsChecked, setTermsChecked] = useState(false);

  const [focusedTextinput, setFocusedTextinput] = useState(false);

  const dispatch = useDispatch();

  const selectedDropdownValue = useSelector(
    (state: RootState) => state.authValue.selectedDropdownValue
  );

  // const [selectedDropdownValue, setselectedDropdownValue] = useState("phone")

  const [completeSetup, { data, isLoading, isError, error, isSuccess }] =
    useCompleteSignupMutation();

  useEffect(() => {
    if (isSuccess) {
      handleOpenSignupModal?.();
      handleCloseModal();
      dispatch(addActiveScreen("login_form"));
    }

    if (isError && error) {
      if ("status" in error) {
        setFocusedTextinput(false);

        if (error.status == 400 || error.status == 422) {
          showCustomToast({
            message: "Your username is not verified.",
            type: "error",
          });

          setFirstName("");
          setLastName("");
          setPhoneNo("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setTermsChecked(false);
        }
      }
    }
  }, [data, isSuccess, isError]);

  const handleCheckboxChange = () => {
    setTermsChecked(!termsChecked);
  };

  const handleTextInput = (key: string, e: string) => {
    switch (key) {
      case "firstName":
        if (!e.trim()) {
          setFirstName("");
          setFirstNameError("First Name cannot be empty");
        } else if (/^[A-Za-z]+$/.test(e.trim())) {
          setFirstName(e.trim());
          setFirstNameError("");
        } else {
          setFirstNameError("");
        }
        break;
      case "lastName":
        if (!e.trim()) {
          setLastName("");
          setLastNameError("Last Name cannot be empty");
        } else if (/^[A-Za-z]+$/.test(e.trim())) {
          setLastName(e.trim());
          setLastNameError("");
        } else {
          setLastNameError("");
        }
        break;
      case "phone":
        if (!e.trim()) {
          setPhoneNo("");
          setPhoneNoError("Phone Number cannot be empty");
        } else if (/^\d+$/.test(e.trim())) { // takes only numbers
          setPhoneNo(e.trim());
          setPhoneNoError("");
        } else {
          setPhoneNoError("");
        }
        break;
      case "email":
        setEmail(e.trim());
        if (!e.trim()) {
          setEmailError("Email cannot be empty");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim())) {// if email is not valid
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
      case "confirm_password":
        setConfirmPassword(e.trim());
        if (!e.trim()) {
          setConfirmPasswordError("Password cannot be empty");
        } else if (password !== e.trim()) {
          setConfirmPasswordError("Passwords do not match");
        } else {
          setConfirmPasswordError("");
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
      lastName &&
      // phoneNo &&
      (email || phoneNo) &&
      confirmPassword &&
      password &&
      !firstNameError &&
      !lastNameError &&
      !phoneNoError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError &&
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
    lastName,
    phoneNo,
    email,
    password,
    firstNameError,
    lastNameError,
    phoneNoError,
    emailError,
    passwordError,
    termsChecked,
    confirmPassword,
    confirmPasswordError,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNoWithCountryCode = selectedCode + phoneNo;

    completeSetup({
      first_name: firstName,
      last_name: lastName,
      username:
        selectedDropdownValue == "email" ? email : phoneNoWithCountryCode,
      password: password,
      password_confirmation: confirmPassword,
      accept_terms: termsChecked,
    });
  };

  return (
    <>
      <CloseModalContainer
        handleCloseModal={handleCloseModal}
        handleAuthNavigate={() => handleAuthNavigate("verify_account")}
      />

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
            name={"lastName"}
            value={lastName}
            label={"Enter your last name*"}
            errorMessage={lastNameError}
            idAndHtmlFor={"second_name"}
            handleTextInput={handleTextInput}
          />

          {selectedDropdownValue == "phone" ? (
            // Phone Number
            <CustomTextInput
              type={"phoneNo"}
              name={"phone"}
              value={phoneNo}
              label={"Phone Number"}
              errorMessage={phoneNoError}
              idAndHtmlFor={"phone"}
              selectedCode={selectedCode}
              setSelectedCode={setSelectedCode}
              handleTextInput={handleTextInput}
              placeholder="e.g 8147999999"
              focused={focusedTextinput}
              setFocused={setFocusedTextinput}
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

          {/* Confirm Password */}
          <CustomTextInput
            type={"password"}
            name={"confirm_password"}
            value={confirmPassword}
            label={"Confirm password*"}
            errorMessage={confirmPasswordError}
            idAndHtmlFor={"confirm_password"}
            handleTextInput={handleTextInput}
            noPasswordChecklist
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
            loader={isLoading}
          />
        </form>
      </div>
    </>
  );
};

export default ProfileSetup;
