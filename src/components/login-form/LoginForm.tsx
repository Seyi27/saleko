import React, { useEffect, useState } from "react";
import "./LoginForm.css";
import CustomButton from "../custom-button/CustomButton";
import PasswordChecklist from "react-password-checklist";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons from react-icons
import CustomModal from "../custom-modal/CustomModal";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import CustomTextInput from "../custom-textInput/CustomTextInput";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [toggleVisibility, setToggleVisibility] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const navigate = useNavigate();

  const handleToggle = () => {
    setToggleVisibility(!toggleVisibility);
  };

  const handleTextInput = (key: string, e: string) => {
    switch (key) {
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
    if (email && password && !emailError && !passwordError) {
      setButtonDisabled(false); // Enable button
    } else {
      setButtonDisabled(true); // Disable button
    }
  };

  // Trigger form validation whenever any input changes
  useEffect(() => {
    checkFormValidity();
  }, [email, password, emailError, passwordError]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="login_form_container">
      <p className="login_text">Login</p>

      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="email_input_box">
          <input
            id="emailInput"
            type="text"
            value={email}
            onChange={(e) => handleTextInput("email", e.target.value)}
            className={`email_textinput ${emailError && "error_textInput"}`}
          />
          <label
            htmlFor="emailInput"
            className={`${email.length > 0 ? "email_label" : ""}  ${
              emailError ? "error_label" : ""
            }`}
          >
            Enter your email
          </label>
          {emailError && <span className="error_message">{emailError}</span>}
        </div>

        {/* <CustomTextInput
          type={"password"}
          name={'password'}
          value={password}
          label={'Enter pass'}
          errorMessage={passwordError}
          idAndHtmlFor={password}
          handleTextInput={handleTextInput}
          /> */}

        {/* Password */}
        <div className="password_input_box">
          <div
            className={`password_textinput_container ${
              passwordError && "error_textInput"
            }`}
          >
            <input
              id="passwordInput"
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
            htmlFor="passwordInput"
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

        <Link to="/forgot-password" className="forgot_password">
          <p>Forgot Password?</p>
        </Link>

        <div style={{ margin: "20px" }} />

        {/* Login Button */}
        <CustomButton
          label="Login"
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
    </div>
  );
};

export default LoginForm;
